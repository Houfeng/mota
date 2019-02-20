/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

const { isArray } = require('ntils');
const { has, defineGetter } = require('./utils');

const STORE_KEY = '_annotations_';

function getStore(target, member, ownOnly) {
  if (!target) return {};
  target = target.prototype || target;
  if (!has(target, STORE_KEY, ownOnly)) return {};
  const store = target[STORE_KEY];
  if (!member) return store;
  return has(store, member, ownOnly) ? store[member] : {};
}

function useStore(target, member) { 
  if (!target) throw new Error('Invalid annotation target');
  target = target.prototype || target;
  const baseStore = getStore(Object.getPrototypeOf(target));
  if (!has(target, STORE_KEY)) {
    defineGetter(target, STORE_KEY, Object.create(baseStore));
  }
  const store = target[STORE_KEY];
  if (!member) return store;
  if (!has(store, member)) {
    store[member] = Object.create(getStore(baseStore[member]));
  }
  return store[member];
}

function wrapKey(key) {
  return ':' + key;
}

function get(key, target, member, ownOnly) {
  if (!key) return null;
  key = wrapKey(key);
  const store = getStore(target, member, ownOnly || false);
  return store && store[key];
}

function set(key, value, target, member) {
  if (!key || !value) return null;
  key = wrapKey(key);
  const store = useStore(target, member); //eslint-disable-line
  store[key] = value;
  return value;
}

function push(key, value, target, member) {
  let list = get(key, target, member, true);
  if (list && !isArray(list)) throw new Error('Invaild Array');
  if (!list) list = set(key, [], target, member);
  list.push(value);
  return list;
}

function annotation(key, value) {
  return (target, member) => {
    set(key, value, target, member);
  };
}

annotation.set = set;
annotation.push = push;
annotation.get = get;
annotation.getAll = getStore;
annotation.annotation = annotation;
module.exports = annotation;