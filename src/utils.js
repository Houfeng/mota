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

function define(owner, key, value) {
  const getter = isFunction(value) ? value :
    function () { return value; };
  Object.defineProperty(owner, key, {
    configurable: true,
    enumerable: false,
    get: getter
  });
}

module.exports = {
  isComponentClass,
  isComponentInstance,
  has,
  define
};