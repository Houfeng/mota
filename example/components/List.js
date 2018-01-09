import React, { Component } from 'react';
import { model, binding, autorun, watch, mapping } from '../../src';

@model({ name: null })
@mapping(['name'])
class List extends Component {
  render() {
    window.__list = this;
    return <div>
      name: {this.model.name}
      <hr />
      opts name:{this.props.opts.name}
    </div>;
  }
}

export default List;
