import React, { Component } from 'react';

class Table extends Component {
  render() {
    const { children } = this.props;
    return <div>
      {children()}
    </div>
  }
}

export default Table;
