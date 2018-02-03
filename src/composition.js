const { AutoRun } = require('ober');

const UPDATE_EVENT = 'compositionupdate';
const END_EVENT = 'compositionend';
const INPUT_EVENT = 'input';

class Composition {

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
    document.addEventListener(event, handler, true);
  }

  off(event, handler) {
    document.removeEventListener(event, handler, true);
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

const composition = new Composition();

AutoRun.prototype.isSync = function () {
  return composition.composing || composition.inputting;
};

module.exports = composition;