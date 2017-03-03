require('./index.less');
const mokit = require('mokit');

module.exports = new mokit.Component({
  template: require('./index.html'),
  props: {
    name: ''
  }
});