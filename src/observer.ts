/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import {
  ComponentClass,
  ComponentType,
  FunctionComponent,
  isClassComponent,
} from "./util";
import { ObserveData, ReactiveFunction, nextTick, reactivable } from "ober";
import { ReactNode, useLayoutEffect, useMemo, useState } from "react";

import { isSyncRequired } from "./input";

function createReactiver(
  render: (...args: any[]) => ReactNode,
  requestUpdate: () => void,
  bind = true
) {
  const update = (info: ObserveData) =>
    isSyncRequired(info?.value)
      ? requestUpdate()
      : nextTick(requestUpdate, true);
  return reactivable(render, { bind, update });
}

function getDisplayName(
  target: ComponentClass | FunctionComponent,
  defaultName: string
) {
  return target.displayName || target.name || defaultName;
}

function wrapClassComponent<T extends ComponentClass>(Component: T): T {
  const Wrapper = class extends Component {
    static displayName = getDisplayName(Component, "Component");
    private __reactiver__: ReactiveFunction;
    render(): ReactNode {
      if (this.constructor !== Wrapper) return super.render();
      if (!this.__reactiver__) {
        this.__reactiver__ = createReactiver(
          () => super.render(),
          () => this.setState({})
        );
      }
      return this.__reactiver__();
    }
    componentWillUnmount(): void {
      this.__reactiver__.unsubscribe();
      super.componentWillUnmount?.();
    }
  };
  return Wrapper;
}

function wrapFunctionComponent<T extends FunctionComponent>(FC: T): T {
  const Wrapper = (...args: any[]) => {
    const setState = useState({})[1];
    const reactiver = useMemo(() => {
      return createReactiver(FC, () => setState({}), false);
    }, []);
    useLayoutEffect(() => {
      reactiver.subscribe();
      return reactiver.unsubscribe;
    }, [reactiver]);
    return reactiver(...args);
  };
  Wrapper.displayName = getDisplayName(FC, "FC");
  return Wrapper as T;
}

export function observer<T extends ComponentType>(target: T) {
  if (!target) return target;
  const Wrapper = isClassComponent(target)
    ? wrapClassComponent(target)
    : wrapFunctionComponent(target);
  return Wrapper as T & { displayName?: string };
}
