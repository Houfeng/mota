import { Provider, useDispatch, useSelector } from 'react-redux'
import React, { Fragment, StrictMode, useCallback, useEffect } from 'react'
import { configureStore, createSlice } from '@reduxjs/toolkit'

import { createRoot } from 'react-dom/client'
import { list } from './data';

let renderCount = 0;

const markRender = () => {
  renderCount++;
  if (renderCount >= list.length) {
    console.timeEnd('time');
  }
}

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      console.time('time');
      renderCount = 0;
      state.value += 1
    }
  },
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  },
});


const itemStyle = {
  padding: 4, margin: 2, background: '#eee', display: 'inline-block',
}

const Item = () => {
  const count = useSelector((state: any) => {
    return state.counter?.value;
  })
  useEffect(() => markRender(), [count]);
  return (
    <span x-data={count} style={itemStyle}>{count}</span>
  )
};

const App = () => {
  const dispatch = useDispatch();
  const increment = useCallback(() => {
    dispatch(counterSlice.actions.increment());
  }, [dispatch]);
  return (
    <Fragment>
      <button onClick={increment}>Increment</button>
      <div>
        {list.map((_, index) => <Item key={index} />)}
      </div>
    </Fragment>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);