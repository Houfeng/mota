const connect = require('./connect');
const binding = require('./binding');

module.exports = function model(model, isBinding) {
  if (model instanceof Boolean) {
    isBinding = [model, model = isBinding][0];
  }
  return function (component) {
    if (isBinding) binding(component);
    connect(model, component);
  };
};