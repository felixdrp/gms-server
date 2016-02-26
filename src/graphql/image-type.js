import {
  graphql,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql'

import LocationType from './location-type'

/**
 * We define our Image type.
 *
 * This implements the following type system shorthand:
 *   type Image {
 *     id: String
 *     name: String
 *     url: String
 *     path: String
 *     location: LocationType
 *     caption: String
 *   }
 */

const ImageType = new GraphQLObjectType({
 name: 'Image',
 description: 'The image type.',
 fields: {
   id: {
     type: GraphQLString,
     description: 'The image Id.',
   },
   name: {
     type: GraphQLString,
     description: 'The name Id.',
   },
   url: {
     type: GraphQLString,
     description: 'Added for reference in case our local cache is corrupted.',
   },
   path: {
     type: GraphQLString,
     description: 'Which directory the image.',
   },
   location: {
     type: LocationType,
     description: 'The image location.',
   },
   caption: {
     type: GraphQLString,
     description: 'The image caption.',
   }
 }
});

export default ImageType
