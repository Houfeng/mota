require('./index.less');
const mokit = require('mokit');

module.exports = new mokit.Component({
  template: require('./index.html'),
  data() {
    return {
      transition: new mokit.Transition(34)
    };
  }
});