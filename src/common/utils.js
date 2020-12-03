/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { ObserveError, isFunction, isObject } from 'ober';

import React from 'react';

export function isComponentInstance(instance) {
  if (!instance || !isObject(instance)) return false;
  return (instance instanceof React.Component) ||
    (instance instanceof React.PureComponent) ||
    ('render' in instance && '__reactAutoBindPairs' in instance);
}

export function isComponentClass(com) {
  if (!com) return false;
  return isComponentInstance(com.prototype);
}

export function has(owner, key, ownOnly) {
  if (ownOnly === false) return !!(owner && owner[key]);
  return owner && owner.hasOwnProperty(key);
}

export function defineGetter(owner, key, value) {
  const getter = isFunction(value) ? value :
    function () { return value; };
  //防止 babel 为 ts 仅类型声明的 filed 
  //生成初始化（赋值）为 undefined 的代码，而报出不能写的错误
  const setter = function () { };
  Object.defineProperty(owner, key, {
    configurable: true,
    enumerable: false,
    get: getter,
    set: setter,
  });
}

export function isESModule(obj) {
  if (!obj) return;
  return obj.__esModule ||
    Object.prototype.toString.call(obj) === '[object Module]';
}

export function getModelState(model) {
  if (!isESModule(model)) return model;
  if (model.state) return model.state;
  throw ObserveError(
    'When using ES module as a model, the module must export \'state\''
  );
}

export function supportHook() {
  return !!React.useState;
}
