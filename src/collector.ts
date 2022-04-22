/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import {
  ObserveData,
  ObserveEvent,
  ObserveState,
  collect,
  nextTick,
  subscribe,
  unsubscribe,
} from "ober";

import { inputOwner } from "./input";

export const createCollector = (
  rawRender: (...args: any[]) => React.ReactNode,
  update: () => void
) => {
  const trigger = (info: ObserveData) => {
    const { inputting, composing, value } = inputOwner;
    return (inputting || composing) && value === info.value
      ? update()
      : nextTick(update, false);
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
