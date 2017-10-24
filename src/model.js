const connect = require('./connect');
const binding = require('./binding');

module.exports = function model(model, isBinding) {
  return function (component) {
    if (isBinding) binding(component);
    connect(model, component);
  };
};