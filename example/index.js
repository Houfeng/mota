import React from 'react';
import ReactDOM from 'react-dom';
import mota from '../src';
import { useModel } from '../src';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { A } from "./components/A";
import { B } from "./components/B";
import { D } from "./components/D";
import './assets/common.less';

function App() {
  const model = useModel({ name: 'APP' });
  return <Router>
    <div>
      <div>
        {model.name}
        <D />
      </div>
      <div>
        <Link to="/a">AAA</Link>
        <Link to="/b">BBB</Link>
      </div>
      <div>
        <Route path="/a" component={A} strict />
        <Route path="/b" component={B} strict />
      </div>
    </div>
  </Router>
}

window.app = ReactDOM.render(<App />, document.getElementById('root'));
window.mota = mota;