const app = require('electron').app;
const yaml = require('../common/yaml');
const fs = require('../common/fs');

exports.getLocale = async function () {
  return 'zh-cn';//app.getLocale();
};

exports.load = async function () {
  let name = (await this.getLocale()).toLowerCase();
  let localeFile;
  let localeFiles = [
    `${__dirname}/${name}.yml`,
    `${__dirname}/${name.split('-')[0]}.yml`,
    `${__dirname}/en-us.yml`
  ];
  for (let i = 0; i < localeFiles.length; i++) {
    if (await fs.exists(localeFiles[i])) {
      localeFile = localeFiles[i];
      break;
    }
  }
  let buffer = await fs.readFile(localeFile);
  return yaml(buffer.toString());
};