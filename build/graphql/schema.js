'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _2 = require('./');

var _data = require('./data.json');

var _data2 = _interopRequireDefault(_data);

var _dataTopicList = require('./data-topic-list.json');

var _dataTopicList2 = _interopRequireDefault(_dataTopicList);

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
          return {
            offset: args.offset || '0',
            timestamp: Date.now().toString(),
            topics: _dataTopicList2.default
          };
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
