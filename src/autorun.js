const { registerMountHandler, registerUnMountHandler } = require('./utils');

module.exports = function autorun(target, method) {
  if (!target) return autorun;
  let autoRef;
  registerMountHandler(target, function () {
    const context = this;
    autoRef = this._observer_.run(target[method], { context });
    autoRef.run();
  });
  registerUnMountHandler(target, function () {
    this._observer_.stop(autoRef);
  });
};