import { ObserveConfig, observable, observer } from "../src";
import React, { StrictMode, useEffect } from 'react';

import ReactDOM from 'react-dom';
import { list } from './data';

ObserveConfig.maxDependencies = Number.MAX_SAFE_INTEGER;
ObserveConfig.maxHandlers = Number.MAX_SAFE_INTEGER;

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

const test = () => {
  console.time('time');
  renderCount = 0;
  model.count++;
}

const itemStyle = {
  padding: 4, margin: 2, background: '#eee', display: 'inline-block',
}

const Item = observer(function Item() {
  const { count } = model;
  useEffect(() => markRender(), [count]);
  return (
    <span x-data={count} style={itemStyle}>{count}</span>
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
