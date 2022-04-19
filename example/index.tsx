import { observable, observer } from "../src";

import React from 'react';
import ReactDOM from 'react-dom';

const model = observable({
  name: 'test1'
})

const App = observer(() => {
  return <div>{model.name}</div>
});

ReactDOM.render(<App />, document.getElementById('root'));

//@ts-ignore
window.model = model;