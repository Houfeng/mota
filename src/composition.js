const AutoRun = require('mokit/src/observer/autorun');

const UPDATE_EVENT = 'compositionupdate';

class Composition {

  updating = false;

  onCompositionUpdate = () => {
    this.updating = true;
  };

  constructor() {
    document.removeEventListener(UPDATE_EVENT, this.onCompositionUpdate, true);
    document.addEventListener(UPDATE_EVENT, this.onCompositionUpdate, true);
  }

}

const composition = new Composition();

AutoRun.prototype.isSync = function () {
  return composition.updating;
};

module.exports = composition;