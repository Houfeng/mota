require('./index.less');

const mokit = require('mokit');
const Mditor = require('mditor/src/client');
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
    this.overrideToolbar();
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
  overrideToolbar() {
    //帮助按钮
    let helpBtn = this.mditor.toolbar.getItem('help');
    helpBtn.handler = () => {
      remote.shell.openExternal('http://mditor.com');
    };
    //图片按钮
    let imgBtn = this.mditor.toolbar.getItem('image');
    imgBtn.handler = () => {
      remote.dialog.showOpenDialog(this.currentWindow, {
        filters: [{
          name: '图片',
          extensions: ['png', 'jpg', 'jpeg', 'gif']
        }],
        properties: ['openFile', 'multiSelections']
      }, filenames => {
        if (!filenames || filenames.length < 1) return;
        this.mditor.editor.insertBeforeText(filenames.map(filename => `![alt](${filename})`).join('\n'));
      });
    };
  },

  openFile(filename) {
    ipcRenderer.send('open-file', {
      filename: filename,
      windowId: this.currentWindow.id
    });
  },

  onChanged() {
    ipcRenderer.send('content-changed', {
      filename: ctx.filename,
      windowId: this.currentWindow.id
    });
  }

}).start();

//在收到内容时
ipcRenderer.on('file', function (event, info) {
  document.title = info.filename;
  ctx.filename = info.filename;
  ctx.mditor.value = info.content;
});