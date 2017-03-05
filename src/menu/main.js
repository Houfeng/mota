const app = require('electron').app;

module.exports = {
  label: app.getName(),
  submenu: [{
      label: `关于 ${app.getName()}`,
      role: 'about'
    },
    {
      type: 'separator'
    },
    {
      label: '服务',
      role: 'services',
      submenu: []
    },
    {
      type: 'separator'
    },
    {
      label: '隐藏',
      role: 'hide'
    },
    {
      label: '隐藏其它',
      role: 'hideothers'
    },
    {
      label: '取消隐藏',
      role: 'unhide'
    },
    {
      type: 'separator'
    },
    {
      label: '退出',
      role: 'quit'
    }
  ]
};