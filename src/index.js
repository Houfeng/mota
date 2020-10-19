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
import { lifecycle } from './connect/lifecycle';
import { useModel } from './hooks';
import { createFitter } from './fitter/factory';
import {
  nextTick, observable, ObserveConfig, ObserveMode, ObserveEvent,
  ObservePerf, untrack, untrackable
} from 'ober';

export {
  version, connect, model, useModel, watch, mapping, autorun, lifecycle,
  createFitter, bindable, binding, nextTick, observable, ObserveConfig,
  ObserveMode, ObserveEvent, ObservePerf, untrack, untrackable
};
