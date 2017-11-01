const autorun = require('./autorun');
const React = require('react');
const { registerMountHandler, registerUnMountHandler } = require('./utils');

module.exports = function watch(calculator, ...args) {
  if (!calculator) return autorun;
  if (calculator instanceof React.Component) {
    return autorun(calculator, ...args);
  }
  return function (target, name) {
    if (!target) return autorun;
    let watcher;
    registerMountHandler(target, function () {
      const context = this;
      watcher = this._observer_.watch(calculator, target[name], { context });
      watcher.autoRef.run(false);
    });
    registerUnMountHandler(target, function () {
      this._observer_.unWatch(watcher);
    });
  };
}