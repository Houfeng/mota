/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import React from 'react';
import { isNull } from 'ntils';
import { convertElement, convertProps } from './binding';
import { get } from './annotation';
import { options } from './conf';
import { owner } from './owner';

if (!Object.isFrozen) Object.isFrozen = () => false;

const initailCreateElement = React.createElement;
React.createElement = function (type, props, ...args) {
  owner.intercepted = true;
  if (owner.component && owner.binding) convertProps(type, props);
  return initailCreateElement.call(this, type, props, ...args);
};

function beginRender(component) {
  owner.component = component;
  owner.intercepted = false;
  let binding = get('binding', component);
  if (isNull(binding)) binding = options.binding;
  owner.binding = binding;
}

function endRender() {
  owner.component = null;
  owner.intercepted = false;
  owner.binding = false;
}

function wrapRender(initailRender) {
  return function (...args) {
    beginRender(this);
    let element = initailRender.call(this, ...args);
    if (!owner.binding) return element;
    if (!owner.intercepted) element = convertElement(element);
    endRender();
    return element;
  };
}

export default { wrapRender };
