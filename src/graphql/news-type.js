import {
  graphql,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql'

import LocationType from './location-type'
import ImageType from './image-type'
import VideoType from './video-type'

/**
 * We define our News type.
 *
 * This implements the following type system shorthand:
 *   type News {
 *     id: String
 *     url: String
 *     source: String
 *     title: String
 *     description: String
 *     timestamp: Integer
 *     category: String
 *     mainStory: String
 *     locations: [LocationType]
 *     images: [ImageType]
 *     videos: [VideoType]
 *   }
 */

const newsType = new GraphQLObjectType({
 name: 'News',
 description: 'The News!!!',
 fields: {
   id: {
     type: GraphQLString,
     description: 'The News id.',
   },
   url: {
     type: GraphQLString,
     description: 'The News url.',
   },
   source: {
     type: GraphQLString,
     description: 'The News source.',
   },
   title: {
     type: GraphQLString,
     description: 'The News title.',
   },
   description: {
     type: GraphQLString,
     description: 'The News description.',
   },
   timestamp: {
     type: GraphQLInt,
     description: 'The News timestamp.',
   },
   category: {
     type: GraphQLString,
     description: 'The News category.',
   },
   mainStory: {
     type: GraphQLString,
     description: 'The News mainStory.',
   },
   locations: {
     type: new GraphQLList( LocationType ),
     description: 'The topic related tweet list.',
   },
   images: {
     type: new GraphQLList( ImageType ),
     description: 'The topic related tweet list.',
   },
   videos: {
     type: new GraphQLList( VideoType ),
     description: 'The topic related tweet list.',
   }
 }
});

export default newsType
