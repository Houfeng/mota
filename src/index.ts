/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { ObserveConfig, nextTick } from "ober";

import { ReactDOMUtil } from "./util";
import { name } from "./info";

export { name, version } from "./info";
export { observer } from "./observer";
export { useWatch, useAutoRun } from "./hooks";

export {
  observable,
  ObserveConfig,
  ObservePerf,
  ObserveEvent,
  ObserveMode,
  untrack,
  nextTick,
  watch,
  autorun,
} from "ober";

nextTick.owner.transaction = ReactDOMUtil.unstable_batchedUpdates;
ObserveConfig.logPrefix = name.toLocaleUpperCase();
