/**
 * Copyright (c) 2012-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

const { push, get } = require('./annotation');

class Lifecycle {

  constructor(name) {
    this.key = `${name}:handlers`;
  }

  add(target, handler) {
    push(this.key, handler, target);
  }

  get(target) {
    const base = Object.getPrototypeOf(target);
    const baseList = base ? this.get(base) : null;
    const list = get(this.key, target, null, true);
    if (!list) return baseList;
    return baseList ? [].concat(baseList, list) : list;
  }

}

function create(list) {
  const map = {};
  list.forEach(name => map[name] = new Lifecycle(name));
  return map;
}

const lifecycle = create(['didMount', 'unmount', 'didUpdate', 'model']);

lifecycle.lifecycle = lifecycle;
module.exports = lifecycle;