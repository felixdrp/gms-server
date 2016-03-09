import {
  graphql,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLJson,
} from 'graphql'

/**
 * We define our Comment type.
 *
 * This implements the following type system shorthand:
 *   type Comment {
 *     // String! = not null String
 *     id: String!
 *
 *     userId: String
 *     body: String
 *     timeStamp: Integer
 *     upVote: Integer
 *     downVote: Integer
 *
 * 		// recursive
 *    // https://github.com/graphql/graphql-js/issues/23
 *     replies: [CommentType]
 *   }
 */

const commentType = new GraphQLObjectType({
 name: 'Comment',
 description: 'Generic Comment type.',
 fields: () => ({
   id: {
     type: new GraphQLNonNull( GraphQLString ),
     description: 'The id of the Comment.',
   },
   userId: {
     type: GraphQLString,
     description: 'The comment user id.',
   },
   body: {
     type: GraphQLString,
     description: 'The comment text.',
   },
   timestamp: {
     type: GraphQLInt,
     description: 'The comment timestamp.',
   },
   upVote: {
     type: GraphQLInt,
     description: 'The Up Vote.',
   },
   downVote: {
     type: GraphQLInt,
     description: 'The Down Vote.',
   },
   // https://github.com/graphql/graphql-js/issues/23
   replies: {
     type: GraphQLJson,
     description: 'The replies to the comment.',
    //  resolve: comment => getComment(comment),
   }
 })
});

export default commentType

export const fragment = {
  name: 'CommentFragment',
  definition: 'fragment CommentFragment on Comment {id,userId,body,timestamp,upVote,downVote,replies }'
}
