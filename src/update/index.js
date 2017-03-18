const pkg = require('../../package');
const store = require('../common/store');
const fetch = require('node-fetch');

const STORE_KEY = 'update';
const ONE_DAY_MS = 21600000; //6 个小时内只提示一次

exports.check = async function (force) {
  if (!force) {
    let prevTime = await store.getItem(STORE_KEY);
    if (Date.now() - prevTime < ONE_DAY_MS) return;
  }
  let response = await fetch(pkg.update.url);
  let info = await response.json();
  store.setItem(STORE_KEY, Date.now());
  if (info.version == pkg.version) return;
  return info;
};