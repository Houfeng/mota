/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

const UPDATE_EVENT = 'compositionUpdate';
const END_EVENT = 'compositionEnd';
const INPUT_EVENT = 'input';

export class InputRepair {

  composing = false;
  inputting = false;

  onUpdate = () => {
    this.composing = true;
  };

  onEnd = () => {
    this.composing = false;
  };

  onInput = () => {
    this.inputting = true;
    if (this.inputTimer) clearTimeout(this.inputTimer);
    this.inputTimer = setTimeout(() => {
      this.inputting = false;
      this.inputTimer = null;
    }, 0);
  };

  on(event, handler) {
    if (!global.document) return;
    global.document.addEventListener(event, handler, true);
  }

  off(event, handler) {
    if (!global.document) return;
    global.document.removeEventListener(event, handler, true);
  }

  enable() {
    this.on(UPDATE_EVENT, this.onUpdate);
    this.on(END_EVENT, this.onEnd);
    this.on(INPUT_EVENT, this.onInput);
  }

  disable() {
    this.off(UPDATE_EVENT, this.onUpdate);
    this.off(END_EVENT, this.onEnd);
  }

  constructor() {
    this.enable();
  }

}

export const inputRepair = new InputRepair();
