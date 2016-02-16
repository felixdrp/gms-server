'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchCompact = _react2.default.createClass({
  displayName: 'SearchCompact',

  statics: {
    customMethod: function customMethod(foo) {
      console.log(this.props);
      return foo === 'bar';
    }
  },
  render: function render() {
    var _this = this;

    var props = this.props;
    var searchQueryValue = 'query';

    // props.dispatch(routeActions.push('/collections'));

    return _react2.default.createElement(
      'div',
      { id: 'search-compact' },
      _react2.default.createElement(
        'form',
        { action: 'search' },
        _react2.default.createElement(
          'div',
          { style: {
              position: 'relative',
              height: 40,
              overflowX: 'hidden',
              overflowY: 'hidden',
              verticalAlign: 'top',
              whiteSpace: 'nowrap',
              lineHeight: 0,
              whiteSpace: 'nowrap'
            }
          },
          _react2.default.createElement(
            'div',
            { style: {
                position: 'absolute',
                left: 0,
                right: 0,
                display: 'flex',
                lineHeight: 0,
                whiteSpace: 'nowrap'
              }
            },
            _react2.default.createElement(
              'div',
              { id: 'search-query', style: {} },
              _react2.default.createElement('input', {
                type: 'text',
                name: 'q',
                ref: function ref(_ref) {
                  return _this.searchQueryInput = _ref;
                },
                maxLength: '2048',
                defaultValue: searchQueryValue,
                style: {}
              })
            ),
            _react2.default.createElement(
              'button',
              { value: 'Search', name: 'bt-search', type: 'submit', style: { height: 40, padding: '0 15px' } },
              'Search'
            )
          )
        )
      )
    );
  }
});

exports.default = (0, _reactRedux.connect)()(SearchCompact);
//# sourceMappingURL=search-compact.js.map
