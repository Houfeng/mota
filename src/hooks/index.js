/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { ObserveKey, ObserveState, nextTick, observable, subscribe, unsubscribe } from 'ober';

import { React } from '../common/peers';
import { getModelState } from '../common/utils';
import { inputRepair } from '../connect/input';

const { useState, useLayoutEffect, useCallback } = React;
let current;

function collect(next, update) {
  ObserveState.get = false;
  if (current) {
    unsubscribe('get', current.onGet);
    subscribe('set', current.onSet);
  }
  if (next) {
    next.onSet = next.onSet || (() => {
      const { inputting, composing } = inputRepair;
      return inputting || composing ? update() : nextTick(update, null, true);
    });
    unsubscribe('set', next.onSet);
    next.onSet.dependencies = new Set();
    next.onGet = next.onGet || (data => {
      next.onSet.dependencies.add(ObserveKey(data));
    });
    subscribe('get', next.onGet);
    ObserveState.get = true;
  }
  current = next;
  return next;
}

export function useModel(factory, debug) {
  const [info, setInfo] = useState({});
  const update = useCallback(() => setInfo({ ...info }), [info]);
  collect(info, update);
  const value = factory instanceof Function ? new factory() : factory;
  const [state] = useState(() => getModelState(value));
  const model = observable(state);
  //最后一个 useModel 在 mounted 后完成收集（最后一个有可能多收集）
  useLayoutEffect(() => collect());
  if (debug) debug(info);
  return model;
}
