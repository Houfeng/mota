import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { model, binding } from '../src';

const App = binding(model({ name: "test" }, (props) => {
  const [state] = useState("A");
  return <div onClick={() => {
    props.model.name = "BBB";
  }} >{props.model.name},{state}</div>;
}));

window.app = ReactDOM.render(<App />, document.getElementById('root'));