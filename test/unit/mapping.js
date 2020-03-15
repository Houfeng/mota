import assert from 'assert';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { model } from '../../src/connect/model';
import { mapping } from '../../src/connect/mapping';

const root = document.querySelector('.root');

class TextModel {
  value = 0;
}

@model(TextModel)
@mapping({
  content: 'value'
})
class Text1 extends Component {
  render() {
    const { value } = this.model;
    return <div id="value1">{value}</div>;
  }
}

@model(TextModel)
@mapping(['value'])
class Text2 extends Component {
  render() {
    const { value } = this.model;
    return <div id="value2">{value}</div>;
  }
}


class AppModel {
  value = 1;
}
const appModel = new AppModel();

@model(appModel)
class App extends Component {
  render() {
    const { value } = this.model;
    return <div>
      <Text1 content={value} />
      <Text2 value={value} />
    </div>;
  }
}

describe('mapping', () => {

  it('通过 map 将属性映身到模型的成员', (done) => {
    appModel.value = 1;
    ReactDOM.render(<App />, root);
    setTimeout(() => {
      assert.equal(root.querySelector("#value1").innerHTML, '1');
      appModel.value = 100;
      setTimeout(() => {
        assert.equal(root.querySelector("#value1").innerHTML, '100');
        done();
      });
    });
  });

  it('通过 array 将属性映身到模型的成员', (done) => {
    appModel.value = 1;
    ReactDOM.render(<App />, root);
    setTimeout(() => {
      assert.equal(root.querySelector("#value2").innerHTML, '1');
      appModel.value = 200;
      setTimeout(() => {
        assert.equal(root.querySelector("#value2").innerHTML, '200');
        done();
      });
    });
  });

  it('检查不合法的 mapping 配置', () => {
    try {
      @model({})
      @mapping('demo')
      class Text extends Component {
        render() {
          const { value } = this.model;
          return <div id="value">{value}</div>;
        }
      }
      assert.fail('没有检查到错误的 mapping 用法');
    } catch (err) {
      assert.equal(err.message, 'Mapping needs to specify a object or array');
    }
  });

  it('检查不合法的 mapping 启用位置', () => {
    try {
      @mapping(['value'])
      @model({})
      class Text extends Component {
        render() {
          const { value } = this.model;
          return <div id="value">{value}</div>;
        }
      }
      assert.fail('没有检查到错误的 mapping 用法');
    } catch (err) {
      assert.equal(err.message, '`mapping` must be enabled before `model`');
    }
  });

  it('检查错误的方法式调用', () => {
    try {
      mapping(['value'])();
      assert.fail('没有检查到错误的方法式调用');
    } catch (err) {
      assert.equal(err.message, 'Invaild Component');
    }
  });

  it('属性更新时也能将属性同步到模型', (done) => {
    const demo = {
      value: 'demo'
    };
    let synced = false;
    @model({ value: '' })
    @mapping(['value'])
    class Text extends Component {
      componentWillReceiveProps() {
        synced = true;
      }
      render() {
        return <div id="value">{this.model.value}</div>
      }
    }
    @model(demo)
    class App extends Component {
      render() {
        return <Text value={this.model.value} />;
      }
    }
    ReactDOM.render(<App />, root);
    setTimeout(() => {
      assert.equal(synced, false);
      assert.equal(root.querySelector("#value").innerHTML, 'demo');
      demo.value = "test";
      setTimeout(() => {
        assert.equal(synced, true);
        assert.equal(root.querySelector("#value").innerHTML, 'test');
        done();
      });
    });
  });

});
