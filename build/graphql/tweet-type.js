'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _locationType = require('./location-type');

var _locationType2 = _interopRequireDefault(_locationType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * We define our Tweet type.
 *
 * This implements the following type system shorthand:
 *   type Image {
 *     id: String
 *     user: String
 *     created_at: String
 *   }
 */

var TweetType = new _graphql.GraphQLObjectType({
  name: 'Tweet',
  description: 'The Tweet type.',
  fields: {
    id: {
      type: _graphql.GraphQLString,
      description: 'The Tweet Id.'
    },
    user: {
      type: _graphql.GraphQLString,
      description: 'The user Id.'
    },
    created_at: {
      type: _graphql.GraphQLString,
      description: 'When it was created.'
    }
  }
});

exports.default = TweetType;
//# sourceMappingURL=tweet-type.js.map
