import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString
} from 'graphql'

import data from './data.json'

// Some test calls:
// http://localhost:8009/graphql?query={user(id:"1"){name}}
// http://localhost:8009/graphql?query={collections}

// Define our user type, with two string fields; `id` and `name`
var userType = new GraphQLObjectType({
 name: 'User',
 fields: {
   id: { type: GraphQLString },
   name: { type: GraphQLString },
 }
});

// Define our user type, with two string fields; `id` and `name`
var collectionType = new GraphQLList(GraphQLString);

const collectionSources = [
  'News',
  // Twitter
  'Social Media',
  'Blogs',
  'Photos',
  'Videos',
  'Live Diary',
];

// Define our schema, with one top level field, named `user`, that
// takes an `id` argument and returns the User with that ID.

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      type: userType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: function (_, args) {
        return data[args.id];
      }
    },
    collections: {
      type: collectionType,
      args: {
        // id: { type: GraphQLString }
      },
      resolve: function (_, args) {
        return collectionSources;
      }
    }

  })
});

const schema = new GraphQLSchema({
  query: queryType

});

export default schema
