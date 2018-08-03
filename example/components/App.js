import * as React from 'react';
import { model, binding, autorun, watch, deep, nextTick } from '../../src';
import { Component } from 'react';
import Message from './func';
import Info from '../model/info';

import './app.css';

window.React1 = React;

const ThemeContext = React.createContext("light");

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

  @watch(m => m)
  say = () => {
    console.log('say');
  }

  test(event) {
    this.model.nextTickTest = 1;
    this.model.nextTickTest = 2;
    nextTick(() => {
      this.model.nextTickTest = 3;
    });
  };

  toggleTheme = () => {
    this.model.theme = this.model.theme == "light" ? "dark" : "light";
  }

  render() {
    const { welcome } = this.model;
    return <div className="app">
      {welcome} to
      <Message opts={this.model} >
        函数组件的子组件
      </Message>
      <div>
        <input data-bind="welcome" />
      </div>
      <ThemeContext.Provider value={this.model.theme}>
        <button onClick={this.toggleTheme} >ToggleTheme</button>
        <ThemeContext.Consumer>
          {theme => (
            <span >{theme}</span>
          )}
        </ThemeContext.Consumer>
      </ThemeContext.Provider>
    </div>;
  }
}

export default App;
