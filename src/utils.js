const React = require('react');
const { Component } = React;
const { final, isFunction, isObject } = require('ntils');

function registerMountHandler(proto, handler) {
  if (!proto._mountHandlers_) final(proto, '_mountHandlers_', []);
  proto._mountHandlers_.push(handler);
}

function registerUnmountHandler(proto, handler) {
  if (!proto._unmountHandlers_) final(proto, '_unmountHandlers_', []);
  proto._unmountHandlers_.push(handler);
}

function registerReceivePropsHandler(proto, handler) {
  if (!proto._receivePropsHandlers_) final(proto, '_receivePropsHandlers_', []);
  proto._receivePropsHandlers_.push(handler);
}

function registerElementHandler(proto, handler) {
  if (!proto._elementHandlers_) final(proto, '_elementHandlers_', []);
  proto._elementHandlers_.push(handler);
}

function childrenToArray(children) {
  if (isFunction(children)) return [children];
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
  const props = element.props || {};
  key = element.key || key;
  const initailChildren = childrenToArray(props.children);
  const covertedChildren = initailChildren.length > 0 ? initailChildren
    .map((child, index) => convertElement(child, model, index, handlers))
    : undefined;
  const children = covertedChildren && covertedChildren.length == 1
    ? covertedChildren[0] : covertedChildren;
  if (handlers) {
    handlers.forEach(handler => {
      element = handler(element, model, key, children);
    });
  }
  return element;
}

function isComponentInstance(instance) {
  if (!instance) return false;
  return (instance && instance instanceof Component) ||
    (isObject(instance) && 'render' in instance &&
      '__reactAutoBindPairs' in instance);
}

function isComponentClass(com) {
  if (!com) return false;
  return isComponentInstance(com.prototype);
}

function markAsDeep(target, name) {
  if (!target._deep_) final(target, '_deep_', {});
  if (name) target._deep_[name] = true;
}

function markAsWatch(target, name) {
  if (!target._watch_) final(target, '_watch_', {});
  if (name) target._watch_[name] = true;
}

function markAsAutorun(target, name) {
  if (!target._autorun_) final(target, '_autorun_', {});
  if (name) target._autorun_[name] = true;
}

module.exports = {
  convertElement,
  isComponentClass,
  isComponentInstance,
  markAsDeep,
  markAsAutorun,
  markAsWatch,
  registerElementHandler,
  registerMountHandler,
  registerUnmountHandler,
  registerReceivePropsHandler
};