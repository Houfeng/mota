const autorun = require('./autorun');
const React = require('react');

module.exports = function watch(calculator, ...args) {
  if (!calculator) return autorun;
  if (calculator instanceof React.Component) {
    return autorun(calculator, ...args);
  }
  return function (target, name) {
    if (!target) return autorun;
    if (!target._mountHandlers_) target._mountHandlers_ = [];
    if (!target._unmountHanlders_) target._unmountHanlders_ = [];
    let watcher;
    target._mountHandlers_.push(function () {
      const context = this;
      watcher = this._observer_.watch(calculator, target[name], { context });
      watcher.autoRef.run(false);
    });
    target._unmountHanlders_.push(function () {
      this._observer_.unWatch(watcher);
    });
  };
}