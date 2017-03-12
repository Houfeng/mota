const app = require('electron').app;
const BrowserWindow = require('electron').BrowserWindow;
const Menu = require('electron').Menu;
const dialog = require('electron').dialog;
const rendererVal = require('electron-renderer-value');
const path = require('path');
const url = require('url');
const menu = require('./menu');
const Promise = require('bluebird');
const writeFile = Promise.promisify(require('fs').writeFile);
const readFile = Promise.promisify(require('fs').readFile);
const ipcMain = require('electron').ipcMain;
const utils = require('ntils');
const recent = require('./recent');
const convert = require('./convert');
const update = require('./update');
const shell = require('electron').shell;
const globalShortcut = require('electron').globalShortcut;

const FILE_FILTERS = [{
  name: 'Markdown',
  extensions: ['md']
}];

// 保持所有对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
const windows = [];

/**
 * 创建应用主窗口
 * @returns {BrowserWindow} 应用窗口
 */
app.createWindow = function createWindow() {
  // 创建浏览器窗口。
  let window = new BrowserWindow({
    backgroundColor: '#ffffff',
    width: 900,
    height: 556,
    minWidth: 700,
    minHeight: 432,
    titleBarStyle: 'hidden-inset',
    frame: false,
    show: false
  });
  //存放全局
  windows.push(window);
  //对话框偏移量
  window.setSheetOffset(38);
  //不可全屏
  window.setFullScreenable(false);
  // 加载应用的 index.html。
  window.loadURL(url.format({
    pathname: path.resolve(__dirname, '../build/index.html'),
    protocol: 'file:',
    slashes: true
  }));
  window.filename = '';
  window.on('close', function (event) {
    let result = app.leaveConfirm(window);
    if (result == 0) {
      event.preventDefault();
      app.save(window).then(function () {
        window.destroy();
      });
    }
    if (result == 1) {
      event.preventDefault();
    }
  });
  //当 window 被关闭，这个事件会被触发。
  window.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    let index = windows.findIndex(item => item == window);
    windows.splice(index, 1);
  });
  //确定新窗口的位置
  let activeWindow = BrowserWindow.getFocusedWindow();
  if (activeWindow) {
    let position = activeWindow.getPosition();
    window.setPosition(position[0] + 30, position[1] + 30);
  }
  //返回 Promise
  return new Promise(resolve => {
    //优雅的显示窗口
    window.once('ready-to-show', () => {
      window.show();
      resolve(window);
    });
  });
};

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', () => {
  app.createMenu();
  app.createWindow();
  app.bindDevShortcuts();
  setTimeout(app.checkUpdate, 3000);
});

app.createMenu = async function () {
  return Menu.setApplicationMenu(await menu());
};

app.bindDevShortcuts = function () {
  globalShortcut.register('CommandOrControl+Shift+Alt+I', () => {
    let window = this.getActiveWindow();
    if (!window) return;
    window.webContents.toggleDevTools();
  });
  globalShortcut.register('CommandOrControl+Shift+Alt+R', () => {
    let window = this.getActiveWindow();
    if (!window) return;
    window.webContents.reloadIgnoringCache();
  });
};

app.on('will-finish-launching', () => {
  //打开文件事件
  app.on('open-file', (event, filename) => {
    event.preventDefault();
    setTimeout(async() => {
      app.openFileInWindow(filename, await windows[0]);
    }, 600);
  });
});

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // 在这文件，你可以续写应用剩下主进程代码。
  // 也可以拆分成几个文件，然后用 require 导入。
  if (windows.length < 1) app.createWindow();
});

//获取当前活动窗口
app.getActiveWindow = function () {
  return BrowserWindow.getFocusedWindow();
};

//获取编辑器的值
app.getEditorValue = async function (window) {
  window = window || this.getActiveWindow();
  if (!window) return;
  return await rendererVal(window.webContents, 'ctx.mditor.value');
};

//保存当前活动编辑的内容到指定文件
app.saveFile = async function (filename, window) {
  window = window || this.getActiveWindow();
  let content = await app.getEditorValue(window);
  if (utils.isNull(content)) return;
  window.filename = filename;
  window.isChanged = false;
  await writeFile(filename, content);
  recent.add(filename);
};

//保存
app.save = function (window) {
  window = window || this.getActiveWindow();
  if (!window) return;
  if (window.filename) {
    return app.saveFile(window.filename, window);
  } else {
    return app.saveAs(window);
  }
};

//另存为
app.saveAs = async function (window) {
  return new Promise(resolve => {
    window = window || this.getActiveWindow();
    if (!window) return;
    window.focus();
    dialog.showSaveDialog(window, {
      filters: FILE_FILTERS
    }, filename => {
      if (!filename) return;
      app.saveFile(filename, window).then(resolve);
    });
    window.focus();
  });
};

//离开检查
app.leaveConfirm = function (window) {
  window = window || this.getActiveWindow();
  if (!window || !window.isChanged) return 2;
  return dialog.showMessageBox(window, {
    type: 'question',
    buttons: ['保存', '取消', '不保存'],
    defaultId: 0,
    cancelId: 2,
    message: '确认保存',
    detail: `文件 "${window.filename || 'Untitled'}" 还未保存，是否现在保存？`
  });
};

//在收到打开文件请求时
ipcMain.on('content-changed', function (event, info) {
  let window = BrowserWindow.fromId(info.windowId);
  window.isChanged = true;
});

//打开一个文件 
app.openFile = async function (filename, window) {
  let buffer = await readFile(filename);
  let content = buffer.toString();
  window = window || this.getActiveWindow();
  if (!window) return;
  let result = app.leaveConfirm(window);
  if (result == 0) await app.save(window);
  if (result == 1) return;
  window.filename = filename;
  window.isChanged = false;
  window.webContents.send('file', {
    filename,
    content
  });
  recent.add(filename);
};

//尝试打打一个文档，如果当前窗口没有内容，不关联文件，则使用，否则创新窗口
app.openFileInWindow = async function (filename, window) {
  window = window || this.getActiveWindow();
  if (!window || window.filename || await app.getEditorValue(window)) {
    window = await app.createWindow();
  }
  this.openFile(filename, window);
};

//打开
app.open = async function (window) {
  return new Promise(resolve => {
    window = window || this.getActiveWindow();
    //这是不检查 window 是否存在，因为 openFileInWindow 发现没有窗口会创建
    dialog.showOpenDialog(window, {
      filters: FILE_FILTERS
    }, filenames => {
      if (!filenames || filenames.length < 1) return;
      app.openFileInWindow(filenames[0], window).then(resolve);
    });
  });
};

//在收到打开文件请求时，用于拖拽
ipcMain.on('open-file', function (event, info) {
  let window = BrowserWindow.fromId(info.windowId);
  app.openFile(info.filename, window);
});

//导出 HTML
app.toHTML = async function (window) {
  window = window || this.getActiveWindow();
  if (!window) return;
  dialog.showSaveDialog(window, {
    filters: [{
      name: 'HTML',
      extensions: ['htm', 'html']
    }]
  }, async filename => {
    if (!filename) return;
    let html = await convert.toHTML({
      title: path.basename(window.filename),
      content: await this.getEditorValue(window),
      border: true
    });
    await writeFile(filename, html);
  });
};

//导出 PDF
app.toPDF = async function (window) {
  window = window || this.getActiveWindow();
  if (!window) return;
  dialog.showSaveDialog(window, {
    filters: [{
      name: 'PDF',
      extensions: ['pdf']
    }]
  }, async filename => {
    if (!filename) return;
    let html = await convert.toPDF({
      title: path.basename(window.filename),
      content: await this.getEditorValue(window)
    });
    await writeFile(filename, html);
  });
};

//导出 png
app.toImage = async function (window) {
  window = window || this.getActiveWindow();
  if (!window) return;
  dialog.showSaveDialog(window, {
    filters: [{
      name: 'PNG',
      extensions: ['png']
    }]
  }, async filename => {
    if (!filename) return;
    let html = await convert.toImage({
      title: path.basename(window.filename),
      content: await this.getEditorValue(window)
    });
    await writeFile(filename, html);
  });
};

//检查更新
app.checkUpdate = async function (force) {
  let info = await update.check(force);
  if (!info) return;
  let window = await app.getActiveWindow();
  let result = dialog.showMessageBox(window, {
    type: 'question',
    buttons: ['前往下载', '暂不'],
    defaultId: 0,
    cancelId: 1,
    message: `发现新版本 ${info.version}`,
    detail: info.detail || '建议现在就去下载新版本'
  });
  if (result == 1) return;
  shell.openExternal(info.url);
};