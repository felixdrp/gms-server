'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// import App from './containers/App'

// import generalStore from './reducers/reducer-1'

// import counter from './reducers/reducer-1'

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _appComponent = require('./components/app-component');

var _appComponent2 = _interopRequireDefault(_appComponent);

var _reducer = require('./reducers/reducer-1');

var _reducer2 = _interopRequireDefault(_reducer);

var _reactRouter = require('react-router');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _history = require('history');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Grab the state from a global injected into server-generated HTML
var initialState = window.__INITIAL_STATE__;

// Create Redux store with initial state
// const store = createStore(counterApp, initialState)
var history = (0, _history.createHistory)();
console.log(history);
history.push(initialState.location);
var store = (0, _redux.createStore)(_reducer2.default);
var routes = (0, _routes2.default)(_reactRouter.browserHistory);

console.log(routes);
console.log(history);

(0, _reactRouter.match)({ location: initialState.location, routes: routes }, function (error, redirectLocation, renderProps) {
  (0, _reactDom.render)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_reactRouter.RoutingContext, _extends({}, renderProps, { location: location }))
  ), document.getElementById('root'));
});
//# sourceMappingURL=gms-client.js.map
