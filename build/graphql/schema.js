'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _graphql = require('graphql');

var _2 = require('./');

var _data = require('./data.json');

var _data2 = _interopRequireDefault(_data);

var _dataTopicListReal = require('./data-topic-list-real.json');

var _dataTopicListReal2 = _interopRequireDefault(_dataTopicListReal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Some test calls:
// http://localhost:8009/graphql?query={user(id:"1"){name}}
// http://localhost:8009/graphql?query={collections}

// Define our user type, with two string fields; `id` and `name`
var collectionType = new _graphql.GraphQLList(_graphql.GraphQLString);

var collectionSources = ['News',
// Twitter
'Social Media', 'Blogs', 'Photos', 'Videos', 'Live Diary'];

// http://localhost:8009/graphql?query={topicList(amount:1){...TopicFragment,urlList{url}}} fragment TopicFragment on Topic {id,title}
//
// http://localhost:8009/graphql?query={__type(name:"Topic"){name,kind,description,fields{name,type}}}
//
// Define our schema, with one top level field, named `user`, that
// takes an `id` argument and returns the User with that ID.

var queryType = new _graphql.GraphQLObjectType({
  name: 'Query',
  fields: function fields() {
    return {
      user: {
        type: _2.userType,
        args: {
          id: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(_, args) {
          return _data2.default[args.id];
        }
      },
      collections: {
        type: collectionType,
        args: {
          // id: { type: GraphQLString }
        },
        resolve: function resolve(_, args) {
          return collectionSources;
        }
      },
      topicList: {
        type: _2.topicList,
        args: {
          offset: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(_, args) {
          return _promise2.default.resolve({
            offset: args.offset || '0',
            timestamp: Date.now().toString(),
            topics:
            // // Please import the json file file data-topic-list
            // dataTopicList,

            // Please import the json file data-topic-list-real.json
            // Function to format TopList data from data-topic-list-real.json
            function topics() {
              var formatedTopicList = [],
                  topics = _dataTopicListReal2.default.topics,
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

              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(topics).sort()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  topic = _step.value;

                  // Process tagWords
                  tagWords = [];
                  tagWordsMap = new _map2.default();
                  // Convert in array of words.

                  // Calc the words frequency
                  for (i = 0; i < topics[topic].words.length; i++) {
                    words = (topics[topic].words[i] || '').split(' ');

                    for (j = 0; j < words.length; j++) {
                      tagWordsMap.set(words[j], tagWordsMap.has(words[j]) ? tagWordsMap.get(words[j]) + 1 : 1);
                    }
                  }

                  tagWordsMap.forEach(function (value, key) {
                    tagWords.push({
                      word: key,
                      frequency: value
                    });
                  });
                  // console.log(tagWords)

                  // Process NEWs
                  urlList = [];
                  urls = topics[topic].urls || [];
                  documents = topics[topic].documents || [];

                  for (i = 0; i < urls.length; i++) {
                    urlList.push({
                      url: urls[i] || null,
                      story: documents[i] || null,
                      title: 'Untitled'
                    });
                  }

                  formatedTopicList.push({
                    id: topic,
                    title: topics[topic].title || 'Topic ' + topic,
                    tagWords: tagWords,
                    urlList: urlList

                  });
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              return formatedTopicList;
            }
          });
        }
      }

    };
  }
});

var schema = new _graphql.GraphQLSchema({
  query: queryType
});

exports.default = schema;
//# sourceMappingURL=schema.js.map
