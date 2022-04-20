import { ObserveConfig, nextTick } from 'ober';

import { ReactDOMUtil } from './util';
import { name } from './info';

export { name, version } from './info';
export { observer } from './observer';
export { createSnapshot, useSnapshot } from './snapshot';

export {
  observable,
  ObserveConfig,
  ObservePerf,
  ObserveEvent,
  ObserveMode,
  nextTick,
} from 'ober';

nextTick.owner.transaction = ReactDOMUtil.unstable_batchedUpdates;
ObserveConfig.logPrefix = name.toLocaleUpperCase();