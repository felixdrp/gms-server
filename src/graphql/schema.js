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
import dataTopicList from './data-topic-list-real.json'

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
        offset: { type: GraphQLString }
      },
      resolve: function (_, args) {
        return Promise.resolve({
          offset: args.offset || '0',
          timestamp: Date.now().toString(),
          topics: (
            // // Please import the json file file data-topic-list
            // dataTopicList,

            // Please import the json file data-topic-list-real.json
            // Function to format TopList data from data-topic-list-real.json
            () => {
              let formatedTopicList = [],
                  topics = dataTopicList.topics,
                  topic = 0,

                  // Vars to process tagWords.
                  tagWords = [],
                  tagWordsMap = [],
                  words = [],

                  // Vars to process urlList.
                  urlList = [],
                  urls = [],
                  documents = [],

                  // Temporal vars.
                  i = 0,
                  j = 0;

              for ( topic of Object.keys( topics ).sort() ) {
                // Process tagWords
                tagWords = [];
                tagWordsMap = new Map();
                // Convert in array of words.

                // Calc the words frequency
                for ( i = 0; i < topics[topic].words.length; i++ ) {
                  words = (topics[topic].words[i] || '').split(' ');

                  for ( j = 0; j < words.length; j++ ) {
                    tagWordsMap.set(
                      words[j],
                      tagWordsMap.has( words[j] ) ?
                        tagWordsMap.get( words[j] ) + 1 :
                        1
                    )
                  }
                }

                tagWordsMap.forEach(
                  (value, key) => {
                    tagWords.push({
                      word:key,
                      frequency: value
                    });
                  }
                );
                tagWords = tagWords.sort(
                  (a, b) => {
                    // if Equal freq then sort by word
                    if ( b.frequency - a.frequency == 0 ) {
                      return b.word < a.word;
                    }

                    return b.frequency - a.frequency;
                  });
                // console.log(tagWords)


                // Process NEWs
                urlList = [];
                urls = topics[topic].urls || [];
                documents = topics[topic].documents || [];

                for ( i = 0; i < urls.length; i++ ) {
                  urlList.push(
                    {
                      url: urls[i] || null,
                      story: documents[i] || null,
                      title: null,
                    }
                  );
                }

                formatedTopicList.push(
                  {
                    id: topic,
                    title: topics[topic].title || 'Topic ' + topic,
                    tagWords,
                    urlList,

                  }
                );
              }
              return formatedTopicList;
            }
          ),
        });
      }
    }

  })
});

const schema = new GraphQLSchema({
  query: queryType
});

export default schema
