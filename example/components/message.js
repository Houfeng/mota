import React, { Component } from 'react';

class Message extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    console.log('message render');
    return <div className="app">
      {this.props.opts.name}
    </div>;
  }
}

export default Message;
