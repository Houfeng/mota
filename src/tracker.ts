import { ObserveEvent, ObserveState, nextTick, subscribe, track, unsubscribe } from 'ober';

import { syncUpdate } from './sync';

type Tracker = {
  render?: (...args: any[]) => React.ReactNode,
  update?: () => void;
  trigger?: () => void;
  destroy?: () => void;
}

export const createTracker = (
  rawRender: (...args: any[]) => React.ReactNode
): Tracker => {
  const owner: Tracker = {};
  const trigger = () => {
    if (!owner.update) return;
    const { inputting, composing } = syncUpdate;
    return (inputting || composing) ?
      owner.update() : nextTick(owner.update, null, true);
  };
  trigger.dependencies = new Set<string>();
  const render = (...args: any[]) => {
    const originSetState = ObserveState.set;
    ObserveState.set = false;
    unsubscribe(ObserveEvent.set, trigger);
    const { result, dependencies } = track(() => rawRender(...args));
    trigger.dependencies = dependencies;
    subscribe(ObserveEvent.set, trigger);
    ObserveState.set = originSetState;
    return result;
  };
  const destroy = () => {
    subscribe(ObserveEvent.set, trigger);
  };
  owner.trigger = trigger;
  owner.render = render;
  owner.destroy = destroy;
  return owner;
};