/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import {
  ObserveConfig,
  ObserveEvent,
  ObserveMode,
  ObservePerf,
  nextTick,
  observable,
  untrack,
  untrackable
} from 'ober';
import { name, version } from './common/info';

import { ReactDOM } from './common/peers';
import { autorun } from './observe/autorun';
import { bindable } from './binding/bindable';
import { binding } from './binding/binding';
import { connect } from './connect/connect';
import { createFitter } from './fitter/factory';
import { lifecycle } from './connect/lifecycle';
import { mapping } from './connect/mapping';
import { model } from './connect/model';
import { useModel } from './hooks';
import { watch } from './observe/watch';

export {
  version, connect, model, useModel, watch, mapping, autorun, lifecycle,
  createFitter, bindable, binding, nextTick, observable, ObserveConfig,
  ObserveMode, ObserveEvent, ObservePerf, untrack, untrackable
};

nextTick.owner.transaction = ReactDOM.unstable_batchedUpdates;
ObserveConfig.logPrefix = name.toLocaleUpperCase();
