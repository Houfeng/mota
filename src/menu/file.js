module.exports = {
  label: '文件',
  role: 'file',
  submenu: [{
      label: '新建',
      accelerator: 'CmdOrCtrl+N'
    },
    {
      type: 'separator'
    },
    {
      label: '打开...',
      accelerator: 'CmdOrCtrl+O'
    },
    {
      label: '历史记录',
      submenu: []
    },
    {
      type: 'separator'
    },
    {
      accelerator: 'CmdOrCtrl+S',
      label: '保存...'
    },
    {
      accelerator: 'Shift+CmdOrCtrl+S',
      label: '另存为...'
    },
    {
      type: 'separator'
    },
    {
      label: '导出',
      submenu: [{
        label: 'HTML...'
      }, {
        label: 'PDF...'
      }, {
        label: '图片...'
      }]
    }
  ]
};