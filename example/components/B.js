import React from 'react';
import { model, watch, autorun } from '../../src';
import { A } from "./A";
import { Info } from "../model/info";

@model(Info)
export class B extends A {

  @watch(function calcB(m) {
    console.log('calc B', m.name);
    return m.name;
  })
  execA() {
    console.log('exec B', this.model.name);
  }

  @autorun
  autorunB() {
    console.log('autorun B', this.model.name);
  }

  componentDidMount() {
    console.log('didmount B')
  }

  render() {
    return <div>B</div>;
  }
}