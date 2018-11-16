'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = fetchingComposables;

var _actionTypes = require('./actionTypes');

var actionTypes = _interopRequireWildcard(_actionTypes);

var _pageInfoTranslator = require('../pageInfoTranslator');

var _stateManagement = require('../lib/stateManagement');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var fetcher = function fetcher(id, config) {
  return function (dispatch, getState) {
    var _listConfig = (0, _stateManagement.listConfig)(id),
        fetch = _listConfig.fetch,
        params = _listConfig.params;

    var pageInfo = (0, _stateManagement.getPaginator)(id, getState());
    var requestId = pageInfo.get('requestId');

    dispatch({ type: (0, actionTypes.default)(actionTypes.FETCH_RECORDS, id) });

    var promise = dispatch(fetch((0, _pageInfoTranslator.translate)(pageInfo), config));

    return promise.then(function (resp) {
      return dispatch(_extends({}, resp.data, {
        type: (0, actionTypes.default)(actionTypes.RESULTS_UPDATED, id),
        results: resp.data[params.resultsProp],
        totalCount: resp.data[params.totalCountProp],
        requestId: requestId
      }));
    }).catch(function (error) {
      return dispatch({
        type: (0, actionTypes.default)(actionTypes.RESULTS_UPDATED_ERROR, id),
        error: error
      });
    });
  };
};

function fetchingComposables(config) {
  var id = config.listId;
  var resolve = function resolve(t) {
    return (0, actionTypes.default)(t, id);
  };

  return {
    initialize: function initialize() {
      return {
        type: resolve(actionTypes.INITIALIZE_PAGINATOR),
        preloaded: config.preloaded
      };
    },
    reset: function reset() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return {
        type: resolve(actionTypes.RESET_PAGINATOR),
        settings: settings
      };
    },
    reload: function reload() {
      return fetcher(id, config);
    },
    next: function next() {
      return {
        type: resolve(actionTypes.NEXT_PAGE)
      };
    },
    prev: function prev() {
      return {
        type: resolve(actionTypes.PREVIOUS_PAGE)
      };
    },
    goTo: function goTo(page) {
      return {
        type: resolve(actionTypes.GO_TO_PAGE),
        page: page
      };
    },
    setPageSize: function setPageSize(size) {
      return {
        type: resolve(actionTypes.SET_PAGE_SIZE),
        size: size
      };
    },
    toggleFilterItem: function toggleFilterItem(field, value) {
      return {
        type: resolve(actionTypes.TOGGLE_FILTER_ITEM),
        field: field,
        value: value
      };
    },
    setFilter: function setFilter(field, value) {
      return {
        type: resolve(actionTypes.SET_FILTER),
        field: field,
        value: value
      };
    },
    setFilters: function setFilters(filters) {
      return {
        type: resolve(actionTypes.SET_FILTERS),
        filters: filters
      };
    },
    resetFilters: function resetFilters(filters) {
      return {
        type: resolve(actionTypes.RESET_FILTERS),
        filters: filters
      };
    },
    sort: function sort(field, reverse) {
      return {
        type: resolve(actionTypes.SORT_CHANGED),
        field: field,
        reverse: reverse
      };
    }
  };
}