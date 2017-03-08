const Menu = remote.Menu;
const MenuItem = remote.MenuItem;

const items = [{
  label: '撤销',
  role: 'undo',
  accelerator: 'CmdOrCtrl+Z'
},
{
  label: '重做',
  role: 'redo',
  accelerator: 'Shift+CmdOrCtrl+Z'
},
{
  type: 'separator'
},
{
  label: '剪切',
  role: 'cut',
  accelerator: 'CmdOrCtrl+X'
},
{
  label: '复制',
  role: 'copy',
  accelerator: 'CmdOrCtrl+C'
},
{
  label: '粘贴',
  role: 'paste',
  accelerator: 'CmdOrCtrl+V'
},
{
  label: '删除',
  role: 'delete'
},
{
  type: 'separator'
},
{
  label: '全选',
  role: 'selectall',
  accelerator: 'CmdOrCtrl+A'
}];

const menu = new Menu();
items.forEach(item => {
  menu.append(new MenuItem(item));
});

module.exports = menu;