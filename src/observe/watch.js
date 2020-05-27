/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import * as observable from 'ober';
import { isFunction } from 'ober';
import { lifecycles } from '../connect/lifecycle';
import { annotation } from '../common/annotation';

export function watch(calc, immed) {
  if (!isFunction(calc)) {
    throw new Error('Watch needs to specify a calculation function');
  }
  return function (target, method) {
    let trackable;
    //watch 如果已经存在，比如父类声明了，calc 函数可能不同，子类也要添加
    //可能多个 calc 都想执行同一个方法
    lifecycles.didMount.add(target, function () {
      if (!this[method]) return;
      const handler = this[method].bind(this);
      trackable = observable.watch(() => calc(this.model), handler, immed);
    });
    lifecycles.unmount.add(target, function () {
      if (trackable) trackable.destroy();
    });
    annotation.set('watch', true, target, method);
  };
}
