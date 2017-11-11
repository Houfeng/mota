const React = require('react');
const { Component } = React;
const { final } = require('ntils');

function registerMountHandler(proto, handler) {
  if (!proto._mountHandlers_) final(proto, '_mountHandlers_', []);
  proto._mountHandlers_.push(handler);
}

function registerUnMountHandler(proto, handler) {
  if (!proto._unmountHandlers_) final(proto, '_unmountHandlers_', []);
  proto._unmountHandlers_.push(handler);
}

function registerElementHandler(proto, handler) {
  if (!proto._elementHandlers_) final(proto, '_elementHandlers_', []);
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
  const props = element.props || {};
  key = element.key || key || undefined;
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
  registerUnMountHandler
};