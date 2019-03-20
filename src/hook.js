/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

const Observer = require('ober');
const { useState, useEffect, useLayoutEffect } = require('react');
const { isFunction } = require('ntils');

const owner = { buffer: [], state: null, uuid: 0 };

function getter(info) {
  if (!owner.state || owner.buffer.indexOf(info.path) > -1) return;
  owner.buffer.push(`${this.id}.${info.path}`);
}

function collect(nextState) {
  if (owner.state) owner.state[2] = owner.buffer;
  owner.buffer = [];
  owner.state = nextState;
  return nextState;
}

function isESModule(obj) {
  if (!obj) return;
  return obj.__esModule ||
    Object.prototype.toString.call(obj) === '[object Module]';
}

function getModelState(model) {
  if (!isESModule(model)) return model;
  if (model.state) return model.state;
  throw new Error(
    'When using ES module as a model, the module must export \'state\''
  );
}

function hasChange(conditions, path) {
  if (!conditions) return false;
  return isFunction(conditions) ? conditions(path) :
    conditions.indexOf && conditions.indexOf(path) > -1;
}

function useObservable(factory, conditions) {
  const [state, update] = useState([]);
  if (state.length > 0) return collect(state);
  const isNew = factory instanceof Function;
  const model = isNew ? new factory() : factory;
  const observer = new Observer(getModelState(model));
  if (!observer.id) observer.id = '_observer_' + owner.uuid++;
  function setter(info) {
    const deps = state[2], fullPath = `${this.id}.${info.path}`;
    if (deps.indexOf(fullPath) > -1 || hasChange(conditions, info.path)) {
      update([...state]);
    }
  }
  function distory() {
    observer.off('change', setter);
    if (isNew) observer.clearReference();
  }
  Object.assign(state, [model, distory, []]);
  observer.off('get', getter);
  observer.on('get', getter);
  observer.on('change', setter);
  return collect(state);
}

function useModel(factory, conditions, debug) {
  const [model, distory, deps] = useObservable(factory, conditions);
  useEffect(() => distory, []);
  //最后一个 useModel 在 mounted 后完成收集（最后一个有可能多收集）
  useLayoutEffect(() => collect());
  if (debug) debug({ model, deps });
  return model;
}

module.exports = { useModel };