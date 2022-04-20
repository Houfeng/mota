import { ComponentClass, ComponentType, FunctionComponent, isClassComponent } from './util';
import { useEffect, useMemo, useState } from 'react';

import { createTracker } from './tracker';

const wrapClassComponent = <T extends ComponentClass>(Component: T): T => {
  const Wrapper = class extends Component {
    static displayName = Component.name || 'Component';
    __tracker = createTracker(() => super.render(), () => this.setState({}));
    constructor(...args: any[]) {
      super(...args);
      this.state = this.state || {};
    }
    render() {
      return this.__tracker.render();
    }
    componentWillUnmount(): void {
      this.__tracker.destroy();
      super.componentWillUnmount();
    }
  };
  return Wrapper;
}

const wrapFunctionComponent = <T extends FunctionComponent>(FC: T): T => {
  const Wrapper = (...args: any[]) => {
    const [, setState] = useState({});
    const tracker = useMemo(() => createTracker(FC, () => setState({})), []);
    useEffect(() => () => tracker.destroy(), [tracker]);
    return tracker.render(...args);
  };
  Wrapper.displayName = FC.name || 'FC';
  return Wrapper as T;
}

export const observer = <T extends ComponentType>(com: T) => {
  const Wrapper = isClassComponent(com)
    ? wrapClassComponent(com)
    : wrapFunctionComponent(com)
  return Wrapper as (T & { displayName?: string });
};