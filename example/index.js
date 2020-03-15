import React from 'react';
import ReactDOM from 'react-dom';
import { model } from '../src';
import { useModel } from '../src';
import { binding } from '../src/binding/binding';
import './assets/common.less';

function App() {
  const model = useModel(model);
  return <div>
    {model.message}
  </div>;
}

@model({ items: [], name: "" })
@binding
class Test extends React.PureComponent {
  render() {
    return <div>
      <input data-bind="name" />
      <button onClick={() => {
        this.model.items.push(this.model.name)
        this.model.name = "";
      }}>添加</button>
      {this.model.items.map((item, index) => {
        return <div key={item}>{item}
          <button onClick={() => {
            this.model.items.splice(index, 1);
          }}>删除</button>
        </div>
      })}
    </div>
  }
}

function App() {
  return <Test />;
}

window.app = ReactDOM.render(<App />, document.getElementById('root'));