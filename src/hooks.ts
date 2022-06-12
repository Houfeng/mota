/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { DependencyList, useCallback, useLayoutEffect, useMemo } from "react";
import { autorun, computable, observable, watch } from "ober";

import { AnyFunction } from "./util";

export function useObservable<T extends object>(
  value: T | (() => T),
  deps: DependencyList = []
): T {
  return useMemo<T>(() => {
    return observable(value instanceof Function ? value() : value);
  }, deps);
}

export function useWatch(
  selector: () => any,
  handler: (newValue?: any, oldValue?: any) => void,
  immed = false
) {
  return useLayoutEffect(() => watch(selector, handler, immed), [immed]);
}

export function useAutoRun(handler: () => void) {
  return useLayoutEffect(() => autorun(handler), []);
}

export function useComputed<T extends AnyFunction>(fn: T): T {
  const compute = useCallback(computable(fn, { bind: false }), []);
  useLayoutEffect(() => {
    compute.subscribe!();
    return () => compute.unsubscribe!();
  });
  return compute();
}
