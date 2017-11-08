import React from 'react';
import ReactDOM from 'react-dom';
import './assets/common.less';
import App from './components/App';
import mota from '../src';

window.app = ReactDOM.render(<App />, document.getElementById('root'));
window.mota = mota;