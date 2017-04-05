const pkg = require('../../package.json');
const app = require('electron').app;
const lang = require('../lang');

module.exports = async() => {
  let locale = await lang.load();
  return {
    label: pkg.displayName,
    submenu: [{
        label: `${locale.about} ${pkg.displayName}`,
        role: 'about'
      },
      {
        label: `${locale.checkUpdate}...`,
        click() {
          app.checkUpdate(true);
        }
      },
      {
        type: 'separator'
      },
      {
        label: `${locale.preference}...`,
        click() {
          app.openPreference();
        }
      },
      {
        label: `${locale.resetPreference}...`,
        click() {
          app.resetPreference();
        }
      },
      {
        type: 'separator'
      },
      {
        label: locale.services,
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: locale.hide,
        role: 'hide'
      },
      {
        label: locale.hideOthers,
        role: 'hideothers'
      },
      {
        label: locale.unHide,
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        label: locale.quit,
        role: 'quit'
      }
    ]
  };
};