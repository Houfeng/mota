const app = require('electron').app;
const lang = require('../lang');

module.exports = async() => {
  let locale = await lang.load();
  return {
    label: locale.edit,
    submenu: [{
        label: locale.undo,
        accelerator: 'CmdOrCtrl+Z',
        click() {
          app.execCommand('undo');
        }
      },
      {
        label: locale.redo,
        accelerator: 'CmdOrCtrl+Shift+Z',
        click() {
          app.execCommand('redo');
        }
      },
      {
        type: 'separator'
      },
      {
        label: locale.cut,
        role: 'cut'
      },
      {
        label: locale.copy,
        role: 'copy'
      },
      {
        label: locale.paste,
        role: 'paste'
      },
      {
        label: locale.delete,
        role: 'delete'
      },
      {
        label: locale.selectAll,
        role: 'selectall'
      },
      {
        type: 'separator'
      },
      {
        label: locale.findAndReplace,
        accelerator: 'CmdOrCtrl+F',
        click() {
          app.execCommand('find');
        }
      }
    ]
  };
};