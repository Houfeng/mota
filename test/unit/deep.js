// import assert from 'assert';
// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { model } from '../../src/connect/model';
// import { autorun } from '../../src/observe/autorun';
// import { watch } from '../../src/observe/watch';
// import { deep } from '../../src/connect/deep';
// import { observable } from '../../src/observe/observable';

// const root = document.querySelector('.root');

// @observable
// class Demo {
//   name = 'demo';
//   message = 'hello';
//   info = {
//     num1: 1,
//     num2: 2
//   };
// }

// describe('deep', () => {

//   it('autorun 开启深度依赖', (done) => {
//     const demo = new Demo();
//     @model(demo)
//     class App extends Component {
//       count = 0;
//       @autorun
//       @deep
//       onNameChange() {
//         this.model.message = this.count++;
//         console.log(this.model.info);
//       }
//       render() {
//         const { message } = this.model;
//         return <div id="msg">{message}</div>;
//       }
//     }
//     ReactDOM.render(<App />, root);
//     setTimeout(() => {
//       assert.equal(root.querySelector("#msg").innerHTML, '0');
//       demo.info.num1 = 10;
//       setTimeout(() => {
//         assert.equal(root.querySelector("#msg").innerHTML, '1');
//         done();
//       });
//     });
//   });

//   it('watch 开启深度依赖', (done) => {
//     const demo = new Demo();
//     @model(demo)
//     class App extends Component {
//       count = 0;
//       @watch(model => model.info, true)
//       @deep
//       onNameChange() {
//         this.model.message = this.count++;
//       }
//       render() {
//         const { message } = this.model;
//         return <div id="msg">{message}</div>;
//       }
//     }
//     ReactDOM.render(<App />, root);
//     setTimeout(() => {
//       assert.equal(root.querySelector("#msg").innerHTML, '0');
//       demo.info.num1 = 10;
//       setTimeout(() => {
//         assert.equal(root.querySelector("#msg").innerHTML, '1');
//         done();
//       });
//     });
//   });

//   it('deep 高阶函数兼容用法', (done) => {
//     const demo = new Demo();
//     @model(demo)
//     class App extends Component {
//       count = 0;
//       @autorun
//       @deep()
//       onNameChange() {
//         this.model.message = this.count++;
//         console.log(this.model.info);
//       }
//       render() {
//         const { message } = this.model;
//         return <div id="msg">{message}</div>;
//       }
//     }
//     ReactDOM.render(<App />, root);
//     setTimeout(() => {
//       assert.equal(root.querySelector("#msg").innerHTML, '0');
//       demo.info.num1 = 10;
//       setTimeout(() => {
//         assert.equal(root.querySelector("#msg").innerHTML, '1');
//         done();
//       });
//     });
//   });

//   it('检查 autorun & deep 的错误用法', () => {
//     try {
//       @model(Demo)
//       class App extends Component {
//         @deep
//         @autorun
//         onNameChange() { }
//         render() {
//           return <div id="msg">demo</div>;
//         }
//       }
//       assert.fail('没有检查到错误用法');
//     } catch (err) {
//       assert.equal(err.message, '`deep` must be enabled before `model/autorun/watch`');
//     }
//   });

//   it('检查 watch & deep 的错误用法', () => {
//     try {
//       @model(Demo)
//       class App extends Component {
//         @deep
//         @watch(model => model.info)
//         onNameChange() { }
//         render() {
//           return <div id="msg">demo</div>;
//         }
//       }
//       assert.fail('没有检查到错误用法');
//     } catch (err) {
//       assert.equal(err.message, '`deep` must be enabled before `model/autorun/watch`');
//     }
//   });

//   it('将 deep 用于组件类', (done) => {
//     let count = 0;
//     const demo = new Demo();
//     @model(demo)
//     @deep
//     class App extends Component {
//       render() {
//         console.log(this.model.info);
//         return <div id="msg">{count++}</div>;
//       }
//     }
//     ReactDOM.render(<App />, root);
//     assert.equal(count, 1);
//     demo.info.num1 = Date.now();
//     setTimeout(() => {
//       assert.equal(count, 2);
//       done();
//     })
//   });

// });
