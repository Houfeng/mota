import React from 'react';
import ReactDOM from 'react-dom';
import { model, binding, watch } from "../src";

@model({ name: "", age: "" })
@binding
export class App extends React.Component {

  @watch(model => model.name)
  test() {
    console.log("name", this.model.name);
  }

  render() {
    window.model=this.model;
    return <div>
      <div><input data-bind="name" /></div>
      <div><input data-bind="age" /></div>
      <div>{this.model.name}</div>
      <div>{this.model.age}</div>
    </div>
  }
}

window.app = ReactDOM.render(<App />, document.getElementById('root'));