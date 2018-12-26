import * as React from 'react';
import { model, watch } from '../../src';

export class DemoModel {
  name = 'demo';
  message = '';
}

@model(DemoModel)
export class DemoBase extends React.Component {

  @watch(m => m.name)
  test() {
    this.model.message = this.model.name;
  }

  render() {
    window.demo = this;
    return <div>DemoBase: {this.model.message}</div>
  }
}

@model(DemoModel)
export class Demo1 extends DemoBase {
  @watch(m => m.name)
  test1() {
    this.model.message = this.model.name;
  }
  render() {
    window.demo1 = this;
    return <div>Demo1: {this.model.message}</div>
  }
}

@model(DemoModel)
export class Demo2 extends DemoBase {
  @watch(m => m.name)
  test2() {
    this.model.message = this.model.name;
  }
  render() {
    window.demo2 = this;
    return <div>Demo2: {this.model.message}</div>
  }
}