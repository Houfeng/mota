import React from 'react';

export class A extends React.Component {

  render() {
    return <div>A
      {this.props.attr.test}
    </div>;
  }
  
}