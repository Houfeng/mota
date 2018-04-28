import React, { Component } from 'react';
import { model, binding, autorun, watch, deep, nextTick } from '../../src';
import Message from './Message';
import Info from '../model/info';

import './app.css';

@model(Info)
@binding
class App extends Component {

  state = {};

  constructor(...args) {
    super(...args);
    window.app = this;
  }

  @watch(model => model.name, true)
  @deep
  testWatch() {
    console.log('watch test', this.model.name, this.model.date);
  }

  @autorun
  testAutorun() {
    console.log('autorun test', this.model.opts);
  }

  onKeyDown = event => {
    console.log('keyCode', event.keyCode);
  };

  test(event) {
    this.model.nextTickTest = 1;
    this.model.nextTickTest = 2;
    nextTick(() => {
      this.model.nextTickTest = 3;
    });
  };

  render() {
    console.log('app render');
    const { welcome } = this.model;
    return <div className="app">
      {welcome} to
      <Message opts={this.model} />
      <div>
        <input data-bind="welcome" />
      </div>
    </div>;
  }
}

export default App;
