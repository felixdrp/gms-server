import {
  graphql,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql'

/**
 * We define our Story type.
 *
 * This implements the following type system shorthand:
 *   type Story {
 *     url: String
 *     title: String
 *     story: String
 *   }
 */

const StoryType = new GraphQLObjectType({
 name: 'Story',
 description: 'A story from news, etc.',
 fields: {
   url: {
     type: GraphQLString,
     description: 'The story url.',
   },
   title: {
     type: GraphQLString,
     description: 'The story title',
   },
   story: {
     type: GraphQLString,
     description: 'The story text.',
   },
 }
});

export default StoryType

export const fragment = {
  name: 'StoryFragment',
  definition: 'fragment StoryFragment on Story {url,title,story}'
}
