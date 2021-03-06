'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fragment = undefined;

var _graphql = require('graphql');

var _wordFrequencyType = require('./word-frequency-type');

var _wordFrequencyType2 = _interopRequireDefault(_wordFrequencyType);

var _storyType = require('./story-type');

var _storyType2 = _interopRequireDefault(_storyType);

var _tweetType = require('./tweet-type');

var _tweetType2 = _interopRequireDefault(_tweetType);

var _commentType = require('./comment-type');

var _commentType2 = _interopRequireDefault(_commentType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * We define our Topic type.
 *
 * This implements the following type system shorthand:
 *   type Topic {
 *     // String! = not null String
 *     id: String!
 *     title: String
 *     tagWords: [WordFrequencyType]
 *     // news List?
 *     urlList: [StoryType]
 *     tweetList: [TweetType]
 *     comments: [CommentType]
 *   }
 */

var topicType = new _graphql.GraphQLObjectType({
  name: 'Topic',
  description: 'The subject or theme of a discourse or of one of its parts.',
  fields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
      description: 'The id of the topic.'
    },
    title: {
      type: _graphql.GraphQLString,
      description: 'The topic title or name.'
    },
    tagWords: {
      type: new _graphql.GraphQLList(_wordFrequencyType2.default),
      description: 'The topic tag words. It will be used to create tag clouds'
    },
    urlList: {
      type: new _graphql.GraphQLList(_storyType2.default),
      description: 'These are individual stories below to that Topic.'
    },
    tweetList: {
      type: new _graphql.GraphQLList(_tweetType2.default),
      description: 'The topic related tweet list.'
    },
    // JSON Object with all the comments. This way it loose the type definition check.
    // https://github.com/graphql/graphql-js/pull/242#issuecomment-192583517
    // Another option is to make hierarchical data in linear one.
    // Ex:
    //
    // a---b
    //  \
    //   \-c
    //
    // a
    // a.b
    // a.c
    // Then we could use the graphql type system.
    // This option force the graphql consumer to recreate the hierarchical data.
    comments: {
      type: new _graphql.GraphQLScalarType({
        name: 'Raw',
        serialize: function serialize(value) {
          //  any kind of data
          return value;
        }
      })
    }
  }
});

function getComments(comment) {}

exports.default = topicType;
var fragment = exports.fragment = {
  name: 'TopicFragment',
  definition: 'fragment TopicFragment on Topic {id,title}'
};
//# sourceMappingURL=topic-type.js.map
