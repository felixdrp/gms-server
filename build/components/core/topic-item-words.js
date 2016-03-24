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
      showAllStory: false
    };
    return _this;
  }

  (0, _createClass3.default)(TopicItemWords, [{
    key: 'onClickShowFullStory',
    value: function onClickShowFullStory(e) {
      this.setState({ showAllStory: !this.state.showAllStory });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var data = JSON.parse((0, _stringify2.default)(this.props.data));

      if (this.state.showAllStory == false && data.story.length > 0) {
        var temp = data.story.split(' ');

        if (temp.length > 13) {
          data.story = data.story.match(/([\w\'\"\%\&]+\s){34}/)[0];
        }
      }

      (function () {
        var wordFreq = [],
            j = 0;
        for (j = 0 | 0; j < wordsByFrequency.length; j++) {
          wordFreq.push(_react2.default.createElement(
            'span',
            {
              key: j,
              title: 'Freq ' + wordsByFrequency[j].frequency,
              style: {}
            },
            wordsByFrequency[j].word + ' '
          ));
        }
        return wordFreq;
      })();

      return _react2.default.createElement(
        'div',
        { className: 'story-item' },
        _react2.default.createElement(
          'a',
          { href: data.url, target: '_blank' },
          _react2.default.createElement(
            'h3',
            null,
            data.title
          )
        ),
        _react2.default.createElement(
          'p',
          { className: 'url' },
          data.url
        ),
        _react2.default.createElement(
          'h4',
          null,
          data.story,
          _react2.default.createElement(
            'span',
            {
              onClick: function onClick() {
                return _this2.onClickShowFullStory();
              },
              style: {
                color: '#BABAFD',
                cursor: 'pointer'
              }
            },
            this.state.showAllStory ? ' ...less' : ' ...more'
          )
        )
      );
    }
  }]);
  return TopicItemWords;
}(_react2.default.Component);

exports.default = TopicItemWords;
//# sourceMappingURL=topic-item-words.js.map
