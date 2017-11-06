const {
  isComponentInstance, registerMountHandler, registerUnMountHandler
} = require('./utils');
const autorun = require('./autorun');

module.exports = function watch(calculator, ...args) {
  if (!calculator) return autorun;
  if (isComponentInstance(calculator)) {
    return autorun(calculator, ...args);
  }
  return function (target, method) {
    if (!target) return autorun;
    let watcher;
    registerMountHandler(target, function () {
      const context = this;
      watcher = this._observer_.watch(function () {
        return calculator.call(this, this.model);
      }, target[method], { context });
      watcher.autoRef.run(false);
    });
    registerUnMountHandler(target, function () {
      this._observer_.unWatch(watcher);
    });
  };
};