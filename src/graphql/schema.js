import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from 'graphql'

import {
  userType,
  topicList,
  topicType
} from './'


import data from './data.json'
import dataTopicList from './data-topic-list.json'

// Some test calls:
// http://localhost:8009/graphql?query={user(id:"1"){name}}
// http://localhost:8009/graphql?query={collections}

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

// http://localhost:8009/graphql?query={topicList(amount:1){...TopicFragment,urlList{url}}} fragment TopicFragment on Topic {id,title}
//
// http://localhost:8009/graphql?query={__type(name:"Topic"){name,kind,description,fields{name,type}}}
//
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
    },
    topicList: {
      type: topicList,
      args: {
        amount: { type: GraphQLInt }
      },
      resolve: function (_, args) {
        return dataTopicList;
      }
    }

  })
});

const schema = new GraphQLSchema({
  query: queryType

});

export default schema
