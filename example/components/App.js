import * as React from 'react';
import { model, binding, autorun, watch, deep, nextTick } from '../../src';
import { Component } from 'react';
import Info from '../model/info';

import './app.css';

class InfoNew extends Info { }

class AppBase extends Component {

  render() {
    return <div>
      <input data-bind="name" />
    </div>;
  }

}

@model(InfoNew)
class App extends AppBase {

  render() {
    return <div>
      <div>
        {this.model.name}
      </div>
      <input data-bind="name" />
      <AppBase />
    </div>;
  }

}

export default App;
