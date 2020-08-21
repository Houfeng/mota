/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { annotation } from '../common/annotation';
import { convertElement } from './factory';
import { owner } from './owner';

function beginRender(component) {
  owner.component = component;
  owner.model = component && component.model;
  owner.fitters = annotation.get('fitters', component);
}

function endRender() {
  owner.component = null;
  owner.model = null;
  owner.fitters = null;
}

export function wrapRender(initialRender) {
  return function (...args) {
    beginRender(this);
    let element = initialRender.call(this, ...args);
    if (owner.fitters) {
      element = convertElement(element, owner.model, owner.fitters);
    }
    endRender();
    return element;
  };
}
