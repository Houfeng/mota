const lang = require('../lang');

module.exports = async() => {
  let locale = await lang.load();
  const windowMenu = {
    label: locale.window,
    role: 'window',
    submenu: [{
        label: locale.minimize,
        role: 'minimize'
      },
      {
        label: locale.close,
        role: 'close'
      }
    ]
  };

  if (process.platform === 'darwin') {
    windowMenu.submenu = [{
        label: locale.close,
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      },
      {
        label: locale.minimize,
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: locale.zoom,
        role: 'zoom'
      },
      {
        type: 'separator'
      },
      {
        label: locale.front,
        role: 'front'
      }
    ];
  }

  return windowMenu;
};