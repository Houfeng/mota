/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import Observer from 'ober';
import { isObject, isFunction, isNull } from 'ntils';
import { isComponentClass, defineGetter } from './utils';
import { wrapRender } from './render';
import { annotation } from './annotation';
import { lifecycle } from './lifecycle';
import { stateful } from './stateful';

export function createRender(proto) {
  const initailRender = proto.render;
  if (!initailRender || initailRender._override_) return initailRender;
  const overrideRender = wrapRender(initailRender);
  const render = function (...args) {
    const model = this.model;
    if (!this._run_) {
      defineGetter(this, '_observer_', new Observer(model));
      defineGetter(this, '_trigger_', () => function () {
        if (!this._mounted_) return;
        this.forceUpdate();
      });
      defineGetter(this, '_run_', this._observer_.run(overrideRender, {
        context: this,
        trigger: this._trigger_,
        deep: annotation.get('deep', this)
      }));
      this.state = Object.assign({}, this.state, { model });
    }
    return this._run_.run(...args);
  };
  defineGetter(render, '_override_', true);
  return render;
}

export function clearReference(com) {
  if (com._run_ && com._observer_) com._observer_.stop(com._run_);
  if (com._isNewModelInstance_ && com._observer_) {
    com._observer_.clearReference();
  }
  defineGetter(com, '_run_', null);
}

export function createUnmount(proto) {
  const initailUnmount = proto.componentWillUnmount;
  return function (...args) {
    defineGetter(this, '_mounted_', false);
    let result = null;
    if (initailUnmount) result = initailUnmount.call(this, ...args);
    const handlers = lifecycle.unmount.get(this);
    if (handlers) {
      handlers.forEach(handler => handler.call(this, ...args));
    }
    clearReference(this);
    return result;
  };
}

export function createMount(proto) {
  const initailMount = proto.componentDidMount;
  return function (...args) {
    defineGetter(this, '_mounted_', true);
    const handlers = lifecycle.didMount.get(this);
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
    const handlers = lifecycle.didUpdate.get(this);
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
    clearReference(this);
    let componentModel = modelInProps ? propModel : model;
    if (this.modelWillCreate) {
      componentModel = this.modelWillCreate(componentModel) || componentModel;
    }
    if (isNull(componentModel)) componentModel = {};
    if (!isObject(componentModel) && !isFunction(componentModel)) {
      throw new Error('Invalid Model');
    }
    let isNewModelInstance = false;
    if (componentModel instanceof Function) {
      componentModel = new componentModel();
      isNewModelInstance = true;
    }
    defineGetter(this, '_model_', componentModel);
    defineGetter(this, '_isNewModelInstance_', isNewModelInstance);
    const handlers = lifecycle.model.get(this);
    if (handlers) handlers.forEach(handler => handler.call(this));
    if (this.modelDidCreate) this.modelDidCreate();
    return this._model_;
  };
}

export function connect(model, component) {
  if (!component) return component => connect(model, component);
  if (!isFunction(component)) return component;
  if (!isComponentClass(component)) component = stateful(component);
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
