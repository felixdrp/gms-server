'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Component that renders the top header menu.
 *
 */

var TopHeaderMenuContainer = _react2.default.createClass({
  displayName: 'TopHeaderMenuContainer',

  statics: {
    customMethod: function customMethod(foo) {
      console.log(this);
      return foo === 'bar';
    }
  },
  render: function render() {
    var props = this.props;
    return _react2.default.createElement(
      'div',
      { className: 'top-header-menu-container' },
      _react2.default.createElement(
        'div',
        { className: 'menu' },
        _react2.default.createElement(
          'ul',
          { style: {} },
          _react2.default.createElement(
            'li',
            { className: 'top-header-menu' },
            _react2.default.createElement(
              _reactRouter.Link,
              {
                to: '/topicList',
                activeClassName: 'active-location'
              },
              'Topic list'
            )
          ),
          _react2.default.createElement(
            'li',
            { className: 'top-header-menu' },
            _react2.default.createElement(
              _reactRouter.Link,
              {
                to: '/login',
                activeClassName: 'active-location'
              },
              'Login'
            )
          ),
          _react2.default.createElement(
            'li',
            { className: 'top-header-menu' },
            _react2.default.createElement(
              _reactRouter.Link,
              {
                to: '/signup',
                activeClassName: 'active-location'
              },
              'Signup'
            )
          )
        )
      )
    );
  }
});

exports.default = TopHeaderMenuContainer;
//# sourceMappingURL=top-header-menu-container.js.map
