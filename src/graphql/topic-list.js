import {
  graphql,
  GraphQLList,
} from 'graphql'

import TopicType from './topic-type'

/**
 * We define our Topic List type.
 *
 * This implements the following type system shorthand:
 *   type TopicList {
 *     topics: [TopicType]
 *   }
 */

const topicListType = new GraphQLList(GraphQLString)

export default topicListType
