'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

exports.default = topicListPage;

var _actions = require('../actions/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addTopicList(state, action) {
  var data = action.topicList;
  return (0, _extends4.default)({}, state, (0, _defineProperty3.default)({}, data.offset, {
    timestamp: data.timestamp,
    topicList: data.topics
  }));
}

function topicListPage() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _actions.ADD_TOPIC_LIST:
      return addTopicList(state, action);
    default:
      return state;
  }
}
//# sourceMappingURL=topic-list-reducer.js.map
