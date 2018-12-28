/**
 * Copyright (c) 2012-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

const React = require('react');

module.exports = function (stateless) {
  if (!stateless._stateful_) {
    class StatelessWrapper extends React.Component {
      render() {
        return stateless(this.props, this.context);
      }
    }
    stateless._stateful_ = StatelessWrapper;
  }
  return stateless._stateful_;
};