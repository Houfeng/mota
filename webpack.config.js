const VModule = require('vmodule-webpack-plugin');
const pkg = require('./package');

module.exports = function (webpackConf) {
  webpackConf.plugins.push(new VModule({
    name: '$info',
    content: { version: pkg.version }
  }));
};