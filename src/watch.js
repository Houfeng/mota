const { isFunction } = require('ntils');
const {
  registerMountHandler, registerUnMountHandler, markAsWatch
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
      watcher.autoRef.run(immed || false);
    });
    registerUnMountHandler(target, function () {
      this._observer_.unWatch(watcher);
    });
    markAsWatch(target, method);
  };
}

module.exports = watch;