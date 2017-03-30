const app = require('electron').app;
const recent = require('../recent');

module.exports = async() => {

  let recentItems = await recent.getItems();
  recentItems = recentItems.map(filename => {
    return {
      label: filename,
      click() {
        app.openFileInWindow(filename);
      }
    };
  });
  recentItems.push({
    type: 'separator'
  });
  recentItems.push({
    label: '清除最近编辑',
    click() {
      recent.clear();
    }
  });

  return {
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
        submenu: recentItems
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
          label: 'HTML...',
          click() {
            app.toHTML();
          }
        }, {
          label: 'PDF...',
          click() {
            app.toPDF();
          }
        }, {
          label: '图片...',
          click() {
            app.toImage();
          }
        }, {
          label: '演示...',
          click() {
            app.toImage();
          }
        }]
      }, {
        type: 'separator'
      }, {
        label: '退出',
        click() {
          app.quit();
        }
      }
    ]
  };
};