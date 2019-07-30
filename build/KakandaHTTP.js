'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import HTTP_STATUSES from './HTTP_STATUSES.js';

var KakandaHTTP = function (_React$Component) {
  _inherits(KakandaHTTP, _React$Component);

  function KakandaHTTP(props) {
    _classCallCheck(this, KakandaHTTP);

    var _this = _possibleConstructorReturn(this, (KakandaHTTP.__proto__ || Object.getPrototypeOf(KakandaHTTP)).call(this, props));

    _this.state = { searchText: '' };
    return _this;
  }

  _createClass(KakandaHTTP, [{
    key: 'handleChange',
    value: function handleChange(e) {
      this.setState({ searchText: e.target.value });
    }
  }, {
    key: 'httpStatuses',
    value: function httpStatuses() {
      var searchString = this.state.searchText.trim().toLowerCase();
      var result = HTTP_STATUSES;

      if (searchString.length > 0) {
        result = result.filter(function (httpStatus) {
          return httpStatus.status_code.match(searchString) || httpStatus.reason_phrase.toLowerCase().match(searchString);
        });
      }

      return result;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'kakanda-http' },
        React.createElement('input', { type: 'text', value: this.state.searchText, onChange: this.handleChange.bind(this), placeholder: 'Search HTTP status code or status message', className: 'kakanda-http__search' }),
        React.createElement(
          'ul',
          { className: 'kakanda-http__result' },
          this.httpStatuses().map(function (httpStatus) {
            return React.createElement(
              'li',
              { key: httpStatus.status_code, className: 'kakanda-http__result__item' },
              React.createElement(
                'aside',
                { className: 'kakanda-http__result__item__status-code' },
                React.createElement(
                  'span',
                  null,
                  httpStatus.status_code
                )
              ),
              React.createElement(
                'article',
                { className: 'kakanda-http__result__item__explanation' },
                React.createElement(
                  'h1',
                  null,
                  httpStatus.reason_phrase
                ),
                React.createElement(
                  'p',
                  null,
                  httpStatus.one_liner
                ),
                React.createElement(
                  'a',
                  { href: httpStatus.defined_in },
                  httpStatus.defined_in
                )
              )
            );
          })
        )
      );
    }
  }]);

  return KakandaHTTP;
}(React.Component);

export default KakandaHTTP;