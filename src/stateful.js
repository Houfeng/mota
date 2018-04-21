const React = require('react');

module.exports = function (stateless) {
  if (!stateless._stateful_) {
    class StatelessWrapper extends React.Component {
      constructor(...args) {
        super(...args);
        this.__args = args;
      }
      render() {
        return stateless(...this.__args);
      }
    }
    stateless._stateful_ = StatelessWrapper;
  }
  return stateless._stateful_;
};