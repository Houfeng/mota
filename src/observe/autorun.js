/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { lifecycles } from '../connect/lifecycle';
import { annotation } from '../common/annotation';
import * as observable from './observable';

export function autorun(target, method) {
  if (!target || !method) return autorun;
  //autorun 如果已经存在，比如父类声明了，都不再重复处理
  const exist = annotation.get('autorun', target, method);
  if (exist) return;
  lifecycles.didMount.add(target, function () {
    if (!this[method]) return;
    const handler = this[method].bind(this);
    this[method] = observable.autorun(handler, { immed: true });
  });
  lifecycles.unmount.add(target, function () {
    if (!this[method]) return;
    this[method].destory();
  });
  annotation.set('autorun', true, target, method);
}
