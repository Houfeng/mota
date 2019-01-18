import React from 'react';
import { model, watch, autorun } from '../../src';
import { Info } from "../model/info";

@model(Info)
export class B extends React.Component {

  @watch(function calcB(m) {
    console.log('calc B', m.name);
    return m.name;
  })
  execB() {
    console.log('exec B', m.name);
  }


  @autorun
  autorunA() {
    console.log('autorun B', this.model.name);
  }

  componentDidMount() {
    console.log('didmount B')
  }

  render() {
    return <div>B</div>;
  }
}