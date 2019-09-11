import React from 'react';
import ReactDOM from 'react-dom';
import { model } from '../src';
import { useModel } from '../src';
import { binding } from '../src/binding';
import './assets/common.less';

function App() {
  const model = useModel(model);
  return <div>
    {model.message}
  </div>;
}

@model({ name: 'test' })
@binding
class Test extends React.PureComponent {
  static modeInitialize(model, props) {
    console.log('modeInitialize', model, props);
  }
  render() {
    return <div>
      {this.model.name}
      <input data-bind="name" />
    </div>
  }
}

function App() {
  return <Test />;
}

window.app = ReactDOM.render(<App />, document.getElementById('root'));