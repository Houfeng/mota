/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { Collector, createCollector } from "./collector";
import {
  ComponentClass,
  ComponentType,
  FunctionComponent,
  isClassComponent,
} from "./util";
import { useEffect, useMemo, useState } from "react";

const wrapClassComponent = <T extends ComponentClass>(Component: T): T => {
  const Wrapper = class extends Component {
    static displayName = Component.name || "Component";
    private __collector__: Collector;
    constructor(...args: any[]) {
      super(...args);
    }
    render() {
      if (this.__collector__) return super.render();
      this.__collector__ = createCollector(
        () => super.render(),
        () => this.setState({})
      );
      return this.__collector__.render();
    }
    componentWillUnmount(): void {
      this.__collector__?.destroy();
      super.componentWillUnmount?.();
    }
  };
  return Wrapper;
};

const wrapFunctionComponent = <T extends FunctionComponent>(FC: T): T => {
  const Wrapper = (...args: any[]) => {
    const [, setState] = useState({});
    const collector = useMemo(() => {
      return createCollector(FC, () => setState({}));
    }, []);
    useEffect(() => () => collector.destroy(), [collector]);
    return collector.render(...args);
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
