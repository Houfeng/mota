const React = require('react');
const { Component } = React;

function registerMountHandler(proto, handler) {
  if (!proto._mountHandlers_) proto._mountHandlers_ = [];
  proto._mountHandlers_.push(handler);
}

function registerUnMountHandler(proto, handler) {
  if (!proto._unmountHandlers_) proto._unmountHandlers_ = [];
  proto._unmountHandlers_.push(handler);
}

function registerElementHandler(proto, handler) {
  if (!proto._elementHandlers_) proto._elementHandlers_ = [];
  proto._elementHandlers_.push(handler);
}

function childrenToArray(children) {
  const result = [];
  React.Children.forEach(children, child => {
    result.push(child);
  });
  return result;
}

function convertElement(element, model, key, handlers) {
  if (!element || typeof element !== 'object' ||
    !handlers || handlers.length < 1) {
    return element;
  }
  key = element.key || key;
  const props = element.props || {};
  const initailChildren = childrenToArray(props.children);
  const children = initailChildren.length > 0 ? initailChildren
    .map((child, index) => convertElement(child, model, index, handlers))
    : undefined;
  if (handlers) {
    handlers.forEach(handler => {
      element = handler(element, model, key, children);
    });
  }
  return element;
}

function isComponentInstance(instance) {
  return instance && instance instanceof Component;
}

function isComponentClass(com) {
  return isComponentInstance(com.prototype);
}

module.exports = {
  registerElementHandler,
  registerMountHandler,
  registerUnMountHandler,
  convertElement,
  isComponentClass,
  isComponentInstance
};