import React, { Fragment, useEffect } from 'react';
import { observable, observer } from "../src";

import ReactDOM from 'react-dom';

export const model = observable({
  name: 'test',
  num: 0,
  add() {
    this.num += 1;
  }
})

export const Demo1 = observer(function Demo1() {
  useEffect(() => {
    console.log('mounted');
  }, [])
  return <div>
    <h1>Demo1</h1>
    <div>name: {model.name}</div>
    <div onClick={() => model.add()}>num: {model.num}</div>
  </div>
});

export const Demo2 = observer(function Demo2() {
  return <div>
    <h1>Demo2</h1>
    <div>name: {model.name}</div>
    <div onClick={() => model.add()}>num: {model.num}</div>
  </div>
});

@observer
export class Demo3 extends React.Component {
  render(): React.ReactNode {
    return <div>
      <h1>Demo3</h1>
      <div>name: {model.name}</div>
      <div onClick={() => model.add()}>num: {model.num}</div>
    </div>
  }
}

export const App = () => {
  return <Fragment>
    <Demo1 />
    <Demo2 />
    <Demo3 />
  </Fragment>
}

ReactDOM.render(<App />, document.getElementById('root'));

//@ts-ignore
window.model = model; 