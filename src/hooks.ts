/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { DependencyList, useLayoutEffect, useMemo } from "react";
import { autorun, observable, watch } from "ober";

export function useWatch(
  selector: () => any,
  handler: () => void,
  immed = false
) {
  return useLayoutEffect(() => watch(selector, handler, immed), [immed]);
}

export function useAutoRun(handler: () => void) {
  return useLayoutEffect(() => autorun(handler), []);
}

export function useObservable<T extends object>(
  value: T | (() => T),
  deps: DependencyList = []
): T {
  return useMemo<T>(() => {
    return observable(value instanceof Function ? value() : value);
  }, deps);
}
