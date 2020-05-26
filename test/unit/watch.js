// import assert from 'assert';
// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { model } from '../../src/connect/model';
// import { watch } from '../../src/observe/watch';
// import { observable } from '../../src';

// const root = document.querySelector('.root');

// @observable
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

// const demo = observable(new Demo());

// @model(demo)
// class App extends Component {

//   @watch(model => model.name1)
//   onWatch1() {
//     this.model.message1 = `hello1 ${this.model.name1}`;
//   }

//   @watch(model => model.name2, true)
//   onWatch2() {
//     this.model.message2 = `hello2 ${this.model.name2}`;
//   }

//   render() {
//     const { message1, message2 } = this.model;
//     return <div>
//       <div id="msg1">{message1}</div>
//       <div id="msg2">{message2}</div>
//     </div>;
//   }
// }

// describe('watch', () => {

//   it('观察的变量发生变化后执行', (done) => {
//     ReactDOM.render(<App />, root);
//     setTimeout(() => {
//       assert.equal(root.querySelector("#msg1").innerHTML, 'hello1');
//       demo.name1 = 'test1';
//       setTimeout(() => {
//         assert.equal(root.querySelector("#msg1").innerHTML, 'hello1 test1');
//         done();
//       }, 0);
//     }, 0);
//   });

//   it('Watch 允许自动执行', (done) => {
//     ReactDOM.render(<App />, root);
//     setTimeout(() => {
//       assert.equal(root.querySelector("#msg2").innerHTML, 'hello2 demo2');
//       demo.name2 = 'test2';
//       setTimeout(() => {
//         assert.equal(root.querySelector("#msg2").innerHTML, 'hello2 test2');
//         done();
//       });
//     });
//   });

//   it('检查 watch 错误用法', () => {
//     try {
//       @model({})
//       class Text extends Component {
//         @watch
//         test() { }
//         render() {
//           const { value } = this.model;
//           return <div id="value">{value}</div>;
//         }
//       }
//       assert.fail('没有检查到错误的 watch 用法');
//     } catch (err) {
//       assert.equal(err.message, 'Watch needs to specify a calculation function');
//     }
//   });

// });
