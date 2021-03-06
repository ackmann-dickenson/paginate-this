export const INITIALIZE_PAGINATOR = '@@paginate-this/INITIALIZE_PAGINATOR'
export const RESET_PAGINATOR = '@@paginate-this/RESET_PAGINATOR'
export const EXPIRE_PAGINATOR = '@@paginate-this/EXPIRE_PAGINATOR'
export const EXPIRE_ALL = '@@paginate-this/EXPIRE_ALL'
export const FOUND_PAGINATOR = '@@paginate-this/FOUND_PAGINATOR'
export const PREVIOUS_PAGE = '@@paginate-this/PREVIOUS_PAGE'
export const NEXT_PAGE = '@@paginate-this/NEXT_PAGE'
export const GO_TO_PAGE = '@@paginate-this/GO_TO_PAGE'
export const SET_PAGE_SIZE = '@@paginate-this/SET_PAGE_SIZE'
export const FETCH_RECORDS = '@@paginate-this/FETCH_RECORDS'
export const RESULTS_UPDATED = '@@paginate-this/RESULTS_UPDATED'
export const RESULTS_UPDATED_ERROR = '@@paginate-this/RESULTS_UPDATED_ERROR'
export const TOGGLE_FILTER_ITEM = '@@paginate-this/TOGGLE_FILTER_ITEM'
export const SET_FILTER = '@@paginate-this/SET_FILTER'
export const SET_FILTERS = '@@paginate-this/SET_FILTERS'
export const RESET_FILTERS = '@@paginate-this/RESET_FILTERS'
export const SORT_CHANGED = '@@paginate-this/SORT_CHANGED'
export const UPDATING_ITEM = '@@paginate-this/UPDATING_ITEM'
export const UPDATE_ITEMS = '@@paginate-this/UPDATE_ITEMS'
export const UPDATE_ITEM = '@@paginate-this/UPDATE_ITEM'
export const UPDATING_ITEMS = '@@paginate-this/UPDATING_ITEMS'
export const UPDATE_COMPLETE = '@@paginate-this/UPDATE_COMPLETE'
export const UPDATE_FAILED = '@@paginate-this/UPDATE_FAILED'
export const MASS_UPDATE_COMPLETE = '@@paginate-this/MASS_UPDATE_COMPLETE'
export const MASS_UPDATE_FAILED = '@@paginate-this/MASS_UPDATE_FAILED'
export const RESET_ITEM = '@@paginate-this/RESET_ITEM'
export const MARK_ITEMS_ERRORED = '@@paginate-this/MARK_ITEMS_ERRORED'
export const RESET_RESULTS = '@@paginate-this/RESET_RESULTS'
export const REMOVING_ITEM = '@@paginate-this/REMOVING_ITEM'
export const REMOVE_ITEM = '@@paginate-this/REMOVE_ITEM'
export const ITEM_ERROR = '@@paginate-this/ITEM_ERROR'

export default function actionType(t, id) {
  return `${t}_${id}`
}
