/**
 * Copyright (c) 2012-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

const { set } = require('./annotation');

function recursive(target) {
  if (!target) return recursive;
  const proto = target.prototype || target;
  if (proto.hasOwnProperty('_contented_')) {
    throw new Error('`recursive` must be enabled before `model`');
  }
  set('recursive', true, target);
  return target;
}

module.exports = recursive;