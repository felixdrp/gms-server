'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _topHeaderMenuContainer = require('./top-header-menu-container');

var _topHeaderMenuContainer2 = _interopRequireDefault(_topHeaderMenuContainer);

var _searchCompact = require('./search-compact');

var _searchCompact2 = _interopRequireDefault(_searchCompact);

var _topicType = require('../../graphql/topic-type');

var _globalFetch = require('../../data-fetch/global-fetch');

var _globalFetch2 = _interopRequireDefault(_globalFetch);

var _actions = require('../../actions/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Fetch data.


var fetcher = new _globalFetch2.default();

/**
 * Component that renders the '/' (root) view.
 *
 */

// Used to create the query to fetch data.
var Dashboard = _react2.default.createClass({
  displayName: 'Dashboard',

  statics: {
    fetchData: function fetchData(location) {
      var offset = 0;
      if (location && location.query) {
        offset = location.query.offset || 0;
      }

      return {
        action: _actions.ADD_TOPIC_LIST,
        query: '\n          {\n            topicList(offset:"' + offset + '") {\n              offset,\n              timestamp,\n              topics {\n                ...' + _topicType.fragment.name + ',\n                urlList {\n                  url\n                }\n              }\n            }\n          }\n          ' + _topicType.fragment.definition + '\n         '
      };
    }
  },

  fetchData: function fetchData() {

    console.log(fetcher.getData(this.constructor.fetchData(this.props.location).query));
    // return fetcher.getData( this.constructor.fetchData( this.props.location ).query );
  },
  topicItem: function topicItem(topicInfo) {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h1',
        null,
        topicInfo.title
      ),
      topicInfo.urlList.map(function (story) {
        return _react2.default.createElement(
          'div',
          null,
          'story ',
          _react2.default.createElement(
            'a',
            { href: story.url },
            story.url,
            ' '
          )
        );
      })
    );
  },
  render: function render() {
    var _this = this;

    var props = this.props;

    return _react2.default.createElement(
      'div',
      { id: 'topicDashboard' },
      _react2.default.createElement(
        'div',
        { className: 'main-header' },
        _react2.default.createElement(_topHeaderMenuContainer2.default, this.props)
      ),
      _react2.default.createElement(
        'div',
        { className: 'main-viewport' },
        _react2.default.createElement(
          'div',
          { style: {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              maxWidth: 600
            }
          },
          _react2.default.createElement(
            'div',
            { className: '', style: { flex: 1 } },
            _react2.default.createElement(
              'h3',
              null,
              'Topic list'
            ),
            _react2.default.createElement(
              'div',
              { onClick: function onClick() {
                  return _this.fetchData();
                } },
              'hola' || this.topicItem()
            )
          )
        )
      ),
      _react2.default.createElement('div', { className: 'main-footer', style: {} })
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
exports.default = (0, _reactRedux.connect)(mapStateToProps)(Dashboard);
//# sourceMappingURL=topic-dashboard.js.map
