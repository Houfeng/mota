import assert from 'assert';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import model from '../../src/model';

const root = document.querySelector('.root');

class Demo {
  name = 'demo';
  value = 0;
}

const demo = new Demo();

function Show(props) {
  return <div id="value">{props.value}</div>
}

@model(demo)
class App extends Component {
  static renderCount = 0;
  render() {
    App.renderCount++;
    const { value } = this.model;
    return <Show value={value} />;
  }
}

const comModels = {};
@model(Demo)
class Com extends Component {
  render() {
    comModels[this.props.name] = this.model;
    const { value } = this.model;
    return <div>{value}</div>;
  }
}

describe('model', () => {

  it('响应模型变化，并合并多次更新减少渲染', (done) => {
    ReactDOM.render(<App />, root);
    assert.equal(root.querySelector("#value").innerHTML, '0');
    App.renderCount = 0;
    demo.value = 1;
    demo.value = 2;
    setTimeout(() => {
      assert.equal(root.querySelector("#value").innerHTML, '2');
      assert.equal(App.renderCount, 1);
      done();
    });
  });

  it('验证依赖收集，无依赖的模型改变，不进行重新渲染', (done) => {
    ReactDOM.render(<App />, root);
    App.renderCount = 0;
    demo.name = 'test';
    setTimeout(() => {
      assert.equal(App.renderCount, 0);
      done();
    });
  });

  it('同一组件的多个实例间可以互不影响', (done) => {
    ReactDOM.render(<div>
      <Com name="demo1" />
      <Com name="demo2" />
    </div>, root);
    comModels.demo1.name = 'demo1';
    setTimeout(() => {
      assert.notEqual(comModels.demo1, comModels.demo2);
      assert.equal(comModels.demo1.name, 'demo1');
      assert.equal(comModels.demo2.name, 'demo');
      done();
    });
  });

});
