'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _locationType = require('./location-type');

var _locationType2 = _interopRequireDefault(_locationType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * We define our Video type.
 *
 * This implements the following type system shorthand:
 *   type Image {
 *     id: String
 *     name: String
 *     url: String
 *     path: String
 *     location: LocationType
 *     caption: String
 *   }
 */

var VideoType = new _graphql.GraphQLObjectType({
  name: 'Video',
  description: 'The video type.',
  fields: {
    id: {
      type: _graphql.GraphQLString,
      description: 'The Video Id.'
    },
    name: {
      type: _graphql.GraphQLString,
      description: 'The Video name.'
    },
    url: {
      type: _graphql.GraphQLString,
      description: 'Added for reference in case our local cache is corrupted.'
    },
    path: {
      type: _graphql.GraphQLString,
      description: 'Which directory the video.'
    },
    location: {
      type: _locationType2.default,
      description: 'The video location.'
    },
    caption: {
      type: _graphql.GraphQLString,
      description: 'The video caption.'
    }
  }
});

exports.default = VideoType;
//# sourceMappingURL=video-type.js.map
