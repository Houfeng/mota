/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { lifecycle } from './lifecycle';
import { get, set } from './annotation';

export function autorun(target, method) {
  if (!target || !method) return autorun;
  //autorun 如果已经存在，比如父类声明了，都不再重复处理
  const exist = get('autorun', target, method);
  if (exist) return;
  let autoRef;
  lifecycle.didMount.add(target, function () {
    const context = this;
    if (!context._observer_) return;
    const deep = get('deep', context, method);
    autoRef = context._observer_.run(context[method], { context, deep });
    autoRef.run();
  });
  lifecycle.unmount.add(target, function () {
    this._observer_.stop(autoRef);
  });
  set('autorun', true, target, method);
}
