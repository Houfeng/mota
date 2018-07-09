const React = require('react');
const Observer = require('ober');
const { final, isObject, isFunction } = require('ntils');
const { isComponentClass, registerElementHandler } = require('./utils');
const stateful = require('./stateful');

const initailCreateElement = React.createElement;

function createRender(proto) {
  const initailRender = proto.render;
  const overrideRender = function (...args) {
    const component = this;
    React.createElement = function (type, ...args) {
      const newType = component.componentWhillCreateElement(type, ...args);
      return initailCreateElement.call(this, newType || type, ...args);
    };
    const element = initailRender.call(component, ...args);
    React.createElement = initailCreateElement;
    return element;
  };
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

function createReceiveProps(proto) {
  const initailReceiveProps = proto.componentWillReceiveProps;
  return function (...args) {
    if (this._receivePropsHandlers_) {
      this._receivePropsHandlers_
        .forEach(handler => handler.call(this, ...args));
    }
    if (initailReceiveProps) return initailReceiveProps.call(this, ...args);
  };
}

function createCreateElement(proto) {
  const initailCreateElement = proto.componentWhillCreateElement;
  return function (...args) {
    let newType = null;
    if (initailCreateElement) {
      newType = initailCreateElement.call(this, ...args);
    }
    if (this._elementHandlers_) {
      this._elementHandlers_
        .forEach(handler => newType = handler.call(this, ...args));
    }
    return newType;
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

function deepConnect(type) {
  return connect(this.model, type);
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
  proto.componentWillReceiveProps = createReceiveProps(proto);
  proto.componentWhillCreateElement = createCreateElement(proto);
  registerElementHandler(proto, deepConnect);
  final(proto, '_contented_', true);
  return component;
}

module.exports = connect;