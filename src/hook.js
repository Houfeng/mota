const React = require('react');

let component = null, intercepted = false;
const initailCreateElement = React.createElement;

React.createElement = function (type, ...args) {
  intercepted = true;
  const newType = component && component.componentWhillCreateElement ?
    component.componentWhillCreateElement(type, ...args) : null;
  return initailCreateElement.call(this, newType || type, ...args);
};

function printError() {
  if (!component) return;
  const componentName = component &&
    component.constructor &&
    component.constructor.name;
  const statement1 = 'import * as React from \'react\'';
  const statement2 = 'import React from \'react\'';
  const errorMessage = [
    `mota: Unsupported usage found in component \`${componentName}\``,
    `Please replace \`${statement1}\` to \`${statement2}\``
  ].join(', ');
  console.log('%c%s', 'color:red;background:yellow;', errorMessage);
  component = null;
  throw new Error(errorMessage);
}

function on(com) {
  intercepted = false;
  component = com;
}

function off() {
  if (!intercepted) printError();
  component = null;
}

module.exports = { on, off };