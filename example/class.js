import React from 'react';
import ReactDOM from 'react-dom';
import { model, binding, watch, autorun } from "../src";

@model
export class Child extends React.PureComponent {
  render() {
    return <div style={{ width: 100, margin: 20 }}>child</div>;
  }
}

@model({ name: "", age: "" })
@binding
export class App extends React.Component {

  @watch(model => model.name)
  test() {
    console.log("name", this.model.name);
  }

  @autorun
  log() {
    console.log("log", this.model.name);
  }

  render() {
    window.xxx = this;
    return <div>
      <Child model={this.model} />
      <div><input data-bind="name" /></div>
      <div><input data-bind="age" /></div>
      <div>{this.model.name}</div>
      <div>{this.model.age}</div>
    </div>
  }
}

window.app = ReactDOM.render(<App />, document.getElementById('root'));