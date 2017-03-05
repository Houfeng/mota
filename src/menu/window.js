const windowMenu = {
  label: '窗口',
  role: 'window',
  submenu: [{
      label: '最小化',
      role: 'minimize'
    },
    {
      label: '关闭',
      role: 'close'
    }
  ]
};

if (process.platform === 'darwin') {
  windowMenu.submenu = [{
      label: '关闭',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    },
    {
      label: '最小化',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    },
    {
      label: '缩放',
      role: 'zoom'
    },
    {
      type: 'separator'
    },
    {
      label: '置于最前',
      role: 'front'
    }
  ];
}

module.exports = windowMenu;