/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import info from '$info';
import * as utils from './common/utils';
import { Observer, expression, nextTick } from 'ober';
import { connect } from './connect/connect';
import { model } from './connect/model';
import { binding } from './binding/binding';
import { bindable } from './binding/bindable';
import { autorun } from './observe/autorun';
import { watch } from './observe/watch';
import { deep } from './connect/deep';
import { mapping } from './connect/mapping';
import { stateful } from './connect/stateful';
import { inputRepair } from './connect/input';
import { annotation } from './common/annotation';
import { lifecycles, lifecycle } from './connect/lifecycle';
import { useModel } from './hooks';
import { createFitter } from './fitter/factory';

export default {
  connect, model, binding, bindable, watch, mapping, autorun, deep,
  stateful, inputRepair, Observer, expression, nextTick, annotation,
  lifecycles, lifecycle, useModel, createFitter, utils, ...info
};
