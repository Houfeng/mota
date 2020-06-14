/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { Component } from 'react';
import { isFunction } from 'ober';
import { isComponentClass, defineGetter } from '../common/utils';
import { wrapRender } from '../fitter/render';
import { lifecycle } from './lifecycle';
import { stateful } from './stateful';
import { define, observable, ObserveState, track, subscribe, unsubscribe } from 'ober';
import {
  ContentedSymbol, MountSymbol, PropModelSymbol,
  OverrideSymbol, ModelSymbol, TriggerSymbol
} from '../common/symbols';
import { nextTick } from 'ober';
import { inputRepair } from './input';

const TICK_KEY = '_mota_tick_';
const { setState } = Component.prototype;

export function createRender(proto) {
  const initialRender = proto.render;
  if (!initialRender || initialRender[OverrideSymbol]) return initialRender;
  const overrideRender = wrapRender(initialRender);
  const render = function render(...args) {
    const originSetState = ObserveState.set;
    ObserveState.set = false;
    if (!this[TriggerSymbol]) {
      const update = () => {
        if (!this[MountSymbol]) return;
        const stats = (this.state && this.state[TICK_KEY]) || 0;
        setState.call(this, { [TICK_KEY]: stats + 1 });
      };
      define(this, TriggerSymbol, () => {
        if (!this[MountSymbol]) return;
        const { inputting, composing } = inputRepair;
        return (inputting || composing) ?
          update() : nextTick(update, null, true);
      });
    }
    const { result, dependencies } = track(() => {
      return overrideRender.call(this, ...args);
    });
    unsubscribe('set', this[TriggerSymbol]);
    this[TriggerSymbol].dependencies = dependencies;
    subscribe('set', this[TriggerSymbol]);
    ObserveState.set = originSetState;
    return result;
  };
  define(render, OverrideSymbol, true);
  return render;
}

export function createUnmount(proto) {
  const initialUnmount = proto.componentWillUnmount;
  return function (...args) {
    define(this, MountSymbol, false);
    let result = null;
    if (initialUnmount) result = initialUnmount.call(this, ...args);
    const handlers = lifecycle.unmount.get(this);
    if (handlers) {
      handlers.forEach(handler => handler.call(this, ...args));
    }
    unsubscribe('set', this[TriggerSymbol]);
    return result;
  };
}

export function createMount(proto) {
  const initialMount = proto.componentDidMount;
  return function (...args) {
    define(this, MountSymbol, true);
    const handlers = lifecycle.didMount.get(this);
    if (handlers) {
      handlers.forEach(handler => handler.call(this, ...args));
    }
    const { constructor: ctor, model, props } = this;
    if (ctor.modeInitialize) ctor.modeInitialize.call(ctor, model, props);
    if (initialMount) return initialMount.call(this, ...args);
  };
}

export function createDidUpdate(proto) {
  const initialDidUpdate = proto.componentDidUpdate;
  return function (...args) {
    const handlers = lifecycle.didUpdate.get(this);
    if (handlers) {
      handlers.forEach(handler => handler.call(this, ...args));
    }
    if (initialDidUpdate) return initialDidUpdate.call(this, ...args);
  };
}

export function createModelGetter(model) {
  return function () {
    const modelInProps = 'model' in this.props;
    const propModel = this.props.model || {};
    if (this[ModelSymbol] && (!modelInProps || propModel === this[PropModelSymbol])) {
      return this[ModelSymbol];
    }
    define(this, PropModelSymbol, propModel);
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
    define(this, ModelSymbol, observable(componentModel));
    const handlers = lifecycle.model.get(this);
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
  define(proto, ContentedSymbol, true);
  return component;
}
