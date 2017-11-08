const AutoRun = require('mokit/src/observer/autorun');

const UPDATE_EVENT = 'compositionupdate';
const END_EVENT = 'compositionend';

class Composition {

  updating = false;

  onUpdate = () => {
    this.updating = true;
  };

  onEnd = () => {
    this.updating = false;
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
  return composition.updating;
};

module.exports = composition;