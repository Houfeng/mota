require('./index.less');
const mokit = require('mokit');
const Hello = require('../../components/hello');
const info = require('../../services/info');

module.exports = new mokit.Component({
  components: {
    Hello
  },
  template: require('./index.html'),
  data() {
    return info;
  }
});