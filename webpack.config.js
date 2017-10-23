module.exports = function (webpackConf) {
  let babelLoader = Object.assign({}, webpackConf.module.loaders[0]);
  babelLoader.exclude = [];
  babelLoader.test = /mokit[\s\S]+\.js$/;
  webpackConf.module.loaders.push(babelLoader);
};