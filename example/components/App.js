import * as React from 'react';
import { useEffect, useCallback, useImperativeMethods, useLayoutEffect, useMutationEffect } from 'react';
import {
  model, binding, autorun, watch, deep, nextTick, useModel
} from '../../src';
import { Component } from 'react';
import Info from '../model/info';

import './app.css';

class InfoNew extends Info { }

// class AppBase extends Component {

//   render() {
//     return <div>
//       <input data-bind="name" />
//     </div>;
//   }

// }

// @model(InfoNew)
// class App extends AppBase {

//   render() {
//     return <div>
//       <div>
//         {this.model.name}
//       </div>
//       <input data-bind="name" />
//       <AppBase />
//     </div>;
//   }

// }

const viewModel = {
  count: 0,
  name: 'test',
  add() {
    this.count++;
  }
}

function Demo1() {
  const model = useModel(viewModel);
  console.log('demo1')
  return <div>
    <button onClick={() => model.add()}>
      {model.name}
    </button>
    <button onClick={() => model.name += '.'}>
      {model.name}
    </button>
  </div>
}

function Demo2() {
  const model = useModel(viewModel);
  console.log('demo2')
  return <div>{model.count}{model.count > 3 ? model.name : ''}</div>
}

function Demo3() {
  const model = useModel(viewModel);
  console.log('demo3')
  return <div>{model.name}</div>
}

function Demo4() {
  const model = useModel(viewModel);
  console.log('demo4')
  return <div>{model.count}</div>
}


function App() {
  console.log('app')
  return <div>
    <Demo1 />
    <Demo2 />
    <Demo3 />
    <Demo4 />
  </div>
}

export default App;
