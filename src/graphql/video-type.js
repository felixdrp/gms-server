import {
  graphql,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql'

import LocationType from './location-type'

/**
 * We define our Video type.
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

const VideoType = new GraphQLObjectType({
 name: 'Video',
 description: 'The video type.',
 fields: {
   id: {
     type: GraphQLString,
     description: 'The Video Id.',
   },
   name: {
     type: GraphQLString,
     description: 'The Video name.',
   },
   url: {
     type: GraphQLString,
     description: 'Added for reference in case our local cache is corrupted.',
   },
   path: {
     type: GraphQLString,
     description: 'Which directory the video.',
   },
   location: {
     type: LocationType,
     description: 'The video location.',
   },
   caption: {
     type: GraphQLString,
     description: 'The video caption.',
   }
 }
});

export default VideoType
