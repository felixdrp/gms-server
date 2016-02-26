'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _locationType = require('./location-type');

var _locationType2 = _interopRequireDefault(_locationType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * We define our Image type.
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

var ImageType = new _graphql.GraphQLObjectType({
  name: 'Image',
  description: 'The image type.',
  fields: {
    id: {
      type: _graphql.GraphQLString,
      description: 'The image Id.'
    },
    name: {
      type: _graphql.GraphQLString,
      description: 'The name Id.'
    },
    url: {
      type: _graphql.GraphQLString,
      description: 'Added for reference in case our local cache is corrupted.'
    },
    path: {
      type: _graphql.GraphQLString,
      description: 'Which directory the image.'
    },
    location: {
      type: _locationType2.default,
      description: 'The image location.'
    },
    caption: {
      type: _graphql.GraphQLString,
      description: 'The image caption.'
    }
  }
});

exports.default = ImageType;
//# sourceMappingURL=image-type.js.map
