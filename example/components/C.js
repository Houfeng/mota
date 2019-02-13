import React from 'react';
import { model, binding } from '../../src';

@model
@binding
export class C extends React.Component {

  render() {
    return <div>C
      <div>
        {this.model.name}
      </div>
    </div>;
  }

}