const Menu = require('electron').Menu;

module.exports = async function () {
  const template = [
    await require('./file')(),
    await require('./edit')(),
    await require('./view')(),
    require('./window'),
    require('./help')
  ];
  if (process.platform === 'darwin') {
    template.unshift(require('./main'));
  }
  return Menu.buildFromTemplate(template);
};