const React = require('react');
const { Component, PureComponent } = React;
const { isObject } = require('ntils');

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

module.exports = {
  isComponentClass,
  isComponentInstance
};