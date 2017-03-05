const app = require('electron').app;
const BrowserWindow = require('electron').BrowserWindow;
const Menu = require('electron').Menu;
const path = require('path');
const url = require('url');
const mainMenu = require('./menu');

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
    width: 800,
    height: 494,
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
  // 当 window 被关闭，这个事件会被触发。
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
    window.show()
  });
  //存放全局
  windows.push(window);
}

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

// 在这文件，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入