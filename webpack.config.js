const VModule = require('vmodule-webpack-plugin');

module.exports = function (webpackConf) {
  let babelLoader = Object.assign({}, webpackConf.module.loaders[0]);
  babelLoader.exclude = [];
  babelLoader.test = /mokit[\s\S]+\.js$/;
  webpackConf.module.loaders.push(babelLoader);
  webpackConf.plugins.push(new VModule({
    name: '$config',
    type: 'js',
    content: `export default {}`
  }));
};