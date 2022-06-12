import { $, root } from './helpers/dom';
import { observable, observer } from '../src/';

import React from 'react';
import ReactDOM from 'react-dom';
import assert from 'assert';

@observable
class DemoModel {
  value = '0';
}

describe('model', () => {

  it('Input: 输入处理', (done) => {
    const demo = new DemoModel();
    const DemoView = observer(({ model }: { model: DemoModel }) => {
      return (
        <div>
          <input
            id="value"
            value={model.value}
            onChange={event => model.value = event.target.value}
          />
        </div>
      );
    });
    ReactDOM.render(<DemoView model={demo} />, root);
    setTimeout(() => {
      assert.strictEqual(
        $<HTMLInputElement>("#value").value, '0'
      );
      window.eval(`
        const input = document.querySelector("#value");
        input.value = "1";
        const event = new Event('input',{bubbles:true,cancelable:true});
        input.dispatchEvent(event);
      `);
      setTimeout(() => {
        assert.strictEqual(
          $<HTMLInputElement>("#value").value, '1'
        );
        done();
      }, 100);
    }, 100);
  });

});