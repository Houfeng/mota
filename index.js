if (process.env.NODE_ENV == 'development') {
  module.exports = require('./dist/mota');
} else {
  module.exports = require('./dist/mota-min');
}