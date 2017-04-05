const shell = require('electron').shell;
const pkg = require('../../package');
const lang = require('../lang');

module.exports = async() => {
  let locale = await lang.load();

  return {
    label: locale.help,
    role: 'help',
    submenu: [{
      label: `${pkg.displayName} ${locale.homepage}`,
      click() {
        shell.openExternal(pkg.homepage);
      }
    }, {
      label: locale.umlDoc,
      click() {
        shell.openExternal(`${pkg.homepage}/doc/uml.html`);
      }
    }, {
      label: locale.slideDoc,
      click() {
        shell.openExternal(`${pkg.homepage}/doc/slide.html`);
      }
    }]
  };
};