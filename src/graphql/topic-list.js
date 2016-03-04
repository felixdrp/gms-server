import {
  graphql,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

import TopicType from './topic-type'

/**
 * We define our Topic List type.
 *
 * This implements the following type system shorthand:
 *   type TopicList {
 *   	 offset: String
 *     topics: [TopicType]
 *   }
 */

const topicListType = new GraphQLObjectType({
  name: 'TopicList',
  description: 'A list of topics. We can submit the offset.',
  fields: {
    offset: {
      type: GraphQLString,
      description: 'An offset to seek topics.',
    },
    timestamp: {
      type: GraphQLString,
      description: 'The timestamp of the response.',
    },
    topics: {
      type: new GraphQLList( TopicType ),
      description: 'The topic tag words. It will be used to create tag clouds',
    },
  }
});

export default topicListType
