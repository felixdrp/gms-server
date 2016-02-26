'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _locationType = require('./location-type');

var _locationType2 = _interopRequireDefault(_locationType);

var _imageType = require('./image-type');

var _imageType2 = _interopRequireDefault(_imageType);

var _videoType = require('./video-type');

var _videoType2 = _interopRequireDefault(_videoType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * We define our News type.
 *
 * This implements the following type system shorthand:
 *   type News {
 *     id: String
 *     url: String
 *     source: String
 *     title: String
 *     description: String
 *     timestamp: Integer
 *     category: String
 *     mainStory: String
 *     locations: [LocationType]
 *     images: [ImageType]
 *     videos: [VideoType]
 *   }
 */

var newsType = new _graphql.GraphQLObjectType({
  name: 'News',
  description: 'The News!!!',
  fields: {
    id: {
      type: _graphql.GraphQLString,
      description: 'The News id.'
    },
    url: {
      type: _graphql.GraphQLString,
      description: 'The News url.'
    },
    source: {
      type: _graphql.GraphQLString,
      description: 'The News source.'
    },
    title: {
      type: _graphql.GraphQLString,
      description: 'The News title.'
    },
    description: {
      type: _graphql.GraphQLString,
      description: 'The News description.'
    },
    timestamp: {
      type: _graphql.GraphQLInt,
      description: 'The News timestamp.'
    },
    category: {
      type: _graphql.GraphQLString,
      description: 'The News category.'
    },
    mainStory: {
      type: _graphql.GraphQLString,
      description: 'The News mainStory.'
    },
    locations: {
      type: new _graphql.GraphQLList(_locationType2.default),
      description: 'The topic related tweet list.'
    },
    images: {
      type: new _graphql.GraphQLList(_imageType2.default),
      description: 'The topic related tweet list.'
    },
    videos: {
      type: new _graphql.GraphQLList(_videoType2.default),
      description: 'The topic related tweet list.'
    }
  }
});

exports.default = newsType;
//# sourceMappingURL=news-type.js.map
