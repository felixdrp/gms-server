'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _topHeaderMenuContainer = require('./top-header-menu-container');

var _topHeaderMenuContainer2 = _interopRequireDefault(_topHeaderMenuContainer);

var _searchCompact = require('./search-compact');

var _searchCompact2 = _interopRequireDefault(_searchCompact);

var _topicType = require('../../graphql/topic-type');

var _storyType = require('../../graphql/story-type');

var _globalFetch = require('../../data-fetch/global-fetch');

var _globalFetch2 = _interopRequireDefault(_globalFetch);

var _actions = require('../../actions/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Fetch data.


// Used to create the query to fetch data.


var fetcher = new _globalFetch2.default();

/**
 * Component that renders the '/' (root) view.
 *
 */

var Dashboard = _react2.default.createClass({
  displayName: 'Dashboard',

  statics: {
    fetchData: function fetchData(_ref) {
      var location = _ref.location;
      var _ref$params = _ref.params;
      var params = _ref$params === undefined ? '' : _ref$params;

      var offset = 0;
      if (location && location.query) {
        offset = location.query.offset || 0;
      }

      return {
        actions: [{
          action: _actions.ADD_TOPIC_LIST,
          varName: 'topicList'
        }],
        query: '\n          {\n            topicList(offset:"' + offset + '") {\n              offset,\n              timestamp,\n              topics {\n                ...' + _topicType.fragment.name + ',\n                urlList {\n                  ...' + _storyType.fragment.name + ',\n                }\n              }\n            }\n          }\n          ' + _topicType.fragment.definition + '\n          ' + _storyType.fragment.definition + '\n         '
      };
    }
  },

  fetchData: function fetchData() {

    console.log(fetcher.getData(this.constructor.fetchData(this.props.location).query));
    // return fetcher.getData( this.constructor.fetchData( this.props.location ).query );
  },
  topicItem: function topicItem(topic) {

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h2',
        null,
        topic.title
      ),
      _react2.default.createElement(
        'div',
        { style: { marginLeft: 18 } },
        topic.urlList.map(function (story) {
          return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'h3',
              null,
              story.title || story.url
            ),
            _react2.default.createElement(
              'h4',
              null,
              story.story || ''
            ),
            _react2.default.createElement(
              'a',
              { href: story.url },
              story.url,
              ' '
            )
          );
        })
      )
    );
  },
  render: function render() {
    var _this = this;

    var props = this.props,
        offset = props.location.query && 'offset' in props.location.query ? props.location.query.offset : 0,
        topicList = [];

    if (props.topicListPage[offset] && props.topicListPage[offset].topicList.length > 0) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(props.topicListPage[offset].topicList), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var topic = _step.value;

          topicList.push(_react2.default.createElement(
            'div',
            { key: topic.id },
            this.topicItem(topic)
          ));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } else {
      topicList = 'Topic list is empty at the moment... Please try later.';
    }

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
              topicList
            )
          )
        )
      ),
      _react2.default.createElement('div', { className: 'main-footer', style: {} })
    );
  }
});

function mapStateToProps(state, ownProps) {
  // console.log(state, ownProps)
  return {
    // if route contains params
    params: ownProps.params,
    location: ownProps.location,
    // store data.
    topicListPage: state.topicListPage
  };
}
exports.default = (0, _reactRedux.connect)(mapStateToProps)(Dashboard);
//# sourceMappingURL=topic-dashboard.js.map
