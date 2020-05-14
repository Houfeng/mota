import assert from 'assert';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { model } from '../../src/connect/model';
import { binding } from '../../src/binding/binding';
import { bindable } from '../../src/binding/bindable';

import ReactTestUtils from 'react-dom/test-utils';
import { observable } from '../../src/observe/observable';

const root = document.querySelector('.root');

@observable
class Demo {
  name = 'demo';
  gender = 'male';
  adulthood = true;
  interest = ['football'];
}

const demo = new Demo();

class CheckBox extends Component {

  render() {
    const { checked, id } = this.props;
    return <div id={id}>{checked ? 'checked' : ''}</div>
  }

}

const MyCheckBox = bindable('checkbox', CheckBox);

@model(demo)
@binding
class App extends Component {
  onNameChange = event => {
    this.name = event.target.value;
  }
  render() {
    return <div>
      <div>
        {this.model.name}
      </div>
      <div>
        <input id="name" type="text"
          data-bind="name" onChange={this.onNameChange} />
      </div>
      <div>
        <input id="male" type="radio"
          data-bind="gender" value="male" />
        <input id="female" type="radio"
          data-bind="gender" value="female" />
      </div>
      <div>
        <input id="adulthood" type="checkbox"
          data-bind="adulthood" />
      </div>
      <div>
        <input id="football" type="checkbox"
          data-bind="interest" value="football" />
        <input id="basketball" type="checkbox"
          data-bind="interest" value="basketball" />
      </div>
      <div>
        <MyCheckBox id="custom" data-bind="adulthood" />
      </div>
    </div>;
  }
}

describe('binding', () => {

  it('表单组件双向绑定', (done) => {
    let app;
    ReactDOM.render(<App ref={ref => app = ref} />, root);
    const $ = id => root.querySelector('#' + id);
    const trigger = (id, op) => {
      const node = $(id);
      op(node);
      ReactTestUtils.Simulate.change(node);
    };
    function verify1() {
      assert.equal($('name').value, 'demo');
      assert.equal($('male').checked, true);
      assert.equal($('female').checked, false);
      assert.equal($('adulthood').checked, true);
      assert.equal($('custom').innerHTML, 'checked');
      assert.equal($('football').checked, true);
      assert.equal($('basketball').checked, false);
    }
    function verify2() {
      assert.equal($('name').value, 'test');
      assert.equal($('male').checked, false);
      assert.equal($('female').checked, true);
      assert.equal($('adulthood').checked, false);
      assert.equal($('custom').innerHTML, '');
      assert.equal($('football').checked, true);
      assert.equal($('basketball').checked, true);
    }
    setTimeout(() => {
      verify1();
      demo.name = 'test';
      demo.gender = 'female';
      demo.adulthood = false;
      demo.interest.push('basketball');
      setTimeout(() => {
        verify2();
        trigger('name', node => node.value = 'demo');
        trigger('male', node => node.checked = true);
        trigger('female', node => node.checked = false);
        trigger('football', node => node.checked = false);
        trigger('adulthood', node => node.checked = true);
        setTimeout(() => {
          assert.equal(demo.name, 'demo');
          assert.equal(app.name, 'demo');
          assert.equal(demo.gender, 'male');
          assert.equal(demo.interest.toString(), 'basketball');
          assert.equal(demo.adulthood, true);
          done();
        });
      });
    });
  });

});
