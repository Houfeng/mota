/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import {
  Component,
  ReactNode,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import {
  ComponentClass,
  ComponentType,
  FunctionComponent,
  isClassComponent,
} from "./util";
import {
  ObserveData,
  ReactiveFunction,
  define,
  getOwnValue,
  nextTick,
  reactivable,
} from "ober";

import { inSyncHandler } from "./sync";
import { isSyncInput } from "./input";

function createReactiver(
  render: (...args: any[]) => ReactNode,
  requestUpdate: () => void,
  bind = true
) {
  const update = (info?: ObserveData) => {
    return inSyncHandler() || isSyncInput(info?.value)
      ? requestUpdate()
      : nextTick(requestUpdate);
  };
  return reactivable(render, { bind, update, batch: false });
}

function getDisplayName(
  target: ComponentClass | FunctionComponent,
  defaultName: string
) {
  return target.displayName || target.name || defaultName;
}

type ObserverComponent = Component & { __reactiver__: ReactiveFunction };

function wrapClassComponent<T extends ComponentClass>(Component: T): T {
  // 8.1.10 之前的版本是通过 extends 传入 Component 的 mixin 方式
  // 如果上层应用不编译将一个 Native Class 传入，
  // 此处 Wrapper 被 ts 编译后 Function 在 extends 时
  // _supper.apply 将引发 invoked without 'new' 错误，所有 TS/Babel 类代码均有此问题
  // 所以，在 8.1.10 后的版本采用「直接修改原型」的方式实现
  const proto = Component.prototype as Component;
  const { render, componentWillUnmount } = proto;
  proto.render = function (this: ObserverComponent) {
    // 如果是实被子类调用直接执行原 render
    if (this.constructor !== Component) return render?.call(this);
    if (!this.__reactiver__) {
      let tick = 0;
      this.__reactiver__ = createReactiver(
        () => render?.call(this),
        () => this.setState({ __tick__: ++tick })
      );
    }
    return this.__reactiver__();
  };
  proto.componentWillUnmount = function (this: ObserverComponent) {
    this.__reactiver__!.unsubscribe!();
    componentWillUnmount?.call(this);
  };
  Component.displayName = getDisplayName(Component, "Component");
  return Component;
}

function wrapFunctionComponent<T extends FunctionComponent>(FC: T): T {
  const Wrapper = (...args: any[]) => {
    const setState = useState([])[1];
    const reactiver = useMemo(() => {
      return createReactiver(FC, () => setState([]), false);
    }, []);
    useLayoutEffect(() => {
      reactiver.subscribe!();
      return reactiver.unsubscribe;
    }, [reactiver]);
    return reactiver(...args);
  };
  Object.setPrototypeOf(Wrapper, FC);
  Wrapper.displayName = getDisplayName(FC, "FC");
  return Wrapper as T;
}

/**
 * 将一个组件转换为可响应组件 (不能是 memo/forwardRef/lazy 后的组件)
 * @param target 原类组件或函数组件
 * @returns 具有响应能力的组件
 */
export function observer<T extends ComponentType>(target: T) {
  if (!target || getOwnValue(target, "__observer__")) return target;
  const Wrapper = isClassComponent(target)
    ? wrapClassComponent(target)
    : wrapFunctionComponent(target);
  target.__observer__ = true;
  define(target, "__observer__", true);
  return Wrapper as T & { displayName?: string };
}
