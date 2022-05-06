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
import { ObserveData, nextTick, reactivable } from "ober";
import { ReactNode, useEffect, useMemo, useState } from "react";

import { isSyncRequired } from "./input";

type Reactiver = (() => ReactNode) & { destroy?: () => void };

const createReactiver = (
  render: (...args: any[]) => ReactNode,
  requestUpdate: () => void
) => {
  const trigger = (info: ObserveData) =>
    isSyncRequired(info.value)
      ? requestUpdate()
      : nextTick(requestUpdate, false);
  return reactivable(render, trigger);
};

const wrapClassComponent = <T extends ComponentClass>(Component: T): T => {
  const Wrapper = class extends Component {
    static displayName = Component.name || "Component";
    private __reactiver__: Reactiver;
    constructor(...args: any[]) {
      super(...args);
    }
    render() {
      if (this.__reactiver__) return super.render();
      this.__reactiver__ = createReactiver(
        () => super.render(),
        () => this.setState({})
      );
      return this.__reactiver__();
    }
    componentWillUnmount(): void {
      this.__reactiver__?.destroy();
      super.componentWillUnmount?.();
    }
  };
  return Wrapper;
};

const wrapFunctionComponent = <T extends FunctionComponent>(FC: T): T => {
  const Wrapper = (...args: any[]) => {
    const [, setState] = useState({});
    const reactiver = useMemo(() => {
      return createReactiver(FC, () => setState({}));
    }, []);
    useEffect(() => () => reactiver.destroy(), [reactiver]);
    return reactiver(...args);
  };
  Wrapper.displayName = FC.name || "FC";
  return Wrapper as T;
};

export const observer = <T extends ComponentType>(com: T) => {
  const Wrapper = isClassComponent(com)
    ? wrapClassComponent(com)
    : wrapFunctionComponent(com);
  return Wrapper as T & { displayName?: string };
};
