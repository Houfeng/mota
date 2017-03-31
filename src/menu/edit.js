const app = require('electron').app;

module.exports = async() => {
  return {
    label: '编辑',
    submenu: [{
        label: '撤销',
        accelerator: 'CmdOrCtrl+Z',
        click() {
          app.execCommand('undo');
        }
      },
      {
        label: '重做',
        accelerator: 'CmdOrCtrl+Shift+Z',
        click() {
          app.execCommand('redo');
        }
      },
      {
        type: 'separator'
      },
      {
        label: '剪切',
        role: 'cut'
      },
      {
        label: '复制',
        role: 'copy'
      },
      {
        label: '粘贴',
        role: 'paste'
      },
      {
        label: '删除',
        role: 'delete'
      },
      {
        label: '全选',
        role: 'selectall'
      },
      {
        type: 'separator'
      },
      {
        label: '查换替换',
        accelerator: 'CmdOrCtrl+F',
        click() {
          app.execCommand('find');
        }
      }
    ]
  };
};