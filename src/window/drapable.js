const EventEmitter = require('mokit').EventEmitter;

module.exports = function (element) {
  let eventer = new EventEmitter(element);
  eventer.on('dragover', function (event) {
    event.preventDefault();
  });
  eventer.on('drop', function (event) {
    event.preventDefault();
    let files = [].slice.call(event.dataTransfer.files);
    if (!files || files.length < 1) return;
    ctx.openFile(files[0].path);
  });
};