'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Two = _react2.default.createClass({
  displayName: 'Two',

  statics: {
    customMethod: function customMethod(foo) {
      return foo === 'bardoooo';
    }
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h4',
        null,
        _react2.default.createElement(
          _reactRouter.Link,
          { to: '/' },
          'GMS'
        )
      ),
      'Second Page ',
      this.props.location.pathname
    );
  }
});

exports.default = Two;
//# sourceMappingURL=two-component.js.map
