require('./assets/common.less');

const mokit = require('mokit');
const Mditor = require('mditor').Client;

mokit({
  element: document.body,
  components: {
    Mditor
  },
  onReady() {
    this.mditor.removeCommand('toggleFullScreen');
    this.mditor.shortcut.bind('ctrl+s', () => {
      this.showSaveDialog();
    });
  },
  showSaveDialog() {
    remote.dialog.showSaveDialog();
  }
}).start();