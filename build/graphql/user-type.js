'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

// Define our user type, with two string fields; `id` and `name`
var userType = new _graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: _graphql.GraphQLString },
    name: { type: _graphql.GraphQLString }
  }
});

exports.default = userType;
//# sourceMappingURL=user-type.js.map
