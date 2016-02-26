import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString
} from 'graphql'

// Define our user type, with two string fields; `id` and `name`
var userType = new GraphQLObjectType({
 name: 'User',
 fields: {
   id: { type: GraphQLString },
   name: { type: GraphQLString },
 }
});

export default userType
