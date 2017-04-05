const app = require('electron').app;
const lang = require('../lang');

module.exports = async() => {
  let locale = await lang.load();
  return {
    label: locale.view,
    submenu: [{
        label: locale.toggleSplit,
        accelerator: 'Shift+Alt+S',
        click() {
          app.execCommand('toggleSplit');
        }
      },
      {
        label: locale.togglePreview,
        accelerator: 'Shift+Alt+V',
        click() {
          app.execCommand('togglePreview');
        }
      }
    ]
  };
};