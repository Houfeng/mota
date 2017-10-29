module.exports = function autorun(target, name) {
  if (!target) return autorun;
  if (!target._mountHandlers_) target._mountHandlers_ = [];
  if (!target._unmountHanlders_) target._unmountHanlders_ = [];
  let autoRef;
  target._mountHandlers_.push(function () {
    const context = this;
    autoRef = this._observer_.run(target[name], { context });
    autoRef.run();
  });
  target._unmountHanlders_.push(function () {
    this._observer_.stop(autoRef);
  });
};