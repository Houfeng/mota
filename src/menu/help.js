const shell = require('electron').shell;

module.exports = {
  label: '帮助',
  role: 'help',
  submenu: [{
    label: '更多...',
    click() {
      shell.openExternal('http://mditor.com');
    }
  }]
};