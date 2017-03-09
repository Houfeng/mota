const app = require('electron').app;

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
      app.open();
    }
  },
  {
    label: '最近编辑',
    submenu: []
  },
  {
    type: 'separator'
  },
  {
    accelerator: 'CmdOrCtrl+S',
    label: '保存...',
    click() {
      app.save();
    }
  },
  {
    accelerator: 'Shift+CmdOrCtrl+S',
    label: '另存为...',
    click() {
      app.saveAs();
    }
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