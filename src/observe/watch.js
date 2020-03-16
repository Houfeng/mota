/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { isFunction } from 'ntils';
import { lifecycles } from '../connect/lifecycle';
import { annotation } from '../common/annotation';

export function watch(calculator, immed) {
  if (!isFunction(calculator)) {
    throw new Error('Watch needs to specify a calculation function');
  }
  return function (target, method) {
    let watcher;
    //watch 如果已经存在，比如父类声明了，calc 函数可能不同，子类也要添加
    //可能多个 calc 都想执行同一个方法
    lifecycles.didMount.add(target, function () {
      const context = this;
      if (!context._observer_) return;
      const deep = annotation.get('deep', context, method);
      watcher = context._observer_.watch(function () {
        return calculator.call(context, context.model);
      }, context[method], { context, deep });
      //immed 通过 autorun.run 方法会传递给 watcher.calc 方法
      watcher.autoRef.run(immed || false);
    });
    lifecycles.unmount.add(target, function () {
      this._observer_.unWatch(watcher);
    });
    annotation.set('watch', true, target, method);
  };
}
