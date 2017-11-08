const {
  registerMountHandler, registerUnMountHandler, markAsAutorun
} = require('./utils');

function autorun(target, method) {
  if (!target) return autorun;
  let autoRef;
  registerMountHandler(target, function () {
    const context = this;
    const deep = target._deep_ && target._deep_[method];
    autoRef = this._observer_.run(target[method], { context, deep });
    autoRef.run();
  });
  registerUnMountHandler(target, function () {
    this._observer_.stop(autoRef);
  });
  markAsAutorun(target, method);
}

module.exports = autorun;