'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var processWords = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var topicFile, final, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            topicFile = new _processTopicFile2.default(topicFilesPath.WORDS);
            final = {};
            _context.next = 4;
            return topicFile.getData();

          case 4:
            data = _context.sent;

            data.map(function (obj) {
              if (!final[obj.topic]) {
                final[obj.topic] = { words: [] };
              }
              final[obj.topic].words.push(obj.word);
            });
            // console.log( { topics: final } );
            return _context.abrupt('return', final);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return function processWords() {
    return ref.apply(this, arguments);
  };
}();

var processNews = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
    var topicFile, final, data;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            topicFile = new _processTopicFile2.default(topicFilesPath.NEWS);
            final = {};
            _context2.next = 4;
            return topicFile.getData();

          case 4:
            data = _context2.sent;

            data.map(function (obj) {
              if (!final[obj.topic]) {
                final[obj.topic] = {
                  urls: [],
                  documents: []
                };
              }
              final[obj.topic].urls.push(obj.url);
              final[obj.topic].documents.push(obj.document);
            });
            // console.log( { topics: final } );
            return _context2.abrupt('return', final);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return function processNews() {
    return ref.apply(this, arguments);
  };
}();

var processTweets = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
    var topicFile, final, data;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            topicFile = new _processTopicFile2.default(topicFilesPath.TWEETS);
            final = {};
            _context3.next = 4;
            return topicFile.getData();

          case 4:
            data = _context3.sent;

            data.map(function (obj) {
              if (!final[obj.topic]) {
                final[obj.topic] = { tweets: [] };
              }
              final[obj.topic].tweets.push(obj.document);
            });
            // console.log( { topics: final } );
            return _context3.abrupt('return', final);

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return function processTweets() {
    return ref.apply(this, arguments);
  };
}();

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _processTopicFile = require('./process-topic-file');

var _processTopicFile2 = _interopRequireDefault(_processTopicFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');

var PATH_TOPIC_FILES = '/home/rp/Downloads/forLong/';

var topicFilesPath = {
  WORDS: PATH_TOPIC_FILES + 'news_representative_words_output.txt',
  NEWS: PATH_TOPIC_FILES + 'news_documents_output.txt',
  TWEETS: PATH_TOPIC_FILES + 'tweets_documents_output.txt'
};

var outputFilename = './src/graphql/data-topic-list-real.json';

;

;

;

(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
  var topicList;
  return _regenerator2.default.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:

          console.time('Processin Files');
          _context4.t2 = _immutable2.default.fromJS({});
          _context4.next = 4;
          return processWords();

        case 4:
          _context4.t3 = _context4.sent;
          _context4.t1 = _context4.t2.mergeDeep.call(_context4.t2, _context4.t3);
          _context4.next = 8;
          return processNews();

        case 8:
          _context4.t4 = _context4.sent;
          _context4.t0 = _context4.t1.mergeDeep.call(_context4.t1, _context4.t4);
          _context4.next = 12;
          return processTweets();

        case 12:
          _context4.t5 = _context4.sent;
          topicList = _context4.t0.mergeDeep.call(_context4.t0, _context4.t5);

          console.timeEnd('Processin Files');

          // console.log(
          //   topicList
          // )

          topicList.toObject();
          topicList.toArray();
          topicList.toJS();

          // console.log(
          //   JSON.stringify( topicList , null, 2 )
          // )

          fs.writeFile(outputFilename, (0, _stringify2.default)({ topics: topicList }, null, 2), function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log("JSON saved to " + outputFilename);
            }
          });

        case 19:
        case 'end':
          return _context4.stop();
      }
    }
  }, _callee4, undefined);
}))();

// print process.argv
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});
//# sourceMappingURL=process-topic-list.js.map
