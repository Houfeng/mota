/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

const { get, set } = require('./annotation');

function deep(target, method) {
  if (!target) return deep;
  const error = method ?
    get('autorun', target, method) || get('watch', target, method) :
    target && target.prototype && target.prototype._contented_;
  if (error) {
    throw new Error('`deep` must be enabled before `model/autorun/watch`');
  }
  set('deep', true, target, method);
}

module.exports = deep;