'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _topicType = require('./topic-type');

var _topicType2 = _interopRequireDefault(_topicType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * We define our Topic List type.
 *
 * This implements the following type system shorthand:
 *   type TopicList {
 *     topics: [TopicType]
 *   }
 */

var topicListType = new _graphql.GraphQLList(GraphQLString);

exports.default = topicListType;
//# sourceMappingURL=topic-list.js.map
