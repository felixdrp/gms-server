'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CollectionsDashboardContainer = _react2.default.createClass({
  displayName: 'CollectionsDashboardContainer',

  statics: {
    customMethod: function customMethod(foo) {
      return foo === 'bardoooo';
    }
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'common-view-page-structure-dashboard' },
      _react2.default.createElement(
        'div',
        { className: 'vierport-main-list-component' },
        _react2.default.createElement(
          'h3',
          null,
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/' },
            'Twitter'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          'Second Page ',
          this.props.location.pathname
        )
      )
    );
  }
});

exports.default = CollectionsDashboardContainer;
//# sourceMappingURL=collections-dashboard-container.js.map
