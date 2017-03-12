const app = require('electron').app;
const Promise = require('bluebird');
const writeFile = Promise.promisify(require('fs').writeFile);
const readFile = Promise.promisify(require('fs').readFile);
const deleteFile = Promise.promisify(require('fs').unlink);

const DATA_PATH = app.getPath('userData');

exports.setItem = async function (key, value) {
  let storeFile = `${DATA_PATH}/${key}.json`;
  try {
    await writeFile(storeFile, JSON.stringify(value));
  } catch (err) {
    console.error('setItem', err);
  }
};

exports.getItem = async function (key) {
  let storeFile = `${DATA_PATH}/${key}.json`;
  try {
    let buffer = await readFile(storeFile);
    return JSON.parse(buffer.toString());
  } catch (err) {
    console.error('getItem', err);
  }
};

exports.removeItem = async function (key) {
  let storeFile = `${DATA_PATH}/${key}.json`;
  try {
    await deleteFile(storeFile);
  } catch (err) {
    console.error('removeItem', err);
  }
};