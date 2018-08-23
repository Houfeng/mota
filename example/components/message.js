import React, { PureComponent } from 'react';

class Message extends PureComponent {

  componentDidUpdate(nextProps) {
    console.log('componentDidUpdate', nextProps, this.props);
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log('getDerivedStateFromProps');
  //   return nextProps;
  // }

  // UNSAFE_componentWillReceiveProps() {
  //   console.log('UNSAFE_componentWillReceiveProps');
  // }

  // componentWillReceiveProps() {
  //   console.log('componentWillReceiveProps');
  // }

  render() {
    window.mm = this;
    console.log('message render');
    return <div>
      {this.props.opts.name} {this.props.theme}
    </div>;
  }
}

export default Message;
