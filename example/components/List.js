import React, { Component } from 'react';
import { model, binding, autorun, watch } from '../../src';

class List extends Component {
  render() {
    return <div>{this.props.opts.name}</div>;
  }
}

export default List;
