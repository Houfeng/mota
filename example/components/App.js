import * as React from 'react';
import { model, binding, autorun, watch, deep, nextTick } from '../../src';
import { Component } from 'react';
import Info from '../model/info';

import './app.css';

class InfoNew extends Info { }

@model(Info)
@binding
class AppBase extends Component {

  render() {
    return <div>
      <input data-bind="name" />
    </div>;
  }

}

@model(InfoNew)
@binding
class App extends AppBase {

  render() {
    return <div>
      <input data-bind="name" />
    </div>;
  }

}

export default App;
