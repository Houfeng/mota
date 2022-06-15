import React, { StrictMode, useEffect } from 'react';

import { createRoot } from 'react-dom/client';
import { list } from './data';
import { observable } from "mobx";
import { observer } from "mobx-react";

let renderCount = 0;

const markRender = () => {
  renderCount++;
  if (renderCount >= list.length) {
    console.timeEnd('time');
  }
}

const model = observable({
  count: 0,
});

const increment = () => {
  console.time('time');
  renderCount = 0;
  model.count++;
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
      <button onClick={increment}>Increment</button>
      <div>
        {list.map((_, index) => <Item key={index} />)}
      </div>
    </StrictMode>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />);
