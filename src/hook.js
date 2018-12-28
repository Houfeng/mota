/**
 * Copyright (c) 2012-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

const { useState, useEffect, useLayoutEffect } = require('react');
const Observer = require('ober');

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

function createModel(factory) {
  const [state, update] = useState([]);
  if (state.length > 0) return collect(state);
  const isNew = factory instanceof Function;
  const model = isNew ? new factory() : factory;
  const observer = new Observer(model);
  if (!observer.id) observer.id = '_observer_:' + owner.uuid++;
  function setter(info) {
    if (state[2].indexOf(`${this.id}.${info.path}`) < 0) return;
    update(state);
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

function useModel(factory) {
  const [model, distory] = createModel(factory);
  useEffect(() => distory, []);
  useLayoutEffect(() => collect());
  return model;
}

module.exports = { useModel };