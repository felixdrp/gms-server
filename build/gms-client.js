'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // *** Load react and react-dom ***


// *** Load react-router ***


// *** Load redux ***


// *** Load store reducers ***
// import generalStore from './reducers/reducer-1'


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _history = require('history');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _reducer = require('./reducers/reducer-1');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The initial state from server-generated HTML
// have a look to server code.
var initialState = window.__INITIAL_STATE__;

// https://github.com/rackt/history/blob/master/docs/GettingStarted.md
var history = (0, _history.createHistory)();

// https://github.com/rackt/react-router-redux/blob/master/examples/basic/app.js
var middleware = (0, _reactRouterRedux.syncHistory)(history);
var reducer = (0, _redux.combineReducers)(_extends({}, _reducer2.default, {
  routing: _reactRouterRedux.routeReducer
}));

// // Create Redux store with initial state
// // const store = createStore(counterApp, initialState)

var finalCreateStore = (0, _redux.compose)((0, _redux.applyMiddleware)(middleware)
// DevTools.instrument()
//
)(_redux.createStore);
var store = finalCreateStore(reducer);
middleware.listenForReplays(store);

console.log(store.getState());

(0, _reactDom.render)(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  (0, _routes2.default)(history)
), document.getElementById('root'));
//# sourceMappingURL=gms-client.js.map
