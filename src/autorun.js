const lifecycle = require('./lifecycle');
const { get, set } = require('./annotation');

function autorun(target, method) {
  if (!target) return autorun;
  let autoRef;
  lifecycle.didMount.add(target, function () {
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