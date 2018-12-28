/**
 * Copyright (c) 2012-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

const { isFunction } = require('ntils');
const lifecycle = require('./lifecycle');
const { get, set, push } = require('./annotation');

function watch(calculator, immed) {
  if (!isFunction(calculator)) {
    throw new Error('Watch needs to specify a calculation function');
  }
  return function (target, method) {
    let watcher;
    lifecycle.didMount.add(target, function () {
      if (!this._observer_) return;
      const calcs = get('watch_calcs', target, method);
      if (calcs && calcs.indexOf(calculator) > -1) return;
      push('watch_calcs', calculator, target, method);
      const context = this;
      const deep = get('deep', target, method);
      watcher = this._observer_.watch(function () {
        return calculator.call(this, this.model);
      }, this[method], { context, deep });
      //immed 通过 autorun.run 方法会传递给 watcher.calc 方法
      watcher.autoRef.run(immed || false);
    });
    lifecycle.unmount.add(target, function () {
      this._observer_.unWatch(watcher);
    });
    set('watch', true, target, method);
  };
}

module.exports = watch;