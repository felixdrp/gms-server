'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fragment = undefined;

var _graphql = require('graphql');

/**
 * We define our WordFrequency type.
 *
 * This implements the following type system shorthand:
 *   type WordFrequency {
 *     word: String
 *     frequency: Integer
 *   }
 */

var wordFrequencyType = new _graphql.GraphQLObjectType({
  name: 'WordFrequency',
  description: 'The subject or theme of a discourse or of one of its parts.',
  fields: {
    word: {
      type: _graphql.GraphQLString,
      description: 'A word that appears in a document.'
    },
    frequency: {
      type: _graphql.GraphQLInt,
      description: 'The frequency that the word appears in a document.'
    }
  }
});

exports.default = wordFrequencyType;
var fragment = exports.fragment = {
  name: 'WordFrequencyFragment',
  definition: 'fragment WordFrequencyFragment on WordFrequency {word,frequency}'
};
//# sourceMappingURL=word-frequency-type.js.map
