/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { AnyFunction, inBrowser } from "./util";

const UPDATE_EVENT = "compositionUpdate";
const END_EVENT = "compositionEnd";
const INPUT_EVENT = "input";

type InputOwner = {
  timer?: any;
  composing?: boolean;
  inputting?: boolean;
  value?: string;
  enable?: () => void;
  disable?: () => void;
};

export const inputOwner = (() => {
  const owner: InputOwner = {};

  owner.timer = 0;
  owner.composing = false;
  owner.inputting = false;
  owner.value = null;

  const onUpdate = () => {
    owner.composing = true;
  };

  const onEnd = () => {
    owner.composing = false;
  };

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    owner.inputting = true;
    owner.value = event.target.value as string;
    if (owner.timer) clearTimeout(owner.timer);
    owner.timer = setTimeout(() => {
      owner.inputting = false;
      owner.timer = null;
    }, 0);
  };

  const on = (name: any, handler: AnyFunction) => {
    if (!inBrowser()) return;
    document.addEventListener(name, handler, true);
  };

  const off = (name: any, handler: AnyFunction) => {
    if (!inBrowser()) return;
    document.removeEventListener(name, handler, true);
  };

  owner.enable = () => {
    on(UPDATE_EVENT, onUpdate);
    on(END_EVENT, onEnd);
    on(INPUT_EVENT, onInput);
  };

  owner.disable = () => {
    off(UPDATE_EVENT, onUpdate);
    off(END_EVENT, onEnd);
  };

  owner.enable();

  return owner;
})();
