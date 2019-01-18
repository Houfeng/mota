import React from 'react';
import { model, watch, autorun } from '../../src';
import { Info } from "../model/info";

@model(Info)
export class A extends React.Component {

  @watch(function calcA(m) {
    console.log('calc A', m.name);
    return m.name;
  })
  execA() {
    console.log('exec A', this.model.name);
  }

  @autorun
  autorunA() {
    console.log('autorun A', this.model.name);
  }

  componentDidMount() {
    console.log('didmount A')
  }

  render() {
    return <div>A
      <input data-bind="name" />
      {this.model.name}
    </div>;
  }
}