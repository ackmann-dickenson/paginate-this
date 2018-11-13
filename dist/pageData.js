'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pageData;

var _range = require('./lib/range');

var _range2 = _interopRequireDefault(_range);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function pageData(currentPage, totalPages) {
  var maxPages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 7;

  var hasRightSeparator = totalPages - currentPage >= maxPages;
  var hasLeftSeparator = totalPages > maxPages && currentPage > 2;
  var minPage = hasLeftSeparator ? Math.min(currentPage, totalPages - (maxPages - 1)) : 2;
  var rangeSize = maxPages - [hasRightSeparator, hasLeftSeparator].filter(function (h) {
    return h;
  }).length;
  var maxPage = Math.max(minPage, Math.min(totalPages - 1, minPage + (rangeSize - 1)));

  var firstPage = {
    page: 1,
    current: currentPage === 1
  };

  var lastPage = totalPages > 1 && {
    page: totalPages,
    current: currentPage === totalPages
  };

  var middlePages = totalPages <= 2 ? [] : [].concat(_toConsumableArray((0, _range2.default)(minPage, maxPage))).map(function (page) {
    return {
      page: page,
      current: page === currentPage
    };
  });

  return { firstPage: firstPage, hasLeftSeparator: hasLeftSeparator, middlePages: middlePages, hasRightSeparator: hasRightSeparator, lastPage: lastPage };
}