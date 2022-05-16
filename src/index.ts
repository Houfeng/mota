/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { ObserveConfig, nextTick } from "ober";

import { ReactDOMUtil } from "./util";
import { name } from "./info";

export { version } from "./info";
export { observer } from "./observer";
export { useWatch, useAutoRun } from "./hooks";

export {
  observable,
  action,
  bind,
  ObserveInspector,
  ObserveConfig,
  ObserveMode,
  track,
  untrack,
  autorun,
  watch,
  nextTick,
} from "ober";

nextTick.batch = ReactDOMUtil.unstable_batchedUpdates;
ObserveConfig.logPrefix = name.toLocaleUpperCase();
