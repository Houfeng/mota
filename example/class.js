import React from 'react';
import ReactDOM from 'react-dom';
import { model, binding, autorun } from "../src";

const createItems = () => {
  return new Array(2).fill('').map((text, index) => {
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
  return { message: '', text: 'test' }
})
@binding
export class App extends React.PureComponent {

  @autorun
  log = () => {
    this.model.message = this.model.text;
    console.log(this.model.text);
  }

  input = (event) => {
    this.model.text = event.target.value;
    // this.model.items.forEach(item => {
    //   item.size = this.model.size;
    // });
  }

  render() {
    window.model = this.model;
    const { text, message } = this.model;
    return <div>
      <div>
        <input onChange={this.input} value={text} />
      </div>
      <div>{message}</div>
      {/* <div>
        {items.map(item => {
          return <Item key={item.index} model={item} />
        })}
      </div> */}
    </div>
  }
}

window.app = ReactDOM.render(<App />, document.getElementById('root'));