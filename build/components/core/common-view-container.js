'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _topHeaderMenuContainer = require('./top-header-menu-container');

var _topHeaderMenuContainer2 = _interopRequireDefault(_topHeaderMenuContainer);

var _searchCompact = require('./search-compact');

var _searchCompact2 = _interopRequireDefault(_searchCompact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Component that renders the common view. The top header and the bottom foot.
 *
 */

var CommonViewContainer = _react2.default.createClass({
  displayName: 'CommonViewContainer',

  statics: {
    customMethod: function customMethod(foo) {
      console.log(this.props);
      return foo === 'bar';
    }
  },
  render: function render() {
    var props = this.props;
    var query = _qs2.default.parse(props.location.search);
    var location = (0, _extends3.default)({}, props.location, {
      query: query
    });

    return _react2.default.createElement(
      'div',
      { id: 'common-view-page' },
      _react2.default.createElement(
        'div',
        { className: 'main-header' },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h2',
            { className: 'title' },
            'Glasgow Memories Server'
          )
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'header-menu-container'
          },
          _react2.default.createElement(_topHeaderMenuContainer2.default, this.props)
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'main-viewport' },
        _react2.default.createElement(
          'div',
          {
            style: {
              // display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              maxWidth: 600,
              overflowWrap: 'break-word'
            }
          },
          props.children
        )
      ),
      _react2.default.createElement('div', { className: 'main-footer', style: { height: 40, padding: '0 10px' } })
    );
  }
});

function mapStateToProps(state, ownProps) {
  return {
    // if route contains params
    params: ownProps.params,
    location: ownProps.location
  };
}
exports.default = (0, _reactRedux.connect)(mapStateToProps)(CommonViewContainer);
//# sourceMappingURL=common-view-container.js.map
