import React from 'react';
import ReactDOM from 'react-dom';
import { model, binding } from "../src";

const createItems = () => {
  return new Array(2000).fill('').map((text, index) => {
    return { size: 100, text, index };
  });
};

const items = [];

@model
export class Item extends React.PureComponent {
  render() {
    items.push(this);
    //console.time("render");
    const { index, text, size } = this.props.model;
    const result = <div key={index} style={{
      width: size, height: 20, margin: 5, background: 'red'
    }}>
      {text || index}
    </div>
    //console.timeEnd("render");
    return result;
  }
}

@model(() => {
  return { size: 100, items: createItems() }
})
@binding
export class App extends React.PureComponent {

  input = (event) => {
    this.model.size = Number(event.target.value);
    this.model.items.forEach(item => {
      item.size = this.model.size;
    });
  }

  render() {
    window.model = this.model;
    const { size, items } = this.model;
    return <div>
      {/* <div><input data-bind="name" /></div>
      <div><input data-bind="age" /></div>
      <div>{this.model.name}</div>
      <div>{this.model.age}</div> */}
      <div>
        <input onChange={this.input} value={size} />
      </div>
      <div>
        {items.map(item => {
          return <Item key={item.index} model={item} />
        })}
      </div>
    </div>
  }
}

window.app = ReactDOM.render(<App />, document.getElementById('root'));