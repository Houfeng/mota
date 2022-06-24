import { $, render } from './helpers/renderer';
import { observable, observer, useAutoRun, useObservable, useWatch } from '../src/';

import React from 'react';
import assert from 'assert';

@observable
class DemoModel {
  name = 'demo';
  value = 0;
}

describe('hooks', () => {

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
    render(<DemoView model={demo} />);
    setTimeout(() => {
      assert.strictEqual($("#value").innerHTML, '0');
      demo.value = 1;
      setTimeout(() => {
        assert.strictEqual($("#value").innerHTML, '1');
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
    render(<DemoView model={demo} />);
    setTimeout(() => {
      assert.strictEqual($("#value").innerHTML, '0');
      demo.value = 1;
      setTimeout(() => {
        assert.strictEqual($("#value").innerHTML, '1');
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
        console.log('      Print:', demo.value);
        runCount++;
      });
      const { value } = props.model;
      return <div id="value">{value}</div>;
    });
    render(<DemoView model={demo} />);
    setTimeout(() => {
      assert.strictEqual($("#value").innerHTML, '0');
      demo.value = 1;
      setTimeout(() => {
        assert.strictEqual($("#value").innerHTML, '1');
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
    render(<DemoView />);
    setTimeout(() => {
      assert.strictEqual($("#value").innerHTML, '0');
      model.value = 1;
      setTimeout(() => {
        assert.strictEqual($("#value").innerHTML, '1');
        done();
      }, 100);
    }, 100);
  });

});     