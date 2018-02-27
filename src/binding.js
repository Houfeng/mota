const React = require('react');
const bindable = require('./bindable');
const { expression } = require('ober');
const { registerElementHandler } = require('./utils');

function compileExpr(expr) {
  return {
    get: expression(expr),
    set: expression(`$scope.${expr}=$value`)
  };
}

function elementHandler(element, model, key, children) {
  const props = element.props || {};
  const dataBind = props['data-bind'];
  const bindOpts = dataBind && bindable.getOptions(element);
  if (!dataBind || !bindOpts) {
    return React.cloneElement(element, { key, ...props, children });
  }
  const dataScope = props['data-scope'] || model;
  const bindExpr = compileExpr(dataBind);
  const setValue = value => bindExpr.set(Object.create(dataScope, {
    $value: { value }
  }));
  const getValue = () => bindExpr.get(dataScope);
  const context = { getValue, setValue };
  const bindEvent = bindOpts.event[0];
  const initailChange = props[bindEvent];
  const bindEventHandler = (event, ...args) => {
    const handler = bindOpts.event[1];
    if (handler instanceof Function) {
      handler(context, event, ...args);
    } else if (!handler) {
      const value = 'target' in event ? event.target.value : event;
      setValue(value);
    } else {
      setValue(expression(String(handler))(event));
    }
    if (initailChange) return initailChange(event);
  };
  const bindProp = bindOpts.prop[0];
  const bindPropHandler = bindOpts.prop[1] || (ctx => ctx.getValue());
  return React.cloneElement(element, {
    key,
    ...props,
    'data-scope': undefined,
    'data-bind': undefined,
    children: children,
    [bindProp]: bindPropHandler(context, props),
    [bindEvent]: bindEventHandler
  });
}

function binding(component) {
  if (!component) return binding;
  const proto = component.prototype;
  if (proto._contented_) {
    throw new Error('`binding` must be enabled before `model`');
  }
  registerElementHandler(proto, elementHandler);
  return component;
}

module.exports = binding;