const React = require('react');
const bindable = require('./bindable');
const { expression } = require('mokit/src/template/expression');

function compileExpr(expr) {
  return {
    get: expression(expr),
    set: expression(`$scope.${expr}=$value`)
  };
}

function toArray(children) {
  const result = [];
  React.Children.forEach(children, child => {
    result.push(child);
  });
  return result;
}

function wrap(element, model) {
  if (!element || typeof element !== 'object') return element;
  const props = element.props || {};
  const initailChildren = toArray(props.children);
  const children = initailChildren.length > 0 ?
    initailChildren.map(child => wrap(child, model)) : undefined;
  const dataBind = props['data-bind'];
  const bindOpts = dataBind && bindable.getOptions(element);
  if (!dataBind || !bindOpts) {
    return React.cloneElement(element, { ...props, children });
  }
  const initailChange = props[bindOpts.change];
  const bindExpr = compileExpr(dataBind);
  const setValue = value => bindExpr.set(Object.create(model, {
    $value: { value }
  }));
  const getValue = () => bindExpr.get(model);
  const context = { getValue, setValue };
  const bindEvent = bindOpts.event[0];
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
    ...props,
    'data-bind': undefined,
    children: children,
    [bindProp]: bindPropHandler(context, props),
    [bindEvent]: bindEventHandler
  });
}

module.exports = function (component) {
  const proto = component.prototype;
  const initailRender = proto.render;
  proto.render = function () {
    const element = initailRender.call(this);
    return wrap(element, this.model || this.prop.model);
  };
  return component;
}