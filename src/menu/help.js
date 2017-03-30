const shell = require('electron').shell;
const pkg = require('../../package');

module.exports = {
  label: '帮助',
  role: 'help',
  submenu: [{
    label: `${pkg.displayName} 主页`,
    click() {
      shell.openExternal(pkg.homepage);
    }
  }, {
    label: 'UML 语法',
    click() {
      shell.openExternal(`${pkg.homepage}/doc/uml.html`);
    }
  }]
};