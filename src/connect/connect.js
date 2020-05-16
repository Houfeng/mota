/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { isFunction } from 'ntils';
import { isComponentClass, defineGetter } from '../common/utils';
import { wrapRender } from '../fitter/render';
import { lifecycles } from './lifecycle';
import { stateful } from './stateful';
import { autorun, observable } from '../observe/observable';

const STATS_KEY = '_mota_stats_';

export function createRender(proto) {
  const initailRender = proto.render;
  if (!initailRender || initailRender._override_) return initailRender;
  const overrideRender = wrapRender(initailRender);
  const render = function (...args) {
    if (!this._runner_) {
      this._runner_ = autorun(overrideRender, {
        immed: false,
        trigger: () => {
          if (!this._mounted_) return;
          const stats = (this.state && this.state[STATS_KEY]) || 0;
          this.setState({ [STATS_KEY]: stats + 1 });
        }
      });
    }
    return this._runner_.call(this, ...args);
  };
  defineGetter(render, '_override_', true);
  return render;
}

export function createUnmount(proto) {
  const initailUnmount = proto.componentWillUnmount;
  return function (...args) {
    defineGetter(this, '_mounted_', false);
    let result = null;
    if (initailUnmount) result = initailUnmount.call(this, ...args);
    const handlers = lifecycles.unmount.get(this);
    if (handlers) {
      handlers.forEach(handler => handler.call(this, ...args));
    }
    if (this._runner_ && this._runner_.destory) this._runner_.destory();
    return result;
  };
}

export function createMount(proto) {
  const initailMount = proto.componentDidMount;
  return function (...args) {
    defineGetter(this, '_mounted_', true);
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
    if (this._model_ && (!modelInProps || propModel === this._prop_model_)) {
      return this._model_;
    }
    defineGetter(this, '_prop_model_', propModel);
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
    defineGetter(this, '_model_', observable(componentModel));
    const handlers = lifecycles.model.get(this);
    if (handlers) handlers.forEach(handler => handler.call(this));
    if (this.modelDidCreate) this.modelDidCreate();
    return this._model_;
  };
}

export function connect(model, component) {
  if (!component) return component => connect(model, component);
  if (!isFunction(component)) return component;
  if (!isComponentClass(component)) return stateful(component, model);
  const proto = component.prototype;
  //通过 hasOwnProperty 才能保证父类装饰过了，子类可重新装饰
  if (proto.hasOwnProperty('_contented_')) return component;
  defineGetter(proto, 'model', createModelGetter(model));
  proto.render = createRender(proto);
  proto.componentDidMount = createMount(proto);
  proto.componentWillUnmount = createUnmount(proto);
  proto.componentDidUpdate = createDidUpdate(proto);
  defineGetter(proto, '_contented_', true);
  return component;
}
