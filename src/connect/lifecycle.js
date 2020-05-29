/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { annotation } from '../common/annotation';

export class Lifecycle {

  constructor(name) {
    this.key = `${name}:handlers`;
  }

  add(target, handler) {
    annotation.push(this.key, handler, target);
  }

  get(target) {
    const base = Object.getPrototypeOf(target);
    const baseList = base ? this.get(base) : null;
    const list = annotation.get(this.key, target, null, true);
    if (!list) return baseList;
    return baseList ? [].concat(baseList, list) : list;
  }

}

export const lifecycles = {
  didMount: new Lifecycle('didMount'),
  unmount: new Lifecycle('unmount'),
  didUpdate: new Lifecycle('didUpdate'),
  model: new Lifecycle('model'),
};
