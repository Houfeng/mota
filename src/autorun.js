const utils = require('./utils');

module.exports = function autorun(target, name) {
  if (!target) return autorun;
  let autoRef;
  utils.registerMountHandler(target, function () {
    const context = this;
    autoRef = this._observer_.run(target[name], { context });
    autoRef.run();
  });
  utils.registerUnMountHandler(target, function () {
    this._observer_.stop(autoRef);
  });
};