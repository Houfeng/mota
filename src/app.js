//require('bootstrap/dist/css/bootstrap.min.css');
require('./assets/common.less');

const mokit = require('mokit');
const Router = require('mokit-router');
const Touch = require('mokit-touch');
const Transition = require('mokit-transition');
const Frame = require('./pages/frame');
const Mditor = require('mditor/src/client');

mokit.use(Router);
mokit.use(Touch);
mokit.use(Transition);

let router = new mokit.Router();

router.map({
  '/': '/home',
  '/home': require('./pages/home'),
  '/about': require('./pages/about')
});

router.start(Mditor, document.body);