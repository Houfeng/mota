const { markAsDeep } = require('./utils');

function deep(target, method) {
  if (!target) return deep;
  let invalid = false;
  if (method) {
    invalid = (target._autorun_ && target._autorun_[method]) || (
      target._watch_ && target._watch_[method]);
  } else {
    invalid = target && target.prototype && target.prototype._contented_;
  }
  if (invalid) {
    throw new Error('`deep` must be enabled before `model/autorun/watch`');
  }
  markAsDeep(target, method);
}

module.exports = deep;