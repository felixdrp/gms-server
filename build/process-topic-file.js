'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readline = require('readline');
var fs = require('fs');
var FILE_PATH = process.argv[3] || '/home/rp/Downloads/forLong/news_representative_words_output.txt';

var ProcessTopicFile = function () {
  function ProcessTopicFile(filePath) {
    (0, _classCallCheck3.default)(this, ProcessTopicFile);

    this.filePath = filePath || FILE_PATH;
  }

  (0, _createClass3.default)(ProcessTopicFile, [{
    key: 'getData',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                result = {};
                _context.prev = 1;
                _context.next = 4;
                return extractDataFromFile(this.filePath);

              case 4:
                result = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](1);

                console.error(_context.t0);

              case 10:
                return _context.abrupt('return', result);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 7]]);
      }));
      return function getData() {
        return ref.apply(this, arguments);
      };
    }()
  }]);
  return ProcessTopicFile;
}();

exports.default = ProcessTopicFile;


function extractDataFromFile(filePath) {
  return new _promise2.default(function (resolve, reject) {
    var rl = readline.createInterface({
      input: fs.createReadStream(filePath)
    });

    var data = [],
        cache = '';

    rl.on('line', function (line) {
      cache += line;

      if (line == '}') {
        // console.log('Line from file:', JSON.stringify( JSON.parse(cache) ) );
        data.push(JSON.parse(cache));
        cache = '';
      }
    });

    rl.on('close', function () {
      resolve(data);
    });
  });
}
//# sourceMappingURL=process-topic-file.js.map
