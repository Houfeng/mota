/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { observable, unsubscribe, subscribe, ObserveKey } from 'ober';
import { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { isFunction } from 'ntils';
import { getModelState } from '../common/utils';

const owner = { buffer: [] };
const onGet = data => owner.buffer.push(ObserveKey(data));

function collect(nextState) {
  if (owner.state) {
    owner.state[2].push(...(owner.buffer));
    owner.buffer.length = 0;
  }
  owner.buffer = [];
  owner.state = nextState;
  return nextState;
}

export function useObservable(factory, conditions) {
  const [deps, setState] = useState([]);
  if (info.length > 0) return collect(info);
  const update = () => setState([...deps]);
  const onSet = useCallback(data => {
    if (!deps[ObserveKey(data)]) return;
    const { inputting, composing } = inputRepair;
    return inputting || composing ? update() : nextTick(update, null, true);
  }, [deps]);
  useEffect(() => {
    subscribe('set', onSet);
    return () => unsubscribe('set', onSet)
  }, []);
  collect(deps);
  const value = factory instanceof Function ? new factory() : factory;
  return observable(getModelState(value));
}

export function useModel(factory, conditions, debug) {
  const [model, deps] = useObservable(factory, conditions);
  //最后一个 useModel 在 mounted 后完成收集（最后一个有可能多收集）
  useLayoutEffect(() => collect());
  if (debug) debug({ model, deps });
  return model;
}
