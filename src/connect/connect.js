/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { Component } from 'react';
import { isFunction } from 'ntils';
import { isComponentClass, defineGetter } from '../common/utils';
import { wrapRender } from '../fitter/render';
import { lifecycles } from './lifecycle';
import { stateful } from './stateful';
import { defineMember, observable, track, subscribe, unsubscribe } from 'ober';
import {
  ContentedSymbol, MountSymbol, PropModelSymbol,
  OverrideSymbol, ModelSymbol, TriggerSymbol
} from '../common/symbols';
import { nextTick } from 'ober';
import { inputRepair } from './input';

const TICK_KEY = '_mota_tick_';
const { setState } = Component.prototype;

export function createRender(proto) {
  const initailRender = proto.render;
  if (!initailRender || initailRender[OverrideSymbol]) return initailRender;
  const overrideRender = wrapRender(initailRender);
  const render = function render(...args) {
    if (!this[TriggerSymbol]) {
      const update = () => {
        if (!this[MountSymbol]) return;
        //forceUpdate.call(this);
        const stats = (this.state && this.state[TICK_KEY]) || 0;
        setState.call(this, { [TICK_KEY]: stats + 1 });
      };
      defineMember(this, TriggerSymbol, () => {
        if (!this[MountSymbol]) return;
        const { inputting, composing } = inputRepair;
        return inputting || composing ?
          update() : nextTick(update, null, true);
      });
    }
    unsubscribe('set', this[TriggerSymbol]);
    const { result, dependencies } = track(() => {
      return overrideRender.call(this, ...args);
    });
    this[TriggerSymbol].dependencies = dependencies;
    subscribe('set', this[TriggerSymbol]);
    return result;
  };
  defineMember(render, OverrideSymbol, true);
  return render;
}

export function createUnmount(proto) {
  const initailUnmount = proto.componentWillUnmount;
  return function (...args) {
    defineMember(this, MountSymbol, false);
    let result = null;
    if (initailUnmount) result = initailUnmount.call(this, ...args);
    const handlers = lifecycles.unmount.get(this);
    if (handlers) {
      handlers.forEach(handler => handler.call(this, ...args));
    }
    unsubscribe('set', this[TriggerSymbol]);
    return result;
  };
}

export function createMount(proto) {
  const initailMount = proto.componentDidMount;
  return function (...args) {
    defineMember(this, MountSymbol, true);
    const handlers = lifecycles.didMount.get(this);
    if (handlers) {
      handlers.forEach(handler => handler.call(this, ...args));
    }
    const { constructor: ctor, model, props } = this;
    if (ctor.modeInitialize) ctor.modeInitialize.call(ctor, model, props);
    if (initailMount) return initailMount.call(this, ...args);
  };
}

export function createDidUpdate(proto) {
  const initailDidUpdate = proto.componentDidUpdate;
  return function (...args) {
    const handlers = lifecycles.didUpdate.get(this);
    if (handlers) {
      handlers.forEach(handler => handler.call(this, ...args));
    }
    if (initailDidUpdate) return initailDidUpdate.call(this, ...args);
  };
}

export function createModelGetter(model) {
  return function () {
    const modelInProps = 'model' in this.props;
    const propModel = this.props.model || {};
    if (this[ModelSymbol] && (!modelInProps || propModel === this[PropModelSymbol])) {
      return this[ModelSymbol];
    }
    defineMember(this, PropModelSymbol, propModel);
    let componentModel = modelInProps ? propModel : model;
    if (this.modelWillCreate) {
      componentModel = this.modelWillCreate(componentModel) || componentModel;
    }
    if (!componentModel) componentModel = {};
    if (typeof componentModel !== 'object' &&
      typeof componentModel !== 'function') {
      throw new Error('Invalid Model');
    }
    if (componentModel instanceof Function) {
      componentModel = new componentModel();
    }
    defineMember(this, ModelSymbol, observable(componentModel));
    const handlers = lifecycles.model.get(this);
    if (handlers) handlers.forEach(handler => handler.call(this));
    if (this.modelDidCreate) this.modelDidCreate();
    return this[ModelSymbol];
  };
}

export function connect(model, component) {
  if (!component) return component => connect(model, component);
  if (!isFunction(component)) return component;
  if (!isComponentClass(component)) return stateful(component, model);
  const proto = component.prototype;
  if (proto.hasOwnProperty(ContentedSymbol)) return component;
  defineGetter(proto, 'model', createModelGetter(model));
  proto.render = createRender(proto);
  proto.componentDidMount = createMount(proto);
  proto.componentWillUnmount = createUnmount(proto);
  proto.componentDidUpdate = createDidUpdate(proto);
  defineMember(proto, ContentedSymbol, true);
  return component;
}
