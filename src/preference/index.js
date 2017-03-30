const app = require('electron').app;
const Promise = require('bluebird');
const fs = require('fs');
const writeFile = Promise.promisify(require('fs').writeFile);
const readFile = Promise.promisify(require('fs').readFile);
const unlink = Promise.promisify(require('fs').unlink);
const Parser = require('mditor').Parser;
const yaml = require('js-yaml');

const DATA_PATH = app.getPath('userData');
const PREFERENCE_FILE = `${DATA_PATH}/preference.md`;

async function exists(file) {
  return new Promise(resolve => {
    fs.exists(file, resolve);
  });
}

function parseYaml(text) {
  try {
    return yaml.safeLoad(text, 'utf8');
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function createFile() {
  let buffer = await readFile(`${__dirname}/preference.md`)
  return writeFile(PREFERENCE_FILE, buffer);
}

async function getFile() {
  let isExists = await exists(PREFERENCE_FILE);
  if (!isExists) await createFile();
  return PREFERENCE_FILE;
}

async function load() {
  let isExists = await exists(PREFERENCE_FILE);
  if (!isExists) return;
  let buffer = await readFile(PREFERENCE_FILE);
  if (!buffer) return;
  let content = buffer.toString();
  let editorConfigs, shortcutConfigs;
  Parser.highlights['editor'] = {
    parse: function (code) {
      editorConfigs = code;
    }
  };
  Parser.highlights['shortcut'] = {
    parse: function (code) {
      shortcutConfigs = code;
    }
  };
  let parser = new Parser();
  parser.parse(content);
  Parser.highlights['editor'] = null;
  Parser.highlights['shortcut'] = null;
  return {
    editor: parseYaml(editorConfigs),
    shortcut: parseYaml(shortcutConfigs)
  }
}

async function reset() {
  let isExists = await exists(PREFERENCE_FILE);
  if (!isExists) return;
  return unlink(PREFERENCE_FILE);
}

exports.getFile = getFile;
exports.load = load;
exports.reset = reset;