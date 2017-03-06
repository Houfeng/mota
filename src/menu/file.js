const app = require('electron').app;
const dialog = require('electron').dialog;
const BrowserWindow = require('electron').BrowserWindow;
const rendererVal = require('electron-renderer-value');
const Promise = require('bluebird');
const fs = require('fs');
const readFile = Promise.promisify(require('fs').readFile);

const NOOP = function () { };

async function getValue() {
  let activeWindow = BrowserWindow.getFocusedWindow();
  return await rendererVal(activeWindow.webContents, 'ctx.mditor.value');
}

async function saveAs() {
  let activeWindow = BrowserWindow.getFocusedWindow();
  if (!activeWindow) return;
  let content = await getValue();
  dialog.showSaveDialog(activeWindow, filename => {
    if (!filename) return;
    activeWindow.filename = filename;
    fs.writeFile(filename, content, NOOP);
  });
}

module.exports = {
  label: '文件',
  role: 'file',
  submenu: [{
    label: '新建',
    accelerator: 'CmdOrCtrl+N',
    click() {
      app.createWindow();
    }
  },
  {
    type: 'separator'
  },
  {
    label: '打开...',
    accelerator: 'CmdOrCtrl+O',
    click() {
      let activeWindow = BrowserWindow.getFocusedWindow();
      if (!activeWindow) return;
      dialog.showOpenDialog(activeWindow, async filenames => {
        if (!filenames || filenames.length < 1) return;
        let buffer = await readFile(filenames[0]);
        console.log(buffer.toString());
      });
    }
  },
  {
    label: '历史记录',
    submenu: []
  },
  {
    type: 'separator'
  },
  {
    accelerator: 'CmdOrCtrl+S',
    label: '保存...',
    async click() {
      let activeWindow = BrowserWindow.getFocusedWindow();
      if (!activeWindow) return;
      if (activeWindow.filename) {
        let content = await getValue();
        fs.writeFile(activeWindow.filename, content, NOOP);
      } else {
        saveAs();
      }
    }
  },
  {
    accelerator: 'Shift+CmdOrCtrl+S',
    label: '另存为...',
    click: saveAs
  },
  {
    type: 'separator'
  },
  {
    label: '导出',
    submenu: [{
      label: 'HTML...'
    }, {
      label: 'PDF...'
    }, {
      label: '图片...'
    }]
  }
  ]
};