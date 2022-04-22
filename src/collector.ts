import {
  ObserveEvent,
  ObserveState,
  collect,
  nextTick,
  subscribe,
  unsubscribe,
} from "ober";

import { syncUpdate } from "./sync";

export const createCollector = (
  rawRender: (...args: any[]) => React.ReactNode,
  update: () => void
) => {
  const trigger = () => {
    const { inputting, composing } = syncUpdate;
    return inputting || composing ? update() : nextTick(update, false);
  };
  trigger.dependencies = new Set<string>();
  const render = (...args: any[]) => {
    const originSetState = ObserveState.set;
    ObserveState.set = false;
    unsubscribe(ObserveEvent.set, trigger);
    const { result, dependencies } = collect(() => rawRender(...args));
    trigger.dependencies = dependencies;
    subscribe(ObserveEvent.set, trigger);
    ObserveState.set = originSetState;
    return result;
  };
  const destroy = () => subscribe(ObserveEvent.set, trigger);
  return {
    render,
    destroy,
    update,
    get dependencies() {
      return trigger.dependencies;
    },
  };
};
