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
 *   	 offset: String
 *     topics: [TopicType]
 *   }
 */

var topicListType = new _graphql.GraphQLObjectType({
  name: 'TopicList',
  description: 'A list of topics. We can submit the offset.',
  fields: {
    offset: {
      type: _graphql.GraphQLString,
      description: 'An offset to seek topics.'
    },
    timestamp: {
      type: _graphql.GraphQLString,
      description: 'The timestamp of the response.'
    },
    topics: {
      type: new _graphql.GraphQLList(_topicType2.default),
      description: 'The topic tag words. It will be used to create tag clouds'
    }
  }
});

exports.default = topicListType;
//# sourceMappingURL=topic-list.js.map
