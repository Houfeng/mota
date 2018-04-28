import React, { PureComponent } from 'react';

function Message(props) {
  console.log('message render');
  return <div>
    {props.opts.name}
    <hr />
    <div>{props.children}</div>
  </div>;
}

export default Message;
