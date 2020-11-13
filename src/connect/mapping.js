/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { ObserveError, isArray, isObject } from 'ober';
import { getByPath, setByPath } from 'ntils';

import { ContentedSymbol } from '../common/symbols';
import { lifecycle } from './lifecycle';

export function mapping(map) {
  if (!isObject(map)) {
    throw ObserveError('Mapping needs to specify a object or array');
  }
  function assign(model, props, prevProps) {
    Object.keys(map).forEach(propName => {
      const modelField = map[propName];
      if (isArray(map)) propName = modelField;
      const propValue = getByPath(props, propName);
      const modelValue = getByPath(model, modelField);
      if (modelValue === propValue ||
        (prevProps && getByPath(prevProps, propName) === propValue)) {
        return;
      }
      setByPath(model, modelField, propValue);
    });
  }
  return function (component) {
    if (!component) throw ObserveError('Invalid Component');
    const proto = component.prototype;
    if (proto[ContentedSymbol]) {
      throw ObserveError('`mapping` must be enabled before `model`');
    }
    lifecycle.model.add(proto, function () {
      assign(this.model, this.props);
    });
    lifecycle.didUpdate.add(proto, function (prevProps) {
      assign(this.model, this.props, prevProps);
    });
  };
}
