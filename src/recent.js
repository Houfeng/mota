const app = require('electron').app;

exports.add = function (filename) {
  app.addRecentDocument(filename);
};

exports.clear = function () {
  app.clearRecentDocuments();
};