import actionType, * as actionTypes from './actionTypes'
import { translate } from '../pageInfoTranslator'
import { getPaginator, listConfig } from '../lib/stateManagement'

const fetcher = (id, config) =>
  (dispatch, getState) => {
    const { fetch, params } = listConfig(id);
    const pageInfo = getPaginator(id, getState());
    const requestId = pageInfo.get('requestId');

    dispatch({ type: actionType(actionTypes.FETCH_RECORDS, id) });

    const promise = dispatch(fetch(translate(pageInfo), config));

    return promise.then(resp =>
      dispatch({
        ...resp.data,
        type: actionType(actionTypes.RESULTS_UPDATED, id),
        results: resp.data[params.resultsProp],
        totalCount: resp.data[params.totalCountProp],
        requestId
      })
    ).catch(error =>
      dispatch({
        type: actionType(actionTypes.RESULTS_UPDATED_ERROR, id),
        error
      })
    )
  }

export default function fetchingComposables(config) {
  const id = config.listId
  const resolve = t => actionType(t, id)

  return {
    initialize: () => ({
      type: resolve(actionTypes.INITIALIZE_PAGINATOR),
      preloaded: config.preloaded
    }),
    reset: (settings = {}) => ({
      type: resolve(actionTypes.RESET_PAGINATOR),
      settings
    }),
    reload: () => fetcher(id, config),
    next: () => ({
      type: resolve(actionTypes.NEXT_PAGE)
    }),
    prev: () => ({
      type: resolve(actionTypes.PREVIOUS_PAGE)
    }),
    goTo: (page) => ({
      type: resolve(actionTypes.GO_TO_PAGE),
      page
    }),
    setPageSize: (size) => ({
      type: resolve(actionTypes.SET_PAGE_SIZE),
      size
    }),
    toggleFilterItem: (field, value) => ({
      type: resolve(actionTypes.TOGGLE_FILTER_ITEM),
      field,
      value
    }),
    setFilter: (field, value) => ({
      type: resolve(actionTypes.SET_FILTER),
      field,
      value
    }),
    setFilters: (filters) => ({
      type: resolve(actionTypes.SET_FILTERS),
      filters
    }),
    resetFilters: (filters) => ({
      type: resolve(actionTypes.RESET_FILTERS),
      filters
    }),
    sort: (field, reverse) => ({
      type: resolve(actionTypes.SORT_CHANGED),
      field,
      reverse
    })
  }
}

