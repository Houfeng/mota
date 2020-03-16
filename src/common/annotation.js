/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { isArray } from 'ntils';
import { has, defineGetter } from './utils';

const STORE_KEY = '_annotations_';

export function getAll(target, member, ownOnly) {
  if (!target) return {};
  target = target.prototype || target;
  if (!has(target, STORE_KEY, ownOnly)) return {};
  const store = target[STORE_KEY];
  if (!member) return store;
  return has(store, member, ownOnly) ? store[member] : {};
}

export function getStore(target, member) {
  if (!target) throw new Error('Invalid annotation target');
  target = target.prototype || target;
  const baseStore = getAll(Object.getPrototypeOf(target));
  if (!has(target, STORE_KEY)) {
    defineGetter(target, STORE_KEY, Object.create(baseStore));
  }
  const store = target[STORE_KEY];
  if (!member) return store;
  if (!has(store, member)) {
    store[member] = Object.create(getAll(baseStore[member]));
  }
  return store[member];
}

export function wrapKey(key) {
  return ':' + key;
}

export function get(key, target, member, ownOnly) {
  if (!key) return null;
  key = wrapKey(key);
  const store = getAll(target, member, ownOnly || false);
  return store && store[key];
}

export function set(key, value, target, member) {
  if (!key || !value) return null;
  key = wrapKey(key);
  const store = getStore(target, member); //eslint-disable-line
  store[key] = value;
  return value;
}

export function push(key, value, target, member) {
  let list = get(key, target, member, true);
  if (list && !isArray(list)) throw new Error('Invaild Array');
  if (!list) list = set(key, [], target, member);
  list.push(value);
  return list;
}

export function annotation(key, value) {
  return (target, member) => {
    set(key, value, target, member);
  };
}

annotation.set = set;
annotation.push = push;
annotation.get = get;
annotation.getAll = getAll;
