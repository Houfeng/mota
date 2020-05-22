/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import * as ober from 'ober';
import * as utils from './common/utils';
import { version } from './common/info';
import { expression } from 'ober';
import { connect } from './connect/connect';
import { model } from './connect/model';
import { binding } from './binding/binding';
import { bindable } from './binding/bindable';
import { autorun } from './observe/autorun';
import { watch } from './observe/watch';
import { mapping } from './connect/mapping';
import { stateful } from './connect/stateful';
import { inputRepair } from './connect/input';
import { annotation } from './common/annotation';
import { lifecycles, lifecycle } from './connect/lifecycle';
import { useModel } from './hooks';
import { createFitter } from './fitter/factory';
import {
  nextTick, observable, disableObserve, enableObserve, ObserveConfig,
  ObservePerf, ObserveHandlers, untrack, untrackable
} from 'ober';

export {
  connect, model, observable, binding, bindable, watch, mapping, autorun,
  stateful, inputRepair, expression, nextTick, annotation, ober, lifecycles,
  disableObserve, enableObserve, ObserveConfig, ObservePerf, ObserveHandlers,
  untrack, untrackable, useModel, createFitter, lifecycle, utils, version
};

export default {
  connect, model, observable, binding, bindable, watch, mapping, autorun,
  stateful, inputRepair, expression, nextTick, annotation, ober, lifecycles,
  disableObserve, enableObserve, ObserveConfig, ObservePerf, ObserveHandlers,
  untrack, untrackable, useModel, createFitter, lifecycle, utils, version
};
