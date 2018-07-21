const { isFunction } = require('ntils');
const {
  registerMountHandler, registerUnmountHandler, markAsWatch
} = require('./utils');

function watch(calculator, immed) {
  if (!isFunction(calculator)) {
    throw new Error('Watch needs to specify a calculation function');
  }
  return function (target, method) {
    let watcher;
    registerMountHandler(target, function () {
      const context = this;
      const deep = target._deep_ && target._deep_[method];
      watcher = this._observer_.watch(function () {
        return calculator.call(this, this.model);
      }, target[method], { context, deep });
      //immed 通过 autorun.run 方法会传递给 watcher.calc 方法
      watcher.autoRef.run(immed || false);
    });
    registerUnmountHandler(target, function () {
      this._observer_.unWatch(watcher);
    });
    markAsWatch(target, method);
  };
}

module.exports = watch;