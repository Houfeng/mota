require('./index.less');

const mokit = require('mokit');
const Mditor = require('mditor').Client;
const contextMenu = require('./contextmenu');
const drapable = require('./drapable');

drapable(document.body);

window.ctx = mokit({
  element: document.body,
  components: {
    Mditor
  },

  /**
   * 在窗口大小改变时
   * @returns {void} 无返回
   */
  onResize() {
    console.log('reszie');
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
  }

}).start();