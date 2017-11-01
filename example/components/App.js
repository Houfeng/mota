import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import './app.css';
import { model, binding, autorun, watch } from '../../src';
import Info from '../model/info';
import List from './List';
import List2 from './List2';

// import { Input, DatePicker } from 'antd';

@model(Info)
@binding
class App extends Component {

  constructor(...args) {
    super(...args);
  }

  @watch(function () {
    return this.model.name;
  })
  test() {
    console.log('test', this.model.name, this.model.date);
  }

  render() {
    return (
      <div className="app">
        <input data-bind="name" /><br />
        {String(this.model.name)}<br />
        <select data-bind="name">
          <option value="1">1</option>
          <option value="2">2</option>
        </select><br />
        <input type="checkbox" value="1" data-bind="list" />
        <input type="checkbox" value="2" data-bind="list" />
        <input type="radio" value="1" data-bind="name" />
        <input type="radio" value="2" data-bind="name" />
        <hr />
        {this.model.list}
        <hr />
        <List key={'listKey1'} ref="listRef" opts={this.model.opts} />
        <List2 key={'listKey2'} opts={this.model.opts} />

      </div>
    );
  }
}

export default App;
