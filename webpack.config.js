const VModule = require('vmodule-webpack-plugin');
const pkg = require('./package');

module.exports = function (webpackConf) {
  let babelLoader = Object.assign({}, webpackConf.module.loaders[0]);
  babelLoader.exclude = [];
  babelLoader.test = /mokit[\s\S]+\.js$/;
  webpackConf.module.loaders.push(babelLoader);
  webpackConf.plugins.push(new VModule({
    name: '$info',
    content: { name: pkg.name, version: pkg.version }
  }));
};