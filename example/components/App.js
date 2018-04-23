import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import './app.css';
import { model, binding, autorun, watch, deep, nextTick } from '../../src';
import Info from '../model/info';
import List from './List';
import List2 from './List2';
import Table from './table';

// import { Input, DatePicker } from 'antd';

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
    console.log('render');
    return (
      <div className="app">
        <Table>
          {function () {
            return <div>你好</div>
          }}
        </Table>
        {this.model.nextTickTest}<br />
        {this.state.time}<br />
        {String(this.model.name)}<br />
        <input onKeyDown={this.onKeyDown} data-bind="name" data-scope={this.model} /><br />
        <select data-bind="name">
          <option value="1">1</option>
          <option value="2">2</option>
        </select><br />
        [<input type="radio" value="1" data-bind="ok" />]
        [<input type="checkbox" value="1" data-bind="ok" />]
        <br />
        <input type="checkbox" value="1" data-bind="list" />
        <input type="checkbox" value="2" data-bind="list" />
        <input type="radio" value="1" data-bind="name" />
        <input type="radio" value="2" data-bind="name" />
        <hr />
        {this.model.list}
        <hr />
        <List key={'listKey1'} name="from mapping" ref="listRef" opts={this.model.opts} />
        <List2 key={'listKey2'} opts={this.model.opts} />
        <button onClick={() => this.test()}>test</button>
      </div>
    );
  }
}

export default App;
