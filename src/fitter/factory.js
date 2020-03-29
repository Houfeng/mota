/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import React from 'react';
import { isArray, isFunction } from 'ntils';
import { isComponentClass } from '../common/utils';
import { owner } from './owner';
import { annotation } from '../common/annotation';
import { connect } from '../connect/connect';

//处理 Object.isFrozen 
Object.isFrozen = Object.isFrozen || (() => false);

export function convertElement(element, model, fitters, deep) {
  if (!element) return element;
  if (isArray(element)) {
    return element.map(el => convertElement(el, model, fitters, deep));
  }
  if (element.type && element.props) {
    if (Object.isFrozen(element)) {
      element = Object.assign({}, element);
    }
    if (Object.isFrozen(element.props)) {
      element.props = Object.assign({}, element.props);
    }
    fitters.forEach(fitter => fitter(element.type, element.props, model));
  }
  if (deep !== false && element.props && element.props.children) {
    element.props.children = convertElement(
      element.props.children, model, fitters, deep
    );
  }
  return element;
}

export class ComlizeWrapper extends React.Component {
  render() {
    const { origin, context, args } = this.props;
    return origin.call(context, ...args);
  }
}

export function createFitter(handler) {
  return function func(target, model, deep) {
    if (!target) return func;
    if (isComponentClass(target)) {
      annotation.push('fitters', handler, target.prototype || target);
      return target;
    }
    if (!model) model = owner.component && owner.component.model;
    if (!model) throw new Error('Compose error: Invalid model');
    if (isFunction(target)) {
      return function (...args) {
        const Comlize = func(connect(model, ComlizeWrapper));
        return <Comlize origin={target} context={this} args={args} />;
      };
    } else {
      return convertElement(target, model, [handler], deep);
    }
  };
}
