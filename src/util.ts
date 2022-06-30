/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { Component, ReactNode } from "react";

export const inBrowser = () => typeof document !== "undefined";
export const hasRequire = () => typeof require === "function";

export type AnyFunction = (...args: any[]) => any;

export type ComponentClass = {
  new (...args: any[]): Component<any, any>;
  displayName?: string;
};

export type FunctionComponent = ((...args: any[]) => ReactNode) & {
  displayName?: string;
};

export type ComponentType = (ComponentClass | FunctionComponent) & {
  __observer__?: boolean;
};

export function isClassComponent(
  target: ComponentType
): target is ComponentClass {
  return target && !!target.prototype?.render;
}
