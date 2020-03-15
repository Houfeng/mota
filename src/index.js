/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { Observer, expression, nextTick } from 'ober';
import { connect } from './connect';
import { model } from './model';
import { binding } from './binding';
import { bindable } from './bindable';
import { autorun } from './autorun';
import { watch } from './watch';
import { deep } from './deep';
import { mapping } from './mapping';
import * as utils from './utils';
import { stateful } from './stateful';
import { composition } from './composition';
import { annotation } from './annotation';
import { lifecycle } from './lifecycle';
import { config } from './conf';
import { useModel } from './hook';
import info from '$info';

export default {
  connect, model, binding, bindable, watch, mapping, autorun, deep, stateful,
  composition, Observer, expression, nextTick, annotation, lifecycle, useModel,
  utils, config, ...info
};
