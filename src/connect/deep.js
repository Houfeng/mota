/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { annotation } from '../common/annotation';

export function deep(target, method) {
  if (!target) return deep;
  const error = method ?
    annotation.get('autorun', target, method) ||
    annotation.get('watch', target, method) :
    target && target.prototype && target.prototype._contented_;
  if (error) {
    throw new Error('`deep` must be enabled before `model/autorun/watch`');
  }
  annotation.set('deep', true, target, method);
}
