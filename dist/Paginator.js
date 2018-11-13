'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.Paginator = Paginator;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = require('./lib/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

var _paginate = require('./decorators/paginate');

var _paginate2 = _interopRequireDefault(_paginate);

var _pageData2 = require('./pageData');

var _pageData3 = _interopRequireDefault(_pageData2);

var _PageNumber = require('./PageNumber');

var _Prev = require('./Prev');

var _Next = require('./Next');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Paginator(props) {
  var currentPage = props.currentPage,
      totalPages = props.totalPages;

  var _pageData = (0, _pageData3.default)(currentPage, totalPages),
      firstPage = _pageData.firstPage,
      hasLeftSeparator = _pageData.hasLeftSeparator,
      middlePages = _pageData.middlePages,
      hasRightSeparator = _pageData.hasRightSeparator,
      lastPage = _pageData.lastPage;

  var pageLinks = middlePages.map(function (_ref) {
    var page = _ref.page,
        current = _ref.current;

    var pageLinkClass = (0, _classNames2.default)().withConditional({ current: current }).load();

    return _react2.default.createElement(
      'li',
      { className: pageLinkClass, key: page },
      _react2.default.createElement(_PageNumber.PageNumber, _extends({}, props, { page: page }))
    );
  });

  var separator = _react2.default.createElement(
    'li',
    { className: 'skip' },
    _react2.default.createElement('i', { className: 'fa fa-ellipsis-h' })
  );

  var begin = _react2.default.createElement(
    'li',
    { className: (0, _classNames2.default)().withConditional({ current: firstPage.current }).load() },
    _react2.default.createElement(_PageNumber.PageNumber, _extends({}, props, { page: firstPage.page }))
  );

  var end = lastPage && _react2.default.createElement(
    'li',
    { className: (0, _classNames2.default)().withConditional({ current: lastPage.current }).load() },
    _react2.default.createElement(_PageNumber.PageNumber, _extends({}, props, { page: lastPage.page }))
  );

  return _react2.default.createElement(
    'ul',
    { className: 'pagination' },
    _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(_Prev.Prev, props)
    ),
    begin,
    hasLeftSeparator && separator,
    pageLinks,
    hasRightSeparator && separator,
    end,
    _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(_Next.Next, props)
    )
  );
}

Paginator.propTypes = {
  currentPage: _propTypes2.default.number,
  totalPages: _propTypes2.default.number,
  hasPreviousPage: _propTypes2.default.bool,
  hasNextPage: _propTypes2.default.bool
};

exports.default = (0, _paginate2.default)(Paginator);