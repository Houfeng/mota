const pkg = require('../../package');
const store = require('../common/store');
const fetch = require('node-fetch');

const STORE_KEY = 'update';
const ONE_DAY_MS = 86400000;

exports.check = async function (force) {
  if (!force) {
    let prevTime = await store.getItem(STORE_KEY);
    if (Date.now() - prevTime < ONE_DAY_MS) return;
  }
  let response = await fetch(pkg.update.url);
  let info = await response.json();
  console.log('update', info);
  store.setItem(STORE_KEY, Date.now());
  if (info.version == pkg.version) return;
  return info;
};