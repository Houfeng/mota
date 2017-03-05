const Menu = require('electron').Menu;

const template = [
  require('./file'),
  require('./edit'),
  require('./view'),
  require('./window'),
  require('./help')
]

if (process.platform === 'darwin') {
  template.unshift(require('./main'));
}

module.exports = Menu.buildFromTemplate(template);