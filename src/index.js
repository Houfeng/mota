/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { version } from './common/info';
import { connect } from './connect/connect';
import { model } from './connect/model';
import { binding } from './binding/binding';
import { bindable } from './binding/bindable';
import { autorun } from './observe/autorun';
import { watch } from './observe/watch';
import { mapping } from './connect/mapping';
import { lifecycles } from './connect/lifecycle';
import { useModel } from './hooks';
import { createFitter } from './fitter/factory';
import { nextTick, observable, ObservePerf, untrack, untrackable } from 'ober';

export {
  connect, model, useModel, binding, bindable, watch, mapping, autorun,
  nextTick, lifecycles, createFitter, observable, ObservePerf, untrack,
  untrackable, version
};

export default {
  connect, model, useModel, binding, bindable, watch, mapping, autorun,
  nextTick, lifecycles, createFitter, observable, ObservePerf, untrack,
  untrackable, version
};
