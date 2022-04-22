export const inBrowser = () => typeof document !== "undefined";
export const hasRequire = () => typeof require === "function";

export type AnyFunction = (...args: any[]) => any;

export type ComponentClass = {
  new (...args: any[]): React.Component<any, any>;
  displayName?: string;
};

export type FunctionComponent = ((...args: any[]) => React.ReactNode) & {
  displayName?: string;
};

export type ComponentType = ComponentClass | FunctionComponent;

export const isClassComponent = (com: ComponentType): com is ComponentClass => {
  return !!com.prototype.render;
};

export const ReactDOMUtil: any = (() => {
  if (!inBrowser) return {};
  if (!hasRequire()) return window.ReactDOM || {};
  const reactDom = require("react-dom") || {};
  return reactDom || reactDom.default;
})();
