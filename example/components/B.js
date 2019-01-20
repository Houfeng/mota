import React from 'react';
import { model } from '../../src';
import { A } from "./A";
import { Info } from "../model/info";

@model(Info)
export class B extends React.Component {

  render() {
    window.xxx = this.model;
    return <div>B
       <input data-bind="name" />
      {this.model.name}
      <A attr={this.model.attr} />
    </div>;
  }
}