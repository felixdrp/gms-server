'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fragment = undefined;

var _graphql = require('graphql');

/**
 * We define our Comment type.
 *
 * This implements the following type system shorthand:
 *   type Comment {
 *     // String! = not null String
 *     id: String!
 *
 *     userId: String
 *     body: String
 *     timeStamp: Integer
 *     upVote: Integer
 *     downVote: Integer
 *
 * 		// recursive
 *    // https://github.com/graphql/graphql-js/issues/23
 *     replies: [CommentType]
 *   }
 */

var commentType = new _graphql.GraphQLObjectType({
  name: 'Comment',
  description: 'Generic Comment type.',
  fields: function fields() {
    return {
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: 'The id of the Comment.'
      },
      userId: {
        type: _graphql.GraphQLString,
        description: 'The comment user id.'
      },
      body: {
        type: _graphql.GraphQLString,
        description: 'The comment text.'
      },
      timestamp: {
        type: _graphql.GraphQLInt,
        description: 'The comment timestamp.'
      },
      upVote: {
        type: _graphql.GraphQLInt,
        description: 'The Up Vote.'
      },
      downVote: {
        type: _graphql.GraphQLInt,
        description: 'The Down Vote.'
      },
      // https://github.com/graphql/graphql-js/issues/23
      replies: {
        type: _graphql.GraphQLJson,
        description: 'The replies to the comment.'
      }
    };
  }
});

//  resolve: comment => getComment(comment),
exports.default = commentType;
var fragment = exports.fragment = {
  name: 'CommentFragment',
  definition: 'fragment CommentFragment on Comment {id,userId,body,timestamp,upVote,downVote,replies }'
};
//# sourceMappingURL=comment-type.js.map
