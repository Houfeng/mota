const Observer = require('ober');
const React = require('react');
const { final, isObject, isFunction } = require('ntils');
const {
  isComponentClass, convertElement, registerElementHandler
} = require('./utils');
const stateful = require('./stateful');

function trigger() {
  if (!this._mounted_) return;
  //this.setState({ _model_: this.model });
  this.forceUpdate();
}

function createRender(proto) {
  const initailRender = proto.render;
  const convertRender = function () {
    const element = initailRender.call(this);
    return convertElement(element,
      this.model, null, this._elementHandlers_);
  };
  return function () {
    if (!this._run_) {
      final(this, '_observer_', new Observer(this.model));
      const context = this;
      const deep = !!this.constructor._deep_;
      final(this, '_run_',
        this._observer_.run(convertRender, { trigger, context, deep }));
    }
    return this._run_.run();
  };
}

function createUnmount(proto) {
  const initailUnmount = proto.componentWillUnmount;
  return function () {
    this._mounted_ = false;
    let result = null;
    if (initailUnmount) {
      result = initailUnmount.call(this);
    }
    if (this._unmountHandlers_) {
      this._unmountHandlers_.forEach(handler => handler.call(this));
    }
    if (this._run_) {
      this._observer_.stop(this._run_);
    }
    if (this._isNewModelInstance_) {
      this._observer_.clearReference();
    }
    return result;
  };
}

function createMount(proto) {
  const initailMount = proto.componentDidMount;
  return function () {
    this._mounted_ = true;
    if (this._mountHandlers_) {
      this._mountHandlers_.forEach(handler => handler.call(this));
    }
    if (initailMount) initailMount.call(this);
  };
}

function createReceiveProps(proto) {
  const initailReceiveProps = proto.componentWillReceiveProps;
  return function (...args) {
    if (this._receivePropsHandlers_) {
      this._receivePropsHandlers_
        .forEach(handler => handler.call(this, ...args));
    }
    if (initailReceiveProps) initailReceiveProps.call(this, ...args);
  };
}

function createModelGetter(model) {
  return function () {
    if (this._model_) return this._model_;
    model = this.props.model || model || {};
    let isNewModelInstance = false;
    if (!isObject(model) && !isFunction(model)) {
      throw new Error('Invalid Model');
    }
    if (model instanceof Function) {
      model = new model();
      isNewModelInstance = true;
    }
    final(this, '_model_', model);
    final(this, '_isNewModelInstance_', isNewModelInstance);
    return this._model_;
  };
}

function deepConnect(element, model, key, children) {
  const InitailCom = element.type;
  if (typeof InitailCom == 'string') return element;
  if (InitailCom.prototype._contented_) return element;
  const WrapedCom = connect(model, InitailCom);
  const props = element.props || {};
  const ref = element.ref;
  return <WrapedCom {...props} key={key} ref={ref}>
    {children}
  </WrapedCom>;
}

function connect(model, component) {
  if (!component) return component => connect(model, component);
  if (!isComponentClass(component)) component = stateful(component);
  const proto = component.prototype;
  if (proto._contented_) return component;
  registerElementHandler(proto, deepConnect);
  Object.defineProperty(proto, 'model', {
    enumerable: false,
    get: createModelGetter(model)
  });
  proto.render = createRender(proto);
  proto.componentDidMount = createMount(proto);
  proto.componentWillUnmount = createUnmount(proto);
  proto.componentWillReceiveProps = createReceiveProps(proto);
  final(proto, '_contented_', true);
  return component;
}

module.exports = connect;