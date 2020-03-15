/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import React from 'react';
import { annotation } from '../common/annotation';
import { convertElement } from './factory';
import { owner } from './owner';

const originCreateElement = React.createElement;
React.createElement = function (type, props, ...args) {
  owner.intercepted = true;
  if (owner.fitters) {
    owner.fitters.forEach(fitter => fitter(type, props, owner.model));
  }
  return originCreateElement.call(this, type, props, ...args);
};

function beginRender(component) {
  owner.component = component;
  owner.model = component && component.model;
  owner.fitters = annotation.get('fitters', component);
  owner.intercepted = false;
}

function endRender() {
  owner.component = null;
  owner.model = null;
  owner.fitters = null;
  owner.intercepted = false;
}

export function wrapRender(initailRender) {
  return function (...args) {
    beginRender(this);
    let element = initailRender.call(this, ...args);
    if (!owner.intercepted && owner.fitters) {
      element = convertElement(element, owner.model, owner.fitters);
    }
    endRender();
    return element;
  };
}
