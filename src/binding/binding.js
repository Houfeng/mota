/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { expression } from 'ober';
import { isObject } from 'ntils';
import { createFitter } from '../fitter/factory';
import { bindable } from './bindable';

export function compileExpr(expr) {
  return {
    get: expression(expr),
    set: expression(`$scope.${expr}=$value`)
  };
}

export const binding = createFitter(function (type, props, model) {
  if (!type || !props || !model) return;
  const dataBind = props['data-bind'];
  if (!dataBind) return;
  const bindOpts = dataBind && bindable.getOptions(type, props);
  if (!bindOpts) return;
  const dataScope = props['data-scope'] || model;
  const bindExpr = compileExpr(dataBind);
  const setValue = value => bindExpr.set(Object.create(dataScope, {
    $value: { value }
  }));
  const getValue = () => bindExpr.get(dataScope);
  const context = { getValue, setValue };
  const bindEvent = bindOpts.event[0];
  const initailChange = props[bindEvent];
  const bindEventHandler = (event, ...args) => {
    const handler = bindOpts.event[1];
    if (handler instanceof Function) {
      handler(context, event, ...args);
    } else if (!handler) {
      const value = isObject(event) && 'target' in event ?
        event.target.value : event;
      setValue(value);
    } else {
      setValue(expression(String(handler))(event));
    }
    if (initailChange) return initailChange(event, ...args);
  };
  const bindProp = bindOpts.prop[0];
  const bindPropHandler = bindOpts.prop[1] || (ctx => ctx.getValue());
  //--
  props[bindProp] = bindPropHandler(context, props);
  props[bindEvent] = bindEventHandler;
  props['data-scope'] = undefined;
  props['data-bind'] = undefined;
});
