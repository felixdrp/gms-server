import {
  graphql,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql'

/**
 * We define our WordFrequency type.
 *
 * This implements the following type system shorthand:
 *   type WordFrequency {
 *     word: String
 *     frequency: Integer
 *   }
 */

const wordFrequencyType = new GraphQLObjectType({
 name: 'WordFrequency',
 description: 'The subject or theme of a discourse or of one of its parts.',
 fields: {
   word: {
     type: GraphQLString,
     description: 'A word that appears in a document.',
   },
   frequency: {
     type: GraphQLInt,
     description: 'The frequency that the word appears in a document.',
   },
 }
});

export default wordFrequencyType

export const fragment = {
  name: 'WordFrequencyFragment',
  definition: 'fragment WordFrequencyFragment on WordFrequency {word,frequency}'
}
