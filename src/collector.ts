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

import React from "react";
import { isSyncRequired } from "./input";

export type Collector = {
  render: (...args: any[]) => React.ReactNode;
  update: () => void;
  destroy: () => void;
  dependencies: Set<string>;
};

export const createCollector = (
  rawRender: (...args: any[]) => React.ReactNode,
  update: () => void
): Collector => {
  const trigger = (info: ObserveData) =>
    isSyncRequired(info.value) ? update() : nextTick(update, false);
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
