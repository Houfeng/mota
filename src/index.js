/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import * as ober from 'ober';
import { version } from './common/info';
import { connect } from './connect/connect';
import { model } from './connect/model';
import { binding } from './binding/binding';
import { bindable } from './binding/bindable';
import { autorun } from './observe/autorun';
import { watch } from './observe/watch';
import { mapping } from './connect/mapping';
import { stateful } from './connect/stateful';
import { inputRepair } from './connect/input';
import { lifecycles, lifecycle } from './connect/lifecycle';
import { useModel } from './hooks';
import { createFitter } from './fitter/factory';
import {
  nextTick, observable, ObserveConfig,
  ObservePerf, ObserveHandlers, untrack, untrackable
} from 'ober';

export {
  connect, model, observable, binding, bindable, watch, mapping, autorun,
  stateful, inputRepair, nextTick, ober, lifecycles, ObserveConfig, ObservePerf,
  ObserveHandlers, untrack, untrackable, useModel, createFitter, lifecycle,
  version
};

export default {
  connect, model, observable, binding, bindable, watch, mapping, autorun,
  stateful, inputRepair, nextTick, ober, lifecycles, ObserveConfig, ObservePerf,
  ObserveHandlers, untrack, untrackable, useModel, createFitter, lifecycle,
  version
};
