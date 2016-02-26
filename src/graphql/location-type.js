import {
  graphql,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql'

/**
 * We define our Location type.
 *
 * This implements the following type system shorthand:
 *   type Location {
 *     long: String
 *     lat: String
 *     accuracy: String
 *     address: String
 *     city: String
 *     country: String
 *   }
 */

const LocationType = new GraphQLObjectType({
 name: 'Location',
 description: 'The location type.',
 fields: {
   long: {
     type: GraphQLString,
     description: 'Longitude.',
   },
   lat: {
     type: GraphQLString,
     description: 'Latitude.',
   },
   accuracy: {
     type: GraphQLString,
     description: 'Global position accuracy.',
   },
   address: {
     type: GraphQLString,
     description: 'The location address.',
   },
   city: {
     type: GraphQLString,
     description: 'The location city.',
   },
   country: {
     type: GraphQLString,
     description: 'The location country.',
   }
 }
});

export default LocationType
