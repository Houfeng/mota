const lifecycle = require('./lifecycle');
const { get, set } = require('./annotation');

function autorun(target, method) {
  if (!target) return autorun;
  let autoRef;
  lifecycle.didMount.add(target, function () {
    if (!this._observer_) return;
    if (get('autorun_started', target, method)) return;
    set('autorun_started', true, target, method);
    const context = this;
    const deep = get('deep', target, method);
    autoRef = this._observer_.run(this[method], { context, deep });
    autoRef.run();
  });
  lifecycle.unmount.add(target, function () {
    this._observer_.stop(autoRef);
  });
  set('autorun', true, target, method);
}

module.exports = autorun;