import React from 'react';
import ReactDOM from 'react-dom';
import { useModel } from '../src';

export function App() {
  const model = useModel({ name: "AAA" }, (info) => console.log(info));
  return <div onClick={() => {
    model.name = "BBB";
  }} >{model.name}</div>;
}

window.app = ReactDOM.render(<App />, document.getElementById('root'));