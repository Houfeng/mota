import React, { Fragment } from 'react';
import { observable, observer, useWatch } from "../src";

import ReactDOM from 'react-dom';

export const model = observable({
  __displayName: 'model',
  name: 'test',
  num: 0,
  add() {
    this.num += 1;
  }
})

export const Demo1 = observer(function Demo1() {
  useWatch(() => model.num > 100, () => {
    console.log("num:", model.num);
  })
  return (
    <div>
      <h1>Demo1</h1>
      {/* <div>name: {model.name}</div> */}
      <div onClick={() => model.add()}>num: {model.num}</div>
    </div>
  )
});

@observer
export class Demo2 extends React.Component {
  state = { name: 'Demo2' };
  render(): React.ReactNode {
    return (
      <div>
        <h1>Demo3</h1>
        <div>name: {model.name}</div>
        <div onClick={() => model.add()}>num: {model.num}</div>
      </div>
    )
  }
}

export const App = () => {
  return (
    <Fragment>
      <Demo1 />
      <Demo2 />
    </Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

//@ts-ignore
window.model = model; 