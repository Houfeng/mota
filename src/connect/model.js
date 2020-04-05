/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { connect } from './connect';
import { isComponentClass } from '../common';

export function model(model, component) {
  if (isComponentClass(model)) return connect(component, model);
  if (model && component) return connect(model, component);
  return component => connect(model, component);
}
