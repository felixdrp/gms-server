"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dark = 'hsl(200, 20%, 20%)';
var light = '#777';
var styles = {};

styles.wrapper = {
  padding: '10px 20px',
  // overflow: 'hidden',
  // background: dark,
  color: light
};

styles.link = {
  padding: 5,
  color: light,
  fontWeight: 200
};

styles.activeLink = _extends({}, styles.link, {
  // background: light,
  color: dark
});

var App = _react2.default.createClass({
  displayName: 'App',
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h4',
        null,
        'GMS'
      ),
      _react2.default.createElement(
        'div',
        { style: { display: 'flex', flexDirection: 'row' } },
        _react2.default.createElement(
          'div',
          { style: {} },
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              { style: styles.link },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/' },
                'Home'
              )
            ),
            _react2.default.createElement(
              'li',
              { style: styles.link },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/foo', activeStyle: styles.activeLink },
                'Foo'
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { style: { margin: 20 } },
          this.props.children,
          this.props.location.pathname
        )
      )
    );
  }
});
// <li style={styles.link}><Link to="/grades" activeStyle={styles.activeLink}>Grades</Link></li>
// <li style={styles.link}><Link to="/messages" activeStyle={styles.activeLink}>Messages</Link></li>
exports.default = App;