import React, { StrictMode } from 'react';
import { observable, observer } from "../src";

import ReactDOM from 'react-dom';
import { list } from './data';
import { useEffect } from 'react';

let renderCount = 0;

const markRender = () => {
  renderCount++;
  if (renderCount >= list.length) {
    console.timeEnd('time');
  }
}

const model = observable({
  __displayName: 'model',
  count: 0,
});

console.time('time');
const test = () => {
  console.time('time');
  renderCount = 0;
  model.count++;
}

const itemStyle = {
  padding: 4, margin: 2, background: '#eee', display: 'inline-block',
}

const Item = observer(function Item() {
  useEffect(() => markRender(), [model.count]);
  return (
    <span style={itemStyle}>{model.count}</span>
  )
});

const App = () => {
  return (
    <StrictMode>
      <button onClick={test}>test</button>
      <div>
        {list.map((_, index) => <Item key={index} />)}
      </div>
    </StrictMode>
  )
}

//@ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />);
