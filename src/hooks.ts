/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { autorun, watch } from "ober";
import { useEffect, useMemo } from "react";

import { AnyFunction } from "./util";

export function useWatch(
  selector: () => any,
  handler: () => void,
  immed = false
) {
  return useEffect(() => watch(selector, handler, immed), [immed]);
}

export function useAutoRun(handler: () => void) {
  return useEffect(() => autorun(handler), []);
}

export function useBoundMethod<T, M extends keyof T>(
  target: T,
  name: M
): Pick<T, M>[M] {
  return useMemo(() => {
    const method: AnyFunction = (target as any)[name];
    return typeof method === "function" ? method.bind(target) : method;
  }, [target, name]);
}
