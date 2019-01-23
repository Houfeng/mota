import React from 'react';
import { model, binding, config } from '../../src';
import { A } from "./A";
import { Info } from "../model/info";

// config({ binding: true });

@model(Info)
@binding
export class B extends React.Component {

  render() {
    window.xxx = this.model;
    return <div>B
      <div>{this.model.name}
        <input data-bind="name" />
      </div>
      <A attr={this.model.attr} elements={
        binding((id) => {
          return <div>
            {id}: <input data-bind="name" />
          </div>
        })
      } />
    </div>;
  }

}