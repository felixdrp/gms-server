'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Component that renders the search bar.
 *
 */

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
    // var { query } = props.location;
    var query = '';
    var searchQueryValue = props.location.query.q;

    // To go to another url using the redux and react-router-redux.
    // props.dispatch(routeActions.push('/collections'));

    return _react2.default.createElement(
      'div',
      { id: 'search-compact' },
      _react2.default.createElement(
        'form',
        { action: 'search' },
        _react2.default.createElement(
          'div',
          { style: (0, _defineProperty3.default)({
              position: 'relative',
              height: 40,
              overflowX: 'hidden',
              overflowY: 'hidden',
              verticalAlign: 'top',
              whiteSpace: 'nowrap',
              lineHeight: 0
            }, 'whiteSpace', 'nowrap')
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
                ref: function ref(_ref2) {
                  return _this.searchQueryInput = _ref2;
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

// Redux react code to map the store with the component props.
// More info about:
// http://redux.js.org/docs/basics/UsageWithReact.html

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.params,
    filter: ownProps.location
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SearchCompact);
//# sourceMappingURL=search-compact.js.map
