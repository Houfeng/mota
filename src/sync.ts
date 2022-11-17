/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { AnyFunction } from "./util";

let syncing = false;

export function inSyncHandler() {
  return syncing;
}

export function sync<T extends AnyFunction>(handler: T): ReturnType<T> {
  const originState = syncing;
  syncing = true;
  const result = handler();
  syncing = originState;
  return result;
}
