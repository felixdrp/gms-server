'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fragment = undefined;

var _graphql = require('graphql');

/**
 * We define our Story type.
 *
 * This implements the following type system shorthand:
 *   type Story {
 *     url: String
 *     title: String
 *     story: String
 *   }
 */

var StoryType = new _graphql.GraphQLObjectType({
  name: 'Story',
  description: 'A story from news, etc.',
  fields: {
    url: {
      type: _graphql.GraphQLString,
      description: 'The story url.'
    },
    title: {
      type: _graphql.GraphQLString,
      description: 'The story title'
    },
    story: {
      type: _graphql.GraphQLString,
      description: 'The story text.'
    }
  }
});

exports.default = StoryType;
var fragment = exports.fragment = {
  name: 'StoryFragment',
  definition: 'fragment StoryFragment on Story {url,title,story}'
};
//# sourceMappingURL=story-type.js.map
