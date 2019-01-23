/**
 * Copyright (c) 2012-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

const React = require('react');
const { bindable } = require('./bindable');
const { expression } = require('ober');
const { isObject, isArray, isFunction } = require('ntils');
const { isComponentClass } = require('./utils');
const { owner } = require('./owner');
const { set } = require('./annotation');

function compileExpr(expr) {
  return {
    get: expression(expr),
    set: expression(`$scope.${expr}=$value`)
  };
}

function convertProps(type, props, model) {
  if (!type || !props) return;
  if (!model) model = owner.component && owner.component.model;
  if (!model) return;
  const dataBind = props['data-bind'];
  if (!dataBind) return;
  const bindOpts = dataBind && bindable.getOptions(type, props);
  if (!bindOpts) return;
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
      const value = isObject(event) && 'target' in event ?
        event.target.value : event;
      setValue(value);
    } else {
      setValue(expression(String(handler))(event));
    }
    if (initailChange) return initailChange(event, ...args);
  };
  const bindProp = bindOpts.prop[0];
  const bindPropHandler = bindOpts.prop[1] || (ctx => ctx.getValue());
  //--
  props[bindProp] = bindPropHandler(context, props);
  props[bindEvent] = bindEventHandler;
  props['data-scope'] = undefined;
  props['data-bind'] = undefined;
}

function convertElement(element, model) {
  if (!element) return element;
  if (isArray(element)) return element.map(el => convertElement(el, model));
  if (element.type && element.props) {
    if (Object.isFrozen(element)) element = Object.assign({}, element);
    if (Object.isFrozen(element.props)) element.props = Object.assign({},
      element.props);
    convertProps(element.type, element.props, model);
  }
  if (element.props && element.props.children) {
    element.props.children = convertElement(element.props.children, model);
  }
  return element;
}

@binding
class ComlizeWrapper extends React.Component {
  render() {
    const { func, context, args } = this.props;
    return func.call(context, ...args);
  }
}

/**
 * 处理包含双向绑定声明的 React 元素
 * @param {React.ReactNode|Function} target 组件类或元素或返回元素的函数
 * @param {any} model ViewModel
 * @returns {React.ReactNode} 处理后的 React 元素
 */
function binding(target, model) {
  if (!target) return binding;
  if (isComponentClass(target)) {
    set('binding', true, target.prototype || target);
    return target;
  }
  if (!model) model = owner.component && owner.component.model;
  if (!model) throw new Error('Binding error: Invalid model');
  if (isFunction(target)) {
    return function (...args) {
      const { connect } = require('./connect');
      const Comlize = connect(model, ComlizeWrapper);
      return <Comlize func={target} context={this} args={args} />;
    };
  } else {
    return convertElement(target, model);
  }
}

binding.convertElement = convertElement;
binding.convertProps = convertProps;
binding.binding = binding;

module.exports = binding;