import assert from 'assert';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import model from '../../src/model';
import mapping from '../../src/mapping';

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

});
