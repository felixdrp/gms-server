'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TopicItemWords = function (_React$Component) {
  (0, _inherits3.default)(TopicItemWords, _React$Component);

  function TopicItemWords() {
    (0, _classCallCheck3.default)(this, TopicItemWords);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(TopicItemWords).call(this));

    _this.state = {
      showAllWords: false
    };
    return _this;
  }

  (0, _createClass3.default)(TopicItemWords, [{
    key: 'onClickShowFullStory',
    value: function onClickShowFullStory(e) {
      this.setState({ showAllWords: !this.state.showAllWords });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // Create a data copy
      var data = JSON.parse((0, _stringify2.default)(this.props.data)),
          words = data.wordsByFrequency,
          wordFreq = [],
          max = words.length,
          j = 0;

      var numberWords = 21;

      if (this.state.showAllWords == false && words.length > numberWords) {
        max = numberWords;
      }

      for (j = 0 | 0; j < max; j++) {
        wordFreq.push(_react2.default.createElement(
          'span',
          {
            key: j,
            title: 'Freq ' + words[j].frequency,
            style: {}
          },
          words[j].word + ' '
        ));
      }

      return _react2.default.createElement(
        'div',
        { className: 'word-freq' },
        wordFreq,
        _react2.default.createElement(
          'span',
          {
            onClick: function onClick() {
              return _this2.onClickShowFullStory();
            },
            className: 'show-more',
            style: {}
          },
          this.state.showAllWords ? ' ...less' : ' ...more'
        )
      );
    }
  }]);
  return TopicItemWords;
}(_react2.default.Component);

exports.default = TopicItemWords;
//# sourceMappingURL=topic-item-words.js.map
