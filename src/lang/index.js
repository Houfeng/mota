const app = require('electron').app;
const yaml = require('../common/yaml');

exports.getLocale = async function () {
  return app.getLocale();
};

exports.load = async function () {
  let name = this.getLocale();
  
};