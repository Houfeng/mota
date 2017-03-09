const app = require('electron').app;
const BrowserWindow = require('electron').BrowserWindow;
const Menu = require('electron').Menu;
const dialog = require('electron').dialog;
const rendererVal = require('electron-renderer-value');
const path = require('path');
const url = require('url');
const mainMenu = require('./menu');
const Promise = require('bluebird');
const writeFile = Promise.promisify(require('fs').writeFile);
const readFile = Promise.promisify(require('fs').readFile);
const ipcMain = require('electron').ipcMain;
const utils = require('ntils');

// 保持所有对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
const windows = [];

/**
 * 创建应用主窗口
 * @returns {BrowserWindow} 应用窗口
 */
app.createWindow = function createWindow() {
  return new Promise(resolve => {
    // 创建浏览器窗口。
    let window = new BrowserWindow({
      backgroundColor: '#ffffff',
      width: 900,
      height: 556,
      minWidth: 650,
      minHeight: 402,
      titleBarStyle: 'hidden-inset',
      frame: false,
      show: false
    });
    //对话框偏移量
    window.setSheetOffset(38);
    //不可全屏
    window.setFullScreenable(false);
    // 加载应用的 index.html。
    window.loadURL(url.format({
      pathname: path.resolve(__dirname, '../build/dist/index.html'),
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
    //优雅的显示窗口
    window.once('ready-to-show', () => {
      window.show();
      resolve(window);
    });
    //存放全局
    windows.push(window);
  });
};

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', () => {
  Menu.setApplicationMenu(mainMenu);
  app.createWindow();
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
  if (windows.length < 1) {
    app.createWindow();
  }
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
    dialog.showSaveDialog(window, filename => {
      if (!filename) return;
      app.saveFile(filename, window).then(resolve);
    });
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
    detail: `文件 '${window.filename}' 还是保存，是否现在保存？`
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
  if (window) {
    let result = app.leaveConfirm(window);
    if (result == 0) await app.save(window);
    if (result == 1) return;
  } else {
    window = await app.createWindow();
  }
  window.filename = filename;
  window.isChanged = false;
  window.webContents.send('file', {
    filename,
    content
  });
};

//打开
app.open = async function (window) {
  return new Promise(resolve => {
    window = window || this.getActiveWindow();
    //这是不检查 window 是否存在，因为 openFile 发现没有窗口会创建
    dialog.showOpenDialog(window, async filenames => {
      if (!filenames || filenames.length < 1) return;
      app.openFile(filenames[0], window).then(resolve);
    });
  });
};

//在收到打开文件请求时
ipcMain.on('open-file', function (event, info) {
  let window = BrowserWindow.fromId(info.windowId);
  app.openFile(info.filename, window);
});