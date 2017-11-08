const AutoRun = require('mokit/src/observer/autorun');

class Composition {
  constructor() {
    this.updating = false;
    document.addEventListener('compositionupdate', () => {
      this.updating = true;
    }, true);
  }
}

const composition = new Composition();

AutoRun.prototype.isSync = function () {
  return composition.updating;
};

module.exports = composition;