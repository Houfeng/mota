const { Component } = require('react');

module.exports = function (stateless) {
  if (!stateless._stateful_) {
    class StatelessWrapper extends Component {
      render() {
        return stateless(this.props);
      }
    }
    stateless._stateful_ = StatelessWrapper;
  }
  return stateless._stateful_;
};