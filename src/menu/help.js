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
    label: '如何生成 UML 图形',
    click() {
      shell.openExternal(`${pkg.homepage}/doc/uml.html`);
    }
  }, {
    label: '如何编写「演示」',
    click() {
      shell.openExternal(`${pkg.homepage}/doc/slide.html`);
    }
  }]
};