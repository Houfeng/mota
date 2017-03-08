require('./index.less');

const mokit = require('mokit');
const Mditor = require('mditor').Client;
const contextMenu = require('./contextmenu');
const drapable = require('./drapable');
const ipcRenderer = nodeRequire('electron').ipcRenderer;

drapable(document.body);

const ctx = window.ctx = mokit({
  element: document.body,
  components: {
    Mditor
  },

  /**
   * 组件就续时
   * @returns {void} 无返回
   */
  onReady() {
    this.currentWindow = remote.getCurrentWindow();
    this.mditor.removeCommand('toggleFullScreen');
    this.overrideHelpBtn();
  },

  /**
   * 在右击时弹出内容菜单
   * @param {object} event 
   */
  onContextMenu(event) {
    if (event.target != this.mditor.editor.$element) return;
    contextMenu.popup(this.currentWindow);
  },

  /**
   * 重写帮助按钮
   * @returns {void} 无返回
   */
  overrideHelpBtn() {
    let btn = this.mditor.toolbar.items.find(item => item.name == 'help');
    btn.handler = function () {
      remote.shell.openExternal('http://mditor.com');
    };
  },

  openFile(filename) {
    ipcRenderer.send('open-file', {
      filename: filename,
      windowId: this.currentWindow.id
    });
  }

}).start();

//在收到内容时
ipcRenderer.on('file', function (event, info) {
  document.title = info.filename;
  ctx.mditor.value = info.content;
});