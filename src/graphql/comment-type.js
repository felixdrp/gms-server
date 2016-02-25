import {
  graphql,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
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
   timeStamp: {
     type: GraphQLInt,
     description: 'The comment timestamp.',
   },
   upVote: {
     type: new GraphQLInt,
     description: 'The Up Vote.',
   },
   downVote: {
     type: new GraphQLInt,
     description: 'The Up Vote.',
   },
   // https://github.com/graphql/graphql-js/issues/23
   replies: {
     type: new GraphQLList( commentType ),
     description: 'The replies to the comment.',
    //  resolve: comment => getComment(comment),
   }
 })
});

export default commentType
