/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { isObject, getByPath, setByPath, isArray } from 'ntils';
import { lifecycles } from './lifecycle';

export function mapping(map) {
  if (!isObject(map)) {
    throw new Error('Mapping needs to specify a object or array');
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
    if (!component) throw new Error('Invaild Component');
    const proto = component.prototype;
    if (proto._contented_) {
      throw new Error('`mapping` must be enabled before `model`');
    }
    lifecycles.model.add(proto, function () {
      console.log("lifecycles.model")
      assign(this.model, this.props);
    });
    lifecycles.didUpdate.add(proto, function (prevProps) {
      assign(this.model, this.props, prevProps);
    });
  };
}
