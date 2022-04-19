import { ComponentClass, ComponentType, FunctionComponent, isClassComponent, overrideFunctionName } from './util';
import { useEffect, useMemo, useState } from 'react';

import { createTracker } from './tracker';

const wrapClassComponent = <T extends ComponentClass>(Component: T): T => {
  const Wrapper = class extends Component {
    constructor(...args: any[]) {
      super(...args);
    }
    __tracker = createTracker(() => super.render());
    render() {
      return this.__tracker.render();
    }
    componentWillUnmount(): void {
      this.__tracker.destroy();
      super.componentWillUnmount();
    }
  };
  overrideFunctionName(Wrapper, Component.name);
  return Wrapper;
}

const wrapFunctionComponent = <T extends FunctionComponent>(FC: T): T => {
  const Wrapper = (...args: any[]) => {
    const tracker = useMemo(() => createTracker(FC), []);
    useEffect(() => () => tracker.destroy(), []);
    const [tick, setTick] = useState(0);
    tracker.update = () => {
      debugger
      setTick(tick + 1)
    };
    return tracker.render(...args);
  };
  overrideFunctionName(Wrapper, FC.name);
  return Wrapper as T;
}

export const observer = <T extends ComponentType>(com: T) => {
  const Wrapper = isClassComponent(com)
    ? wrapClassComponent(com)
    : wrapFunctionComponent(com)
  return Wrapper as T;
};