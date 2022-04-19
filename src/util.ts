export const inBrowser = () => typeof document !== 'undefined';
export type AnyFunction = (...args: any[]) => any;

export type ComponentClass = {
  new(...args: any[]): React.Component<any, any>;
}

export type FunctionComponent = (...args: any[]) => React.ReactNode;
export type ComponentType = ComponentClass | FunctionComponent;

export const isClassComponent = (com: ComponentType): com is ComponentClass => {
  return !!com.prototype.render;
}

export const overrideFunctionName = <T extends Function>(fn: T, name: string) => {
  Object.defineProperty(fn, "name", { value: name });
}