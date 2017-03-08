const EventEmitter = require('mokit').EventEmitter;

module.exports = function (element) {
  let eventer = new EventEmitter(element);
  eventer.on('dragleave', function (event) {
    event.preventDefault();
  });
  eventer.on('drop', function (event) {
    event.preventDefault();
    console.log(event);
  });
  eventer.on('dragenter', function (event) {
    event.preventDefault();
  });
  eventer.on('dragover', function (event) {
    event.preventDefault();
  });
};