/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import * as observable from 'ober';
import { lifecycle } from '../connect/lifecycle';
import { annotation } from '../common/annotation';

export function autorun(target, method) {
  if (!target || !method) return autorun;
  //autorun 如果已经存在，比如父类声明了，都不再重复处理
  const exist = annotation.get('autorun', target, method);
  if (exist) return;
  lifecycle.didMount.add(target, function () {
    if (!this[method]) return;
    const handler = this[method].bind(this);
    this[method] = observable.autorun(handler, true);
  });
  lifecycle.unmount.add(target, function () {
    if (this[method]) this[method].destroy();
  });
  annotation.set('autorun', true, target, method);
}
