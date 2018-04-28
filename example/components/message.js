import React, { PureComponent } from 'react';

class Message extends PureComponent {
  render() {
    console.log('message render');
    return <div>
      {this.props.opts.name}
    </div>;
  }
}

export default Message;
