import {
  graphql,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql'

import WordFrequencyType from './word-frequency-type'
import StoryType from './comment-type'
import TweetType from './comment-type'
import CommentType from './comment-type'

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

const topicType = new GraphQLObjectType({
 name: 'Topic',
 description: 'The subject or theme of a discourse or of one of its parts.',
 fields: {
   id: {
     type: new GraphQLNonNull( GraphQLString ),
     description: 'The id of the topic.',
   },
   title: {
     type: GraphQLString,
     description: 'The topic title or name.',
   },
   tagWords: {
     type: new GraphQLList( WordFrequencyType ),
     description: 'The topic tag words. It will be used to create tag clouds',
   },
   urlList: {
     type: new GraphQLList( StoryType ),
     description: 'These are individual stories below to that Topic.',
   },
   tweetList: {
     type: new GraphQLList( TweetType ),
     description: 'The topic related tweet list.',
   },
   comments: {
     type: new GraphQLList( CommentType ),
     description: 'The topic comments.',
   }
 }
});

export default topicType
