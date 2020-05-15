/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { nextTick } from './Tick';

export const ObserveSymbol = Symbol('observe');
export const ProxySymbol = Symbol('proxy');

export const ObserveHandlers = {};

export let uuid = 0;
export function ObserveId() {
  return (uuid++);
}

export function subscribe(name, handler) {
  if (!ObserveHandlers[name]) ObserveHandlers[name] = [];
  ObserveHandlers[name].push(handler);
}

export function unsubscribe(name, handler) {
  if (!ObserveHandlers[name]) return;
  const index = ObserveHandlers[name].indexOf(handler);
  ObserveHandlers[name].splice(index, 1);
}

export function publish(name, data) {
  if (!ObserveHandlers[name]) return;
  ObserveHandlers[name].forEach(handler => handler(data));
}

export function observe(target) {
  if (!target) throw new Error('Invalid proxy target');
  if (!target.hasOwnProperty(ObserveSymbol)) {
    const id = ObserveId();
    const proxy = new Proxy(target, {
      get(target, member, receiver) {
        if (member === ProxySymbol) return true;
        const value = target[member];
        if (typeof member === 'symbol') {
          return value;
        }
        if (!member.startsWith || !member.startsWith('__')) {
          publish('get', { id, target, receiver, member, value });
        }
        return value && (typeof value === 'object') ?
          observe(value).proxy : value;
      },
      set(target, member, value, receiver) {
        target[member] = value;
        if (typeof member !== 'symbol' || member.startsWith && member.startsWith('__')) {
          publish('set', { id, target, receiver, member, value });
        }
        return true;
      },
    });
    Object.defineProperty(target, ObserveSymbol, {
      enumerable: false,
      value: { id, proxy, target }
    });
  }
  return target[ObserveSymbol];
}

export function observable(taregt) {
  if (typeof taregt === 'function') {
    return new Proxy(taregt, {
      get(target, member) {
        if (member === ProxySymbol) return true;
      },
      construct(taregt, args) {
        return observe(new taregt(...args)).proxy;
      }
    });
  } else {
    return observe(taregt).proxy;
  }
}

export function autorun(handler, { immed, trigger } = {}) {
  const func = function (...args) {
    func.dependencies = {};
    func.collecting = true;
    const result = handler.call(this, ...args);
    func.collecting = false;
    return result;
  };
  const onGet = ({ id, member } = {}) => {
    if (!func.collecting || typeof member === 'symbol') return;
    func.dependencies[`${id}.${member}`] = true;
  };
  subscribe('get', onGet);
  const onSet = ({ id, member } = {}) => {
    if (typeof member === 'symbol') return;
    if (!func.dependencies[`${id}.${member}`]) return;
    if (!trigger) return func();
    const pending = nextTick(trigger, null, true);
    if (pending) pending.catch((err) => {
      throw err;
    });
  };
  subscribe('set', onSet);
  func.destory = () => {
    unsubscribe('get', onGet);
    unsubscribe('set', onSet);
  };
  if (immed !== false) func();
  return func;
}

export function watch(clac, handler, immed) {
  let result;
  return autorun(() => {
    const next = JSON.stringify(clac());
    if ((result !== next) && (result !== undefined || immed)) handler();
    result = next;
  });
}
