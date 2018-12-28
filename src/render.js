/**
 * Copyright (c) 2012-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

const React = require('react');
const { isArray } = require('ntils');
const lifecycle = require('./lifecycle');

if (!Object.isFrozen) Object.isFrozen = () => false;

const initailCreateElement = React.createElement;
React.createElement = function (type, ...args) {
  intercepted = true;
  beforeCreateElement(type, ...args);
  return initailCreateElement.call(this, type, ...args);
};

let component = null, intercepted = false;

function beginIntercept(com) {
  intercepted = false;
  component = com;
}

function endIntercept() {
  intercepted = false;
  component = null;
}

function beforeCreateElement(type, ...args) {
  if (!component) return;
  const handlers = lifecycle.element.get(component);
  if (!handlers) return;
  handlers.forEach(handler => handler.call(component, type, ...args));
}

function afterCreateElement(element) {
  if (!element) return element;
  if (isArray(element)) return element.map(afterCreateElement);
  if (element.type && element.props) {
    if (Object.isFrozen(element)) element = Object.assign({}, element);
    if (Object.isFrozen(element.props)) element.props = Object.assign({},
      element.props);
    beforeCreateElement(element.type, element.props);
  }
  if (element.props && element.props.children) {
    element.props.children = afterCreateElement(element.props.children);
  }
  return element;
}

function wrapRender(initailRender) {
  return function (...args) {
    const handlers = lifecycle.render.get(this);
    if (handlers) handlers.forEach(handler => handler.call(this, ...args));
    beginIntercept(this);
    let element = initailRender.call(this, ...args);
    if (!intercepted) element = afterCreateElement(element);
    endIntercept(this);
    return element;
  };
}

module.exports = { wrapRender };