const { Component } = require('react');

module.exports = function (stateless) {
  const OriginCom = stateless;
  if (!OriginCom._stateful_) {
    class StatelessWrapper extends Component {
      render() {
        try {
          return OriginCom(this.props);
        } catch (err) {
          return <OriginCom {...this.props}>
            {this.props.children}
          </OriginCom>;
        }
      }
    }
    OriginCom._stateful_ = StatelessWrapper;
  }
  return OriginCom._stateful_;
};