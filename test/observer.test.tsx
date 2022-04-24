import React, { Component } from 'react';
import { observable, observer } from '../src/';

import ReactDOM from 'react-dom';
import assert from 'assert';

const root = document.querySelector('.root');

@observable
class DemoModel {
  name = 'demo';
  value = 0;
}

function Label(props: { value: string | number }) {
  return <div id="value">{props.value}</div>
}

describe('model', () => {

  it('类组件: 响应模型变化并合并多次更新', (done) => {
    const demo = new DemoModel();
    let renderCount = 0;
    @observer
    class DemoView extends Component<{ model: DemoModel }> {
      render() {
        renderCount++;
        const { value } = this.props.model;
        return <Label value={value} />;
      }
    }
    ReactDOM.render(<DemoView model={demo} />, root);
    setTimeout(() => {
      assert.strictEqual(root.querySelector("#value").innerHTML, '0');
      renderCount = 0;
      demo.value = 1;
      demo.value = 2;
      setTimeout(() => {
        assert.strictEqual(root.querySelector("#value").innerHTML, '2');
        assert.strictEqual(renderCount, 1);
        done();
      });
    })
  });

  it('匿名类组件: 响应模型变化并合并多次更新', (done) => {
    const demo = new DemoModel();
    let renderCount = 0;
    const DemoView = observer(
      class extends Component<{ model: DemoModel }> {
        render() {
          renderCount++;
          const { value } = this.props.model;
          return <Label value={value} />;
        }
      }
    )
    ReactDOM.render(<DemoView model={demo} />, root);
    setTimeout(() => {
      assert.strictEqual(root.querySelector("#value").innerHTML, '0');
      renderCount = 0;
      demo.value = 1;
      demo.value = 2;
      setTimeout(() => {
        assert.strictEqual(root.querySelector("#value").innerHTML, '2');
        assert.strictEqual(renderCount, 1);
        done();
      });
    })
  });

  it('函数组件: 响应模型变化并合并多次更新', (done) => {
    const demo = new DemoModel();
    let renderCount = 0;
    const DemoView = observer(function DemoView(props: { model: DemoModel }) {
      renderCount++;
      const { value } = props.model;
      return <Label value={value} />;
    });
    ReactDOM.render(<DemoView model={demo} />, root);
    setTimeout(() => {
      assert.strictEqual(root.querySelector("#value").innerHTML, '0');
      renderCount = 0;
      demo.value = 1;
      demo.value = 2;
      setTimeout(() => {
        assert.strictEqual(root.querySelector("#value").innerHTML, '2');
        assert.strictEqual(renderCount, 1);
        done();
      });
    })
  });

});