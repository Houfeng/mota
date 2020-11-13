const VModule = require('vmodule-webpack-plugin');
const { name, version } = require('./package');

module.exports = function (webpackConf) {
  webpackConf.plugins.push(new VModule({
    name: '$info',
    content: { name, version }
  }));
};