import { observable, observer, useAutoRun, useObservable, useWatch } from '../src/';

import React from 'react';
import ReactDOM from 'react-dom';
import assert from 'assert';

const root = document.querySelector('.root');

@observable
class DemoModel {
  name = 'demo';
  value = 0;
}

describe('model', () => {

  it('useWatch: 观察模型变化', (done) => {
    const demo = new DemoModel();
    let runCount = 0;
    const DemoView = observer((props: { model: DemoModel }) => {
      useWatch(() => demo.value, () => {
        runCount++
      });
      const { value } = props.model;
      return <div id="value">{value}</div>;
    });
    ReactDOM.render(<DemoView model={demo} />, root);
    setTimeout(() => {
      assert.strictEqual(root.querySelector("#value").innerHTML, '0');
      demo.value = 1;
      setTimeout(() => {
        assert.strictEqual(root.querySelector("#value").innerHTML, '1');
        assert.strictEqual(runCount, 1);
        done();
      }, 100);
    }, 100);
  });

  it('useWatch: 观察模型变化 & 立即自动执行一次', (done) => {
    const demo = new DemoModel();
    let runCount = 0;
    const DemoView = observer((props: { model: DemoModel }) => {
      useWatch(() => demo.value, () => {
        runCount++
      }, true);
      const { value } = props.model;
      return <div id="value">{value}</div>;
    });
    ReactDOM.render(<DemoView model={demo} />, root);
    setTimeout(() => {
      assert.strictEqual(root.querySelector("#value").innerHTML, '0');
      demo.value = 1;
      setTimeout(() => {
        assert.strictEqual(root.querySelector("#value").innerHTML, '1');
        assert.strictEqual(runCount, 2);
        done();
      }, 100);
    }, 100);
  });

  it('useAutoRun: 模型变化自动执行', (done) => {
    const demo = new DemoModel();
    let runCount = 0;
    const DemoView = observer((props: { model: DemoModel }) => {
      useAutoRun(() => {
        console.log(demo.value);
        runCount++;
      });
      const { value } = props.model;
      return <div id="value">{value}</div>;
    });
    ReactDOM.render(<DemoView model={demo} />, root);
    setTimeout(() => {
      assert.strictEqual(root.querySelector("#value").innerHTML, '0');
      demo.value = 1;
      setTimeout(() => {
        assert.strictEqual(root.querySelector("#value").innerHTML, '1');
        assert.strictEqual(runCount, 2);
        done();
      }, 100);
    }, 100);
  });

  it('useObservable: 在函数组件中声明可观察对象', (done) => {
    let model: { value: number };
    const DemoView = observer(() => {
      model = useObservable({ value: 0 });
      return <div id="value">{model.value}</div>;
    });
    ReactDOM.render(<DemoView />, root);
    setTimeout(() => {
      assert.strictEqual(root.querySelector("#value").innerHTML, '0');
      model.value = 1;
      setTimeout(() => {
        assert.strictEqual(root.querySelector("#value").innerHTML, '1');
        done();
      }, 100);
    }, 100);
  });

});     