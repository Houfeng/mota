const {
  isComponentInstance, registerMountHandler,
  registerUnMountHandler, markAsWatch
} = require('./utils');
const autorun = require('./autorun');

function watch(calculator, ...args) {
  if (!calculator) return autorun;
  if (isComponentInstance(calculator)) {
    return autorun(calculator, ...args);
  }
  return function (target, method) {
    if (!target) return autorun;
    let watcher;
    registerMountHandler(target, function () {
      const context = this;
      const deep = target._deep_ && target._deep_[method];
      watcher = this._observer_.watch(function () {
        return calculator.call(this, this.model);
      }, target[method], { context, deep });
      watcher.autoRef.run(false);
    });
    registerUnMountHandler(target, function () {
      this._observer_.unWatch(watcher);
    });
    markAsWatch(target, method);
  };
}

module.exports = watch;