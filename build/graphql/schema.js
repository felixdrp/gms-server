'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _data = require('./data.json');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Some test calls:
// http://localhost:8009/graphql?query={user(id:"1"){name}}
// http://localhost:8009/graphql?query={collections}

// Define our user type, with two string fields; `id` and `name`
var userType = new _graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: _graphql.GraphQLString },
    name: { type: _graphql.GraphQLString }
  }
});

// Define our user type, with two string fields; `id` and `name`
var collectionType = new _graphql.GraphQLList(_graphql.GraphQLString);

var collectionSources = ['News',
// Twitter
'Social Media', 'Blogs', 'Photos', 'Videos', 'Live Diary'];

// Define our schema, with one top level field, named `user`, that
// takes an `id` argument and returns the User with that ID.

var queryType = new _graphql.GraphQLObjectType({
  name: 'Query',
  fields: function fields() {
    return {
      user: {
        type: userType,
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
      }

    };
  }
});

var schema = new _graphql.GraphQLSchema({
  query: queryType

});

exports.default = schema;
//# sourceMappingURL=schema.js.map
