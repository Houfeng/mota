/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { ObserveConfig, nextTick } from "ober";

import { ReactDOMUtil } from "./util";
import { name } from "./info";

export {
  observable,
  action,
  bind,
  computed,
  track,
  untrack,
  autorun,
  watch,
  nextTick,
  ObserveInspector,
  ObserveConfig,
  type ObserveMode,
} from "ober";

export { version } from "./info";
export { observer } from "./observer";
export { useObservable, useWatch, useAutoRun, useComputed } from "./hooks";

nextTick.batch = ReactDOMUtil.unstable_batchedUpdates;
ObserveConfig.logPrefix = name.toLocaleUpperCase();
