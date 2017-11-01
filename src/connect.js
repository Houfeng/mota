const Observer = require('mokit/src/observer');
const React = require('react');
const {
  isComponentClass, convertElement, registerElementHandler
} = require('./utils');
const stateful = require('./stateful');

function trigger() {
  this.setState({ _model_: this.model });
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
      this._observer_ = new Observer(this.model);
      const context = this;
      this._run_ = this._observer_.run(convertRender, { trigger, context });
    }
    return this._run_.run();
  };
}

function createUnmount(proto) {
  const initailUnmount = proto.componentWillUnmount;
  return function () {
    let result = null;
    if (initailUnmount) {
      result = initailUnmount.call(this);
    }
    if (this._unmountHanlders_) {
      this._unmountHanlders_.forEach(handler => handler.call(this));
    }
    if (this._run_) {
      this._observer_.stop(this._run_);
      this._run_ = null;
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
    if (this._mountHandlers_) {
      this._mountHandlers_.forEach(handler => handler.call(this));
    }
    if (initailMount) initailMount.call(this);
  };
}

function createModelGetter(model) {
  return function () {
    if (this._model_) return this._model_;
    model = this.props.model || model;
    if (!model) throw new Error('Invalid Model');
    if (model instanceof Function) {
      this._model_ = new model();
      this._isNewModelInstance_ = true;
    } else {
      this._model_ = model;
      this._isNewModelInstance_ = false;
    }
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
  proto._contented_ = true;
  return component;
}

module.exports = connect;