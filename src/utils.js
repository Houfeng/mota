/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

const React = require('react');
const { Component, PureComponent } = React;
const { isObject, isFunction } = require('ntils');

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

function has(owner, key, ownOnly) {
  if (ownOnly === false) return !!(owner && owner[key]);
  return owner && owner.hasOwnProperty(key);
}

function defineGetter(owner, key, value) {
  const getter = isFunction(value) ? value :
    function () { return value; };
  Object.defineProperty(owner, key, {
    configurable: true,
    enumerable: false,
    get: getter
  });
}

function isESModule(obj) {
  if (!obj) return;
  return obj.__esModule ||
    Object.prototype.toString.call(obj) === '[object Module]';
}

function getModelState(model) {
  if (!isESModule(model)) return model;
  if (model.state) return model.state;
  throw new Error(
    'When using ES module as a model, the module must export \'state\''
  );
}

module.exports = {
  isComponentClass, isComponentInstance, has,
  defineGetter, isESModule, getModelState
};