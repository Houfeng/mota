import React from 'react';
import ReactDOM from 'react-dom';
import { model } from '../src';
import { useModel } from '../src';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { A } from "./components/A";
import { B } from "./components/B";
import { D } from "./components/D";
import './assets/common.less';
import { Info } from './model/info';
import { binding } from '../src/binding';

function App() {
  const model = useModel(model);
  return <div>
    {model.message}
  </div>;
}

@model(Info)
@binding
class Test extends React.PureComponent {
  onClick = () => {
    this.model.name = '1111';
  }
  render() {
    return <div onClick={this.onClick}>
      {this.model.name}
      <input data-bind="name" />
    </div>
  }
}

function App() {
  return <Test />;
}

window.app = ReactDOM.render(<App />, document.getElementById('root'));