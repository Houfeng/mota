import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import './app.css';
import { model, binding } from '../../src';
import Info from '../model/info';
import { Input, DatePicker } from 'antd';

@model(Info)
@binding
class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h2 className="app-welcome"> {this.model.say}</h2>
        </div>
        <div className="app-intro">
          <img data-model="1" src={logo} className="app-logo" alt="logo" />
          <div>
            <input data-bind="name" /><br />
            <Input data-bind="name" /><br />
            {String(this.model.date)}
            <DatePicker data-bind="date" /><br />

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
          </div>
        </div>
        <ul className="app-links">
          <li><a href="https://alibaba.github.io/dawn/">Homepage</a></li>
          <li><a href="https://alibaba.github.io/dawn/docs">Documents</a></li>
          <li><a href="https://github.com/alibaba/dawn">Git Repo</a></li>
          <li><a href="https://github.com/alibaba/dawn/issues">Issues</a></li>
        </ul>
      </div>
    );
  }
}

export default App;
