/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import React from 'react';
import { convertElement, convertProps } from '../binding/binding';
import { annotation } from '../common/annotation';
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
  owner.binding = annotation.get('binding', component);
}

function endRender() {
  owner.component = null;
  owner.intercepted = false;
  owner.binding = false;
}

export function wrapRender(initailRender) {
  return function (...args) {
    beginRender(this);
    let element = initailRender.call(this, ...args);
    if (!owner.binding) return element;
    if (!owner.intercepted) element = convertElement(element);
    endRender();
    return element;
  };
}
