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

@observer
class DemoView extends Component<{ model: DemoModel }> {
  static renderCount = 0;
  render() {
    DemoView.renderCount++;
    const { value } = this.props.model;
    return <Label value={value} />;
  }
}


describe('model', () => {

  it('响应模型变化，并合并多次更新减少渲染', (done) => {
    const demo = new DemoModel();
    ReactDOM.render(<DemoView model={demo} />, root);
    assert.strictEqual(root.querySelector("#value").innerHTML, '0');
    DemoView.renderCount = 0;
    demo.value = 1;
    demo.value = 2;
    setTimeout(() => {
      assert.strictEqual(root.querySelector("#value").innerHTML, '2');
      assert.strictEqual(DemoView.renderCount, 1);
      done();
    });
  });

});