/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

const connect = require('./connect');
const React = require('react');

module.exports = function model(model) {
  if (model && model.prototype instanceof React.Component) {
    return connect(null, model);
  } else {
    return component => connect(model, component);
  }
};
