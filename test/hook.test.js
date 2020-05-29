import assert from 'assert';
import React from 'react';
import ReactDOM from 'react-dom';
import { useModel, observable } from '../src';

const root = document.querySelector('.root');

describe('useModel', () => {

  it('依赖的模型变量改变重新渲染', (done) => {
    const demo = observable({ a: 1, b: 2 });
    function App() {
      const model = useModel(demo);
      return <div id="msg">{model.a}</div>
    }
    ReactDOM.render(<App />, root);
    setTimeout(() => {
      assert.equal(root.querySelector("#msg").innerHTML, '1');
      demo.a = 2;
      setTimeout(() => {
        assert.equal(root.querySelector("#msg").innerHTML, '2');
        done();
      });
    });
  });

  it('未依赖的模型变量改变不重新渲染', (done) => {
    const demo = observable({ a: 1, b: 2 });
    let time = 0;
    function App() {
      time++;
      const model = useModel(demo);
      return <div id="msg">{model.a}</div>
    }
    ReactDOM.render(<App />, root);
    setTimeout(() => {
      assert.equal(time, 1);
      assert.equal(root.querySelector("#msg").innerHTML, '1');
      demo.b = 3;
      setTimeout(() => {
        assert.equal(time, 1);
        assert.equal(root.querySelector("#msg").innerHTML, '1');
        done();
      });
    });
  });

});
