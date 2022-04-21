import { ComponentClass, ComponentType, FunctionComponent, isClassComponent } from './util';
import { useEffect, useMemo, useState } from 'react';

import { createCollector } from './collector';
import { createSymbol } from 'ober';
import { name } from './info';

const collectorKey: string = createSymbol(name) as any;

const wrapClassComponent = <T extends ComponentClass>(Component: T): T => {
  const Wrapper = class extends Component {
    static displayName = Component.name || 'Component';
    constructor(...args: any[]) {
      super(...args);
      const collector = createCollector(
        () => super.render(), () => this.setState({})
      );
      this.state = {
        ...this.state,
        [collectorKey]: collector,
      };
    }
    render() {
      return this.state[collectorKey].render();
    }
    componentWillUnmount(): void {
      this.state[collectorKey].destroy();
      super.componentWillUnmount();
    }
  };
  return Wrapper;
}

const wrapFunctionComponent = <T extends FunctionComponent>(FC: T): T => {
  const Wrapper = (...args: any[]) => {
    const [, setState] = useState({});
    const collector = useMemo(() => {
      return createCollector(FC, () => setState({}));
    }, []);
    useEffect(() => () => collector.destroy(), [collector]);
    return collector.render(...args);
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