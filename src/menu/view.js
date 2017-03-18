const app = require('electron').app;

module.exports = async() => {
  return {
    label: '视图',
    submenu: [
      // {
      //   label: '重新载入',
      //   role: 'forcereload'
      // },
      // {
      //   label: '开发人员工具',
      //   role: 'toggledevtools'
      // }
      {
        label: '切换分屏',
        accelerator: 'Shift+Alt+S',
        click() {
          app.execCommand('toggleSplit');
        }
      },
      {
        label: '切换预览',
        accelerator: 'Shift+Alt+V',
        click() {
          app.execCommand('togglePreview');
        }
      }
    ]
  };
};