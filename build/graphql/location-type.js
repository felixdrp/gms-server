'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

/**
 * We define our Location type.
 *
 * This implements the following type system shorthand:
 *   type Location {
 *     long: String
 *     lat: String
 *     accuracy: String
 *     address: String
 *     city: String
 *     country: String
 *   }
 */

var LocationType = new _graphql.GraphQLObjectType({
  name: 'Location',
  description: 'The location type.',
  fields: {
    long: {
      type: _graphql.GraphQLString,
      description: 'Longitude.'
    },
    lat: {
      type: _graphql.GraphQLString,
      description: 'Latitude.'
    },
    accuracy: {
      type: _graphql.GraphQLString,
      description: 'Global position accuracy.'
    },
    address: {
      type: _graphql.GraphQLString,
      description: 'The location address.'
    },
    city: {
      type: _graphql.GraphQLString,
      description: 'The location city.'
    },
    country: {
      type: _graphql.GraphQLString,
      description: 'The location country.'
    }
  }
});

exports.default = LocationType;
//# sourceMappingURL=location-type.js.map
