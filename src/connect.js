const Observer = require('ober');
const { final, isObject, isFunction } = require('ntils');
const { isComponentClass, define } = require('./utils');
const { wrapRender } = require('./render');
const annotation = require('./annotation');
const lifecycle = require('./lifecycle');
const stateful = require('./stateful');
const binding = require('./binding');

function createRender(proto) {
  const initailRender = proto.render;
  if (!initailRender || initailRender._override_) return initailRender;
  const overrideRender = wrapRender(initailRender);
  const render = function (...args) {
    if (!this._run_) {
      final(this, '_observer_', new Observer(this.model));
      final(this, '_trigger_', function () {
        if (!this._mounted_) return;
        this.forceUpdate();
      });
      final(this, '_run_', this._observer_.run(overrideRender, {
        context: this,
        trigger: this._trigger_,
        deep: annotation.get('deep', this)
      }));
    }
    return this._run_.run(...args);
  };
  final(render, '_override_', true);
  return render;
}

function createUnmount(proto) {
  const initailUnmount = proto.componentWillUnmount;
  return function (...args) {
    this._mounted_ = false;
    let result = null;
    if (initailUnmount) result = initailUnmount.call(this, ...args);
    const handlers = lifecycle.unmount.get(this);
    if (handlers) {
      handlers.forEach(handler => handler.call(this, ...args));
    }
    if (this._run_) this._observer_.stop(this._run_);
    if (this._isNewModelInstance_) this._observer_.clearReference();
    return result;
  };
}

function createMount(proto) {
  const initailMount = proto.componentDidMount;
  return function (...args) {
    this._mounted_ = true;
    const handlers = lifecycle.didMount.get(this);
    if (handlers) {
      handlers.forEach(handler => handler.call(this, ...args));
    }
    if (initailMount) return initailMount.call(this, ...args);
  };
}

function createDidUpdate(proto) {
  const initailDidUpdate = proto.componentDidUpdate;
  return function (...args) {
    const handlers = lifecycle.didUpdate.get(this);
    if (handlers) {
      handlers.forEach(handler => handler.call(this, ...args));
    }
    if (initailDidUpdate) return initailDidUpdate.call(this, ...args);
  };
}

function createModelGetter(model) {
  return function () {
    if (this._model_) return this._model_;
    let componentModel = this.props.model || model || {};
    let isNewModelInstance = false;
    if (!isObject(componentModel) && !isFunction(componentModel)) {
      throw new Error('Invalid Model');
    }
    if (componentModel instanceof Function) {
      componentModel = new componentModel();
      isNewModelInstance = true;
    }
    final(this, '_model_', componentModel);
    final(this, '_isNewModelInstance_', isNewModelInstance);
    const handlers = lifecycle.model.get(this);
    if (handlers) handlers.forEach(handler => handler.call(this));
    if (this.modelDidCreate) this.modelDidCreate();
    return this._model_;
  };
}

function recursiveConnect(component) {
  connect(this.model, component);
}

function connect(model, component) {
  if (!component) return component => connect(model, component);
  if (!isFunction(component)) return component;
  if (!isComponentClass(component)) component = stateful(component);
  const proto = component.prototype;
  //通过 hasOwnProperty 才能保证父类装饰过了，子类可重新装饰
  if (proto.hasOwnProperty('_contented_')) return component;
  define(proto, 'model', createModelGetter(model));
  proto.render = createRender(proto);
  proto.componentDidMount = createMount(proto);
  proto.componentWillUnmount = createUnmount(proto);
  proto.componentDidUpdate = createDidUpdate(proto);
  lifecycle.element.add(proto, binding.elementHandler);
  lifecycle.element.add(proto, recursiveConnect);
  final(proto, '_contented_', true);
  return component;
}

module.exports = connect;