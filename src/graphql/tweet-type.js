import {
  graphql,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql'

import LocationType from './location-type'

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

const TweetType = new GraphQLObjectType({
 name: 'Tweet',
 description: 'The Tweet type.',
 fields: {
   id: {
     type: GraphQLString,
     description: 'The Tweet Id.',
   },
   user: {
     type: GraphQLString,
     description: 'The user Id.',
   },
   created_at: {
     type: GraphQLString,
     description: 'When it was created.',
   },
 }
});

export default TweetType
