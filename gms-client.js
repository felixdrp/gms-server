'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _reactRouter = require('react-router');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _createHashHistory = require('history/lib/createHashHistory');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import App from './containers/App'

var routes = (0, _routes2.default)((0, _createHashHistory.createHashHistory)());

console.log(routes);
// Grab the state from a global injected into server-generated HTML
var initialState = window.__INITIAL_STATE__;

// let history = createHashHistory();
var store = (0, _redux.createStore)(_reducers2.default);

// Create Redux store with initial state
// const store = createStore(counterApp, initialState)

(0, _reactDom.render)(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  'routes'
), document.getElementById('root'));