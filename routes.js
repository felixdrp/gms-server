'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _appComponent = require('./components/app-component');

var _appComponent2 = _interopRequireDefault(_appComponent);

var _twoComponent = require('./components/two-component');

var _twoComponent2 = _interopRequireDefault(_twoComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = _react2.default.createElement(
  _reactRouter.Router,
  { history: _reactRouter.browserHistory },
  _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: _appComponent2.default },
    _react2.default.createElement(_reactRouter.Route, { path: 'foo', component: _twoComponent2.default })
  )
);

exports.default = routes;
// module.exports = {
//   routes
// }