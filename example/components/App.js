import * as React from 'react';
import { useEffect, useCallback, useImperativeMethods, useLayoutEffect, useMutationEffect } from 'react';
import {
  model, binding, autorun, watch, deep, nextTick, useModel
} from '../../src';
import { Component } from 'react';
import Info from '../model/info';
import { DemoBase, Demo1, Demo2 } from './Demo';

import './app.css';

// class InfoNew extends Info { }

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

// function Demo1() {
//   const model = useModel(viewModel);
//   console.log('demo1')
//   return <div>
//     <button onClick={() => model.add()}>
//       {model.name}
//     </button>
//     <button onClick={() => model.name += '.'}>
//       {model.name}
//     </button>
//   </div>
// }

// function Demo2() {
//   const model = useModel(viewModel);
//   console.log('demo2')
//   return <div>{model.count}{model.count > 3 ? model.name : ''}</div>
// }

// function Demo3() {
//   const model = useModel(viewModel);
//   console.log('demo3')
//   return <div>{model.name}</div>
// }

// function Demo4() {
//   const model = useModel(viewModel);
//   console.log('demo4')
//   return <div>{model.count}</div>
// }

// function Demo5() {
//   return <div>demo5</div>
// }

@model(viewModel)
class App extends React.Component {
  render() {
    return <div>
      {/* <Demo1 />
      <Demo2 />
      <Demo3 />
      <Demo4 />
      <Demo5 /> */}
      <DemoBase />
      <Demo1 />
      <Demo2 />
    </div>
  }
}

// class Demo {
//   name1 = 'demo1';
//   name2 = 'demo2';
//   message1 = 'hello1';
//   message2 = 'hello2';
//   info = {
//     num1: 1,
//     num2: 2
//   };
// }

// const demo = new Demo();

// @model(demo)
// class App extends Component {

//   @watch(model => model.name1)
//   onWatch1() {
//     this.model.message1 = `hello1 ${this.model.name1}`;
//     console.log('++++++++++' + this.model.message1);
//   }

//   @watch(model => model.name2, true)
//   onWatch2() {
//     this.model.message2 = `hello2 ${this.model.name2}`;
//   }

//   render() {
//     window.app = this;
//     const { message1, message2 } = this.model;
//     return <div>
//       <div id="msg1">{message1}</div>
//       <div id="msg2">{message2}</div>
//     </div>;
//   }
// }

export default App;
