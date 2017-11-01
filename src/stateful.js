const { Component } = require('react');

module.exports = function (stateless) {
  if (!stateless._stateful_) {
    class Stateful extends Component {
      render() {
        return stateless(this.props);
      }
    }
    stateless._stateful_ = Stateful;
  }
  return stateless._stateful_;
};