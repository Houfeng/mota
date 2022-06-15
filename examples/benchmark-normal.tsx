import React, { StrictMode, createContext, useCallback, useContext, useEffect, useState } from 'react';

import { createRoot } from 'react-dom/client';
import { list } from './data';

let renderCount = 0;

const markRender = () => {
  renderCount++;
  if (renderCount >= list.length) {
    console.timeEnd('time');
  }
}

const itemStyle = {
  padding: 4, margin: 2, background: '#eee', display: 'inline-block',
}

const context = createContext(0);

const Item = () => {
  const count = useContext(context);
  useEffect(() => markRender(), [count]);
  return (
    <span x-data={count} style={itemStyle}>{count}</span>
  )
};

const App = () => {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => {
    console.time('time');
    renderCount = 0;
    setCount(count + 1);
  }, [count, setCount]);
  return (
    <StrictMode>
      <context.Provider value={count}>
        <button onClick={increment}>Increment</button>
        <div>
          {list.map((_, index) => <Item key={index} />)}
        </div>
      </context.Provider>
    </StrictMode>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />);
