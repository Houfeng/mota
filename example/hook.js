import React from 'react';
import ReactDOM from 'react-dom';
import { useModel } from '../src';

export function App() {
  const model = useModel({ a: "AAA", b: 'BBB' }, (info) => console.log(info));
  return <div onClick={() => {
    model.a += "A";
  }} >{model.a}</div>;
}

window.app = ReactDOM.render(<App />, document.getElementById('root'));