/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { ObserveConfig } from "ober";
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
  ObserveConfig,
  ObserveSpy,
  isProxy,
  type ObserveMode,
} from "ober";

export { version } from "./info";

ObserveConfig.logPrefix = name.toLocaleUpperCase();
