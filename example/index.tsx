import React, { Fragment, useDeferredValue } from 'react';
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
  return (
    <div>
      <h1>Demo1</h1>
      <div>
        <input
          value={model.name}
          onChange={event => model.name = event.target.value}
        />
      </div>
    </div>
  )
});

export const Demo2 = observer(function Demo2() {
  useWatch(() => model.num > 100, () => {
    console.log("num:", model.num);
  });
  //@ts-ignore
  const name = useDeferredValue(model.name, { timeoutMs: 1000 });
  return (
    <div>
      <h1>Demo2</h1>
      <div>name: {name}</div>
      <div onClick={() => model.add()}>num: {model.num}</div>
    </div>
  )
});

@observer
export class Demo3 extends React.Component {
  state = { name: 'Demo2' };
  render(): React.ReactNode {
    return (
      <div>
        <h1>Demo3</h1>
        {/* <div>name: {model.name}</div> */}
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
      <Demo3 />
    </Fragment>
  )
}

//@ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />);

//@ts-ignore
window.model = model; 