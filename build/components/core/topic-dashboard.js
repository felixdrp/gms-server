'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _topHeaderMenuContainer = require('./top-header-menu-container');

var _topHeaderMenuContainer2 = _interopRequireDefault(_topHeaderMenuContainer);

var _searchCompact = require('./search-compact');

var _searchCompact2 = _interopRequireDefault(_searchCompact);

var _pageCommonBottom = require('./page-common-bottom');

var _pageCommonBottom2 = _interopRequireDefault(_pageCommonBottom);

var _topicType = require('../../graphql/topic-type');

var _storyType = require('../../graphql/story-type');

var _commentType = require('../../graphql/comment-type');

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
var TopicDashboard = _react2.default.createClass({
  displayName: 'TopicDashboard',

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
        query: '\n          {\n            topicList(offset:"' + offset + '") {\n              offset,\n              timestamp,\n              topics {\n                ...' + _topicType.fragment.name + ',\n                urlList {\n                  ...' + _storyType.fragment.name + ',\n                }\n                comments\n              }\n            }\n          }\n          ' + _topicType.fragment.definition + '\n          ' + _storyType.fragment.definition + '\n         '
      };
    }
  },

  fetchData: function fetchData() {
    var _this = this;

    return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var actionsAndQuery, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // Call component own method static: fetchData
              // To retrieve the query to fetch the data needed by the component
              actionsAndQuery = _this.constructor.fetchData({
                // The location information with the url query.
                // Ex. if url "/path?query=raspberry" then location.query = raspberry
                location: _this.props.location,

                // Ex. params:
                // if route "/path/:id" and url "/path/3" then params.id = 3
                params: _this.props.params
              });
              _context.next = 3;
              return fetcher.getData(actionsAndQuery.query);

            case 3:
              data = _context.sent;


              actionsAndQuery.actions.forEach(function (action) {
                _this.props.dispatch((0, _extends3.default)({
                  type: action.action
                }, data.data[action.varName]));
              });
              console.log('async fetchData() ' + (0, _stringify2.default)(actionsAndQuery.actions) + (0, _stringify2.default)(data));

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },
  componentDidMount: function componentDidMount() {
    var query = this.props.location.query,
        offset = 0;

    if ('offset' in query && parseInt(Number(query.offset))) {
      offset = parseInt(Number(query.offset));
    }

    this._topicListBrowserMenu._INIT_POSITION = this._topicListBrowserMenu.offsetTop;
    window.addEventListener('scroll', this.handleOnScroll);

    // The client need to fetch Data?
    if (
    // If not exist this.props.topicListPage
    !this.props.topicListPage || !this.props.topicListPage[offset] || !('timestamp' in this.props.topicListPage[offset]) ||
    // Or the timestamp of the topicListPage is out of date.
    Date.now() - this.props.topicListPage[offset].timestamp > 5000) {
      // Fetch data
      this.fetchData();
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  },
  handleOnScroll: function handleOnScroll(e) {
    console.log(e.target.scrollingElement.scrollTop);
    this.setState({ scroll: e.target.scrollingElement.scrollTop });
  },
  topicItem: function topicItem(topic) {
    var i = 0 | 0;
    return _react2.default.createElement(
      'div',
      { className: 'topic-list-item' },
      _react2.default.createElement(
        'h2',
        { className: 'title' },
        topic.title
      ),
      _react2.default.createElement(
        'div',
        { className: 'stories-list', style: {} },
        _react2.default.createElement(
          'div',
          { className: 'header' },
          'Stories',
          _react2.default.createElement('hr', null)
        ),
        topic.urlList.map(function (story) {
          return _react2.default.createElement(
            'div',
            { key: i++, className: 'story-item' },
            _react2.default.createElement(
              'a',
              { href: story.url, target: '_blank' },
              _react2.default.createElement(
                'h3',
                null,
                story.title || story.url || ''
              )
            ),
            _react2.default.createElement(
              'h4',
              null,
              story.story || ''
            )
          );
        })
      )
    );
  },
  render: function render() {
    var _this2 = this;

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
        _react2.default.createElement(_topHeaderMenuContainer2.default, this.props),
        _react2.default.createElement(
          'div',
          {
            ref: function ref(c) {
              return _this2._topicListBrowserMenu = c;
            },
            style: {
              display: 'flex',
              top: 1,
              position: this.state && 'scroll' in this.state && '_topicListBrowserMenu' in this && '_INIT_POSITION' in this._topicListBrowserMenu && this.state.scroll >= this._topicListBrowserMenu._INIT_POSITION ? 'fixed' : 'relative',
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fafafa',
              // paddingBottom: 7,
              boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.39)',
              color: '#777',
              padding: 3
            }
          },
          _react2.default.createElement(
            'b',
            null,
            ['<', 1, 2, 3, 4, 5, '>'].map(function (i) {
              return _react2.default.createElement(
                'span',
                { key: i, style: { padding: '0 10px', cursor: 'pointer' } },
                i
              );
            })
          )
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
              maxWidth: 600
            }
          },
          _react2.default.createElement(
            'div',
            { style: { flex: 1 } },
            _react2.default.createElement(
              'div',
              { onClick: function onClick() {
                  return _this2.fetchData();
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
exports.default = (0, _reactRedux.connect)(mapStateToProps)(TopicDashboard);
//# sourceMappingURL=topic-dashboard.js.map
