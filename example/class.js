import { ObserveConfig, ObserveMode, autorun, binding, model } from "../src";

import React from 'react';
import ReactDOM from 'react-dom';

const createItems = (num = 200) => {
  return new Array(num).fill('').map((num, index) => {
    return { size: 100, num, index };
  });
};


@model
export class Item extends React.PureComponent {
  render() {
    const { index, num, size } = this.props.model;
    const result = <div key={index} style={{
      width: size, height: 20, margin: 5, background: 'red'
    }}>
      {num || index}
    </div>
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
    window.com = this;
    const { items, size } = this.model;
    return <div>
      <div>
        <input onChange={this.input} value={size || ''} />
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