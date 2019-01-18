/**
 * Copyright (c) 2012-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

const lifecycle = require('./lifecycle');
const { get, set } = require('./annotation');

function autorun(target, method) {
  if (!target) return autorun;
  let autoRef;
  lifecycle.didMount.add(target, function () {
    const context = this;
    if (!context._observer_) return;
    const deep = get('deep', context, method);
    autoRef = context._observer_.run(context[method], { context, deep });
    autoRef.run();
  });
  lifecycle.unmount.add(target, function () {
    this._observer_.stop(autoRef);
  });
  set('autorun', true, target, method);
}

module.exports = autorun;