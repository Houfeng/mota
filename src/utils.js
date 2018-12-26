const React = require('react');
const { Component, PureComponent } = React;
const { isObject } = require('ntils');

function has(owner, name) {
  return owner && owner.hasOwnProperty(name);
}

function define(owner, name, value) {
  Object.defineProperty(owner, name, {
    configurable: true,
    enumerable: false,
    get() { return value; }
  });
}

function attch(proto, name, handler) {
  if (!has(proto, name)) define(proto, name, []);
  proto[name].push(handler);
}

function registerMountHandler(proto, handler) {
  attch(proto, '_mountHandlers_', handler);
}

function registerUnmountHandler(proto, handler) {
  attch(proto, '_unmountHandlers_', handler);
}

function registerDidUpdateHandler(proto, handler) {
  attch(proto, '_didUpdateHandlers_', handler);
}

function registerElementHandler(proto, handler) {
  attch(proto, '_elementHandlers_', handler);
}

function registerRenderHandler(proto, handler) {
  attch(proto, '_renderHandlers_', handler);
}

function registerModelHandler(proto, handler) {
  attch(proto, '_modelHandlers_', handler);
}

function isComponentInstance(instance) {
  if (!instance || !isObject(instance)) return false;
  return (instance instanceof Component) ||
    (instance instanceof PureComponent) ||
    ('render' in instance && '__reactAutoBindPairs' in instance);
}

function isComponentClass(com) {
  if (!com) return false;
  return isComponentInstance(com.prototype);
}

function markAsDeep(target, name) {
  if (!has(target, '_deep_')) define(target, '_deep_', {});
  if (name) target._deep_[name] = true;
}

function markAsWatch(target, name) {
  if (!has(target, '_watch_')) define(target, '_watch_', {});
  if (name) target._watch_[name] = true;
}

function markAsAutorun(target, name) {
  if (!has(target, '_autorun_')) define(target, '_autorun_', {});
  if (name) target._autorun_[name] = true;
}

module.exports = {
  isComponentClass,
  isComponentInstance,
  markAsDeep,
  markAsAutorun,
  markAsWatch,
  registerElementHandler,
  registerMountHandler,
  registerUnmountHandler,
  registerDidUpdateHandler,
  registerRenderHandler,
  registerModelHandler
};