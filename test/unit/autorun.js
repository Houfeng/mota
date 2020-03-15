import assert from 'assert';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { model } from '../../src/model';
import { autorun } from '../../src/autorun';

const root = document.querySelector('.root');

class Demo {
  name = 'demo';
  message = 'hello';
  info = {
    num1: 1,
    num2: 2
  };
}

describe('autorun', () => {

  it('组件挂后执行 autorun & 依赖改变自动执行 autorun', (done) => {
    const demo = new Demo();
    @model(demo)
    class App extends Component {
      @autorun
      onNameChange() {
        this.model.message = `hello ${this.model.name}`;
      }
      render() {
        const { message } = this.model;
        return <div id="msg">{message}</div>;
      }
    }
    ReactDOM.render(<App />, root);
    setTimeout(() => {
      assert.equal(root.querySelector("#msg").innerHTML, 'hello demo');
      demo.name = 'test';
      setTimeout(() => {
        assert.equal(root.querySelector("#msg").innerHTML, 'hello test');
        done();
      });
    });
  });

  it('autorun 的高阶函数兼容用法', (done) => {
    const demo = new Demo();
    @model(demo)
    class App extends Component {
      @autorun()
      onNameChange() {
        this.model.message = `hello ${this.model.name}`;
      }
      render() {
        const { message } = this.model;
        return <div id="msg">{message}</div>;
      }
    }
    ReactDOM.render(<App />, root);
    setTimeout(() => {
      assert.equal(root.querySelector("#msg").innerHTML, 'hello demo');
      demo.name = 'test';
      setTimeout(() => {
        assert.equal(root.querySelector("#msg").innerHTML, 'hello test');
        done();
      });
    });
  });

});
