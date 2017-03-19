const shell = require('electron').shell;
const pkg = require('../../package');

module.exports = {
  label: '帮助',
  role: 'help',
  submenu: [{
    label: '更多...',
    click() {
      shell.openExternal(pkg.homepage);
    }
  }]
};