/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { DependencyList, useCallback, useLayoutEffect, useMemo } from "react";
import { autorun, computable, observable, watch } from "ober";

/**
 * 在函数组件中即时创建一个可观察对象
 * @param value 对象或创建对象的函数
 * @param deps 指定的依赖发生变化时，将重新创建
 * @returns 可观察对象
 */
export function useObservable<T extends object>(
  value: T | (() => T),
  deps: DependencyList = []
): T {
  return useMemo<T>(() => {
    return observable(value instanceof Function ? value() : value);
  }, deps);
}

/**
 * 创建一个观察器，每当用到的数据发生变化时，将重新计算
 * @param selector 计算函数，需返回一个值，将对新旧值进行浅对比，决定是否调用执行函数
 * @param handler 执行函数，由 selector 的计算结果决定是否重新执行
 * @param immed 是否立即执行一次 handler
 */
export function useWatch(
  selector: () => any,
  handler: (newValue?: any, oldValue?: any) => void,
  immed = false
) {
  return useLayoutEffect(() => watch(selector, handler, immed), [immed]);
}

/**
 * 启动一个自执行函数，当函数中用到的数据发生变化时它将自动重新执行
 * @param handler 将执行的函数
 */
export function useAutoRun(handler: () => void) {
  return useLayoutEffect(() => autorun(handler), []);
}

/**
 * 创建一个具备缓存能力的计算结果，
 * 计算函数用到的数据发生变化时将重新计算并驱动组件更新，否则将使用缓存
 * @param fn 计算函数
 * @returns 计算结果
 */
export function useComputed<T>(fn: () => T): T {
  const compute = useCallback(computable(fn, { bind: false }), []);
  useLayoutEffect(() => {
    compute.subscribe!();
    return () => compute.unsubscribe!();
  });
  return compute();
}
