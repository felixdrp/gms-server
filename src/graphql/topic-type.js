import {
  graphql,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLScalarType,
} from 'graphql'

import WordFrequencyType from './word-frequency-type'
import StoryType from './story-type'
import TweetType from './tweet-type'
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
     type: new GraphQLScalarType({
       name: 'Raw',
       serialize(value) {
          //  any kind of data
          return value;
       }
     })
   }
 }
});

function getComments(comment) {

}

export default topicType

export const fragment = {
  name: 'TopicFragment',
  definition: 'fragment TopicFragment on Topic {id,title}'
}
