const hook = require('./hook');
const Observer = require('ober');
const { final, isObject, isFunction } = require('ntils');
const { isComponentClass, registerElementHandler } = require('./utils');
const stateful = require('./stateful');

function createRender(proto) {
  const initailRender = proto.render;
  if (!initailRender) return initailRender;
  const overrideRender = hook.wrapRender(initailRender);
  return function (...args) {
    if (!this._run_) {
      final(this, '_observer_', new Observer(this.model));
      final(this, '_trigger_', function () {
        if (!this._mounted_) return;
        this.forceUpdate();
      });
      final(this, '_run_', this._observer_.run(overrideRender, {
        context: this,
        trigger: this._trigger_,
        deep: !!this.constructor._deep_
      }));
    }
    return this._run_.run(...args);
  };
}

function createUnmount(proto) {
  const initailUnmount = proto.componentWillUnmount;
  return function (...args) {
    this._mounted_ = false;
    let result = null;
    if (initailUnmount) result = initailUnmount.call(this, ...args);
    if (this._unmountHandlers_) {
      this._unmountHandlers_.forEach(handler => handler.call(this, ...args));
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
    if (this._mountHandlers_) {
      this._mountHandlers_.forEach(handler => handler.call(this, ...args));
    }
    if (initailMount) return initailMount.call(this, ...args);
  };
}

function createDidUpdate(proto) {
  const initailDidUpdate = proto.componentDidUpdate;
  return function (...args) {
    if (this._didUpdateHandlers_) {
      this._didUpdateHandlers_
        .forEach(handler => handler.call(this, ...args));
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
  if (proto._contented_) return component;
  Object.defineProperty(proto, 'model', {
    enumerable: false, get: createModelGetter(model)
  });
  proto.render = createRender(proto);
  proto.componentDidMount = createMount(proto);
  proto.componentWillUnmount = createUnmount(proto);
  proto.componentDidUpdate = createDidUpdate(proto);
  registerElementHandler(proto, recursiveConnect);
  final(proto, '_contented_', true);
  return component;
}

module.exports = connect;