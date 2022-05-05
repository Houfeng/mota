/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { AnyFunction, inBrowser } from "./util";

let timer: any = 0;
let composing = false;
let inputting = false;
let value: any = null;

const bind = (name: any, handler: AnyFunction) => {
  if (!inBrowser()) return;
  document.addEventListener(name, handler, true);
};

bind("compositionUpdate", () => {
  composing = true;
});
bind("compositionEnd", () => {
  composing = false;
});

bind("input", (event: React.ChangeEvent<HTMLInputElement>) => {
  inputting = true;
  value = event.target.value as string;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    inputting = false;
    timer = null;
  }, 0);
});

export const isSyncRequired = (updateValue: any) =>
  (inputting || composing) && value === updateValue;
