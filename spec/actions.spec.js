import Immutable, { List } from 'immutable'
import expect from 'expect'
import PromiseMock from 'promise-mock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import register, { destroyAll, expireAll } from '../src/actions'
import { defaultPaginator } from '../src/reducer'
import * as actionTypes from '../src/actionTypes'

const listId = 'someId'
const mockStore = configureMockStore([thunk])

const setup = (pass=true, results=[]) => {
  const paginator = defaultPaginator
    .set('id', listId)
    .set('results', Immutable.fromJS(results))

  const store = mockStore({ pagination: List.of(paginator) })
  const data = {
    total_count: 1,
    results: [{ name: 'Ewe and IPA' }]
  }

  const fetch = () => () =>
    (pass && Promise.resolve({ data })) || Promise.reject(new Error('An error'))

  const pageActions = register({
    isBoundToDispatch: false,
    listId,
    fetch
  })

  return { paginator, store, pageActions }
}

describe('pageActions.reload', () => {
  beforeEach(() => {
    PromiseMock.install()
  })

  afterEach(() => {
    PromiseMock.uninstall()
  })


  context('when fetch succeeds', () => {
    it('dispatches RESULTS_UPDATED', () => {
      const { pageActions, store } = setup()

      let rejected = false
      store.dispatch(pageActions.reload()).then(() => {
        const actions = store.getActions()
        const types = actions.map(a => a.type)
        expect(types).toEqual([actionTypes.FETCH_RECORDS, actionTypes.RESULTS_UPDATED])
      }).catch(() => {
        rejected = true
      })

      Promise.runAll()
      expect(rejected).toBe(false)
    })

    context('when results props are configured', () => {
      const paginator = defaultPaginator.set('id', listId)
      const store = mockStore({ pagination: List.of(paginator) })
      const data = {
        total_entries: 1,
        recipes: [{ name: 'Ewe and IPA' }]
      }

      const fetch = () => () => Promise.resolve({ data })

      const pageActions = register({
        resultsProp: 'recipes',
        totalCountProp: 'total_entries',
        isBoundToDispatch: false,
        listId,
        fetch
      })

      it('is able to read the results', () => {
        let rejected = false
        store.dispatch(pageActions.reload()).then(() => {
          const action = store.getActions().find(a => a.type === actionTypes.RESULTS_UPDATED)
          expect(action.results).toEqual(data.recipes)
        }).catch(() => {
          rejected = true
        })

        Promise.runAll()
        expect(rejected).toBe(false)
      })

      it('is able to read the count', () => {
        let rejected = false
        store.dispatch(pageActions.reload()).then(() => {
          const action = store.getActions().find(a => a.type === actionTypes.RESULTS_UPDATED)
          expect(action.totalCount).toEqual(data.total_entries)
        }).catch(() => {
          rejected = true
        })

        Promise.runAll()
        expect(rejected).toBe(false)
      })
    })
  })

  context('when fetch fails', () => {
    it('dispatches RESULTS_UPDATED_ERROR', () => {
      const { pageActions, store } = setup(false)

      let rejected = false
      store.dispatch(pageActions.reload()).then(() => {
        const actions = store.getActions()
        const types = actions.map(a => a.type)
        expect(types).toEqual([actionTypes.FETCH_RECORDS, actionTypes.RESULTS_UPDATED_ERROR])
      }).catch(() => {
        rejected = true
      })

      Promise.runAll()
      expect(rejected).toBe(false)
    })
  })
})

describe('pageActions.next', () => {
  beforeEach(() => {
    PromiseMock.install()
  })

  afterEach(() => {
    PromiseMock.uninstall()
  })

  it('dispatches NEXT_PAGE', () => {
    const { pageActions, store } = setup()
    const expectedAction = {
      type: actionTypes.NEXT_PAGE,
      id: listId
    }

    let rejected = false
    store.dispatch(pageActions.next()).then(() => {
      const actions = store.getActions()
      expect(actions).toInclude(expectedAction)
    }).catch(() => {
      rejected = true
    })

    Promise.runAll()
    expect(rejected).toBe(false)
  })
})

describe('pageActions.prev', () => {
  beforeEach(() => {
    PromiseMock.install()
  })

  afterEach(() => {
    PromiseMock.uninstall()
  })

  it('dispatches PREV_PAGE', () => {
    const { pageActions, store } = setup()
    const expectedAction = {
      type: actionTypes.PREVIOUS_PAGE,
      id: listId
    }

    let rejected = false
    store.dispatch(pageActions.prev()).then(() => {
      const actions = store.getActions()
      expect(actions).toInclude(expectedAction)
    }).catch(() => {
      rejected = true
    })

    Promise.runAll()
    expect(rejected).toBe(false)
  })
})

describe('pageActions.goTo', () => {
  beforeEach(() => {
    PromiseMock.install()
  })

  afterEach(() => {
    PromiseMock.uninstall()
  })

  it('dispatches GO_TO_PAGE', () => {
    const { pageActions, store } = setup()
    const page = 2
    const expectedAction = {
      type: actionTypes.GO_TO_PAGE,
      page,
      id: listId
    }

    let rejected = false
    store.dispatch(pageActions.goTo(page)).then(() => {
      const actions = store.getActions()
      expect(actions).toInclude(expectedAction)
    }).catch(() => {
      rejected = true
    })

    Promise.runAll()
    expect(rejected).toBe(false)
  })
})

describe('pageActions.setPageSize', () => {
  beforeEach(() => {
    PromiseMock.install()
  })

  afterEach(() => {
    PromiseMock.uninstall()
  })

  it('dispatches SET_PAGE_SIZE', () => {
    const { pageActions, store } = setup()
    const size = 25
    const expectedAction = {
      type: actionTypes.SET_PAGE_SIZE,
      size,
      id: listId
    }

    let rejected = false
    store.dispatch(pageActions.setPageSize(size)).then(() => {
      const actions = store.getActions()
      expect(actions).toInclude(expectedAction)
    }).catch(() => {
      rejected = true
    })

    Promise.runAll()
    expect(rejected).toBe(false)
  })
})

describe('pageActions.toggleFilterItem', () => {
  beforeEach(() => {
    PromiseMock.install()
  })

  afterEach(() => {
    PromiseMock.uninstall()
  })

  it('dispatches TOGGLE_FILTER_ITEM', () => {
    const { pageActions, store } = setup()
    const field = 'status_types'
    const value = 'inactive'
    const expectedAction = {
      type: actionTypes.TOGGLE_FILTER_ITEM,
      field,
      value,
      id: listId
    }

    let rejected = false
    store.dispatch(pageActions.toggleFilterItem(field, value)).then(() => {
      const actions = store.getActions()
      expect(actions).toInclude(expectedAction)
    }).catch(() => {
      rejected = true
    })

    Promise.runAll()
    expect(rejected).toBe(false)
  })
})

describe('pageActions.setFilter', () => {
  beforeEach(() => {
    PromiseMock.install()
  })

  afterEach(() => {
    PromiseMock.uninstall()
  })

  it('dispatches SET_FILTER', () => {
    const { pageActions, store } = setup()
    const field = 'name'
    const value = { like: 'IPA' }
    const expectedAction = {
      type: actionTypes.SET_FILTER,
      field,
      value,
      id: listId
    }

    let rejected = false
    store.dispatch(pageActions.setFilter(field, value)).then(() => {
      const actions = store.getActions()
      expect(actions).toInclude(expectedAction)
    }).catch(() => {
      rejected = true
    })

    Promise.runAll()
    expect(rejected).toBe(false)
  })
})

describe('pageActions.setFilters', () => {
  beforeEach(() => {
    PromiseMock.install()
  })

  afterEach(() => {
    PromiseMock.uninstall()
  })

  it('dispatches SET_FILTERS', () => {
    const { pageActions, store } = setup()
    const filters = { name: { like: 'IPA' } }
    const expectedAction = {
      type: actionTypes.SET_FILTERS,
      id: listId,
      filters
    }

    let rejected = false
    store.dispatch(pageActions.setFilters(filters)).then(() => {
      const actions = store.getActions()
      expect(actions).toInclude(expectedAction)
    }).catch(() => {
      rejected = true
    })

    Promise.runAll()
    expect(rejected).toBe(false)
  })
})

describe('pageActions.resetFilters', () => {
  beforeEach(() => {
    PromiseMock.install()
  })

  afterEach(() => {
    PromiseMock.uninstall()
  })

  it('dispatches RESET_FILTERS', () => {
    const { pageActions, store } = setup()
    const filters = { name: { like: 'IPA' } }
    const expectedAction = {
      type: actionTypes.RESET_FILTERS,
      id: listId,
      filters
    }

    let rejected = false
    store.dispatch(pageActions.resetFilters(filters)).then(() => {
      const actions = store.getActions()
      expect(actions).toInclude(expectedAction)
    }).catch(() => {
      rejected = true
    })

    Promise.runAll()
    expect(rejected).toBe(false)
  })
})

describe('pageActions.sort', () => {
  beforeEach(() => {
    PromiseMock.install()
  })

  afterEach(() => {
    PromiseMock.uninstall()
  })

  it('dispatches SORT_CHANGED', () => {
    const { pageActions, store } = setup()
    const field = 'name'
    const reverse = false
    const expectedAction = {
      type: actionTypes.SORT_CHANGED,
      field,
      reverse,
      id: listId
    }

    let rejected = false
    store.dispatch(pageActions.sort(field, reverse)).then(() => {
      const actions = store.getActions()
      expect(actions).toInclude(expectedAction)
    }).catch(() => {
      rejected = true
    })

    Promise.runAll()
    expect(rejected).toBe(false)
  })
})

describe('updatingItem', () => {
  it('dispatches UPDATING_ITEM', () => {
    const { pageActions, store } = setup()
    const itemId = 42
    const expectedAction = {
      type: actionTypes.UPDATING_ITEM,
      id: listId,
      itemId
    }

    expect(store.dispatch(pageActions.updatingItem(itemId))).toEqual(expectedAction)
  })
})

describe('removingItem', () => {
  it('dispatches REMOVING_ITEM', () => {
    const { pageActions, store } = setup()
    const itemId = 42
    const expectedAction = {
      type: actionTypes.REMOVING_ITEM,
      id: listId,
      itemId
    }

    expect(store.dispatch(pageActions.removingItem(itemId))).toEqual(expectedAction)
  })
})

describe('updateItem', () => {
  it('dispatches UPDATE_ITEM', () => {
    const { pageActions, store } = setup()
    const itemId = 42
    const data = { name: 'Ewe and IPA' }
    const expectedAction = {
      type: actionTypes.UPDATE_ITEM,
      id: listId,
      itemId,
      data
    }

    expect(store.dispatch(pageActions.updateItem(itemId, data))).toEqual(expectedAction)
  })
})

describe('removeItem', () => {
  it('dispatches REMOVE_ITEM', () => {
    const { pageActions, store } = setup()
    const itemId = 42
    const expectedAction = {
      type: actionTypes.REMOVE_ITEM,
      id: listId,
      itemId
    }

    expect(store.dispatch(pageActions.removeItem(itemId))).toEqual(expectedAction)
  })
})

describe('destroy', () => {
  it('dispatches DESTROY_PAGINATOR', () => {
    const { pageActions, store } = setup()
    const expectedAction = {
      type: actionTypes.DESTROY_PAGINATOR,
      id: listId
    }

    expect(store.dispatch(pageActions.destroy())).toEqual(expectedAction)
  })
})

describe('destroyAll', () => {
  it('dispatches DESTROY_ALL', () => {
    const { store } = setup()
    const expectedAction = {
      type: actionTypes.DESTROY_ALL
    }

    expect(store.dispatch(destroyAll())).toEqual(expectedAction)
  })
})

describe('expire', () => {
  it('dispatches EXPIRE_PAGINATOR', () => {
    const { pageActions, store } = setup()
    const expectedAction = {
      type: actionTypes.EXPIRE_PAGINATOR,
      id: listId
    }

    expect(store.dispatch(pageActions.expire())).toEqual(expectedAction)
  })
})

describe('expireAll', () => {
  it('dispatches EXPIRE_ALL', () => {
    const { store } = setup()
    const expectedAction = {
      type: actionTypes.EXPIRE_ALL
    }

    expect(store.dispatch(expireAll())).toEqual(expectedAction)
  })
})

describe('updateAsync', () => {
  const itemId = 'itemId'

  beforeEach(() => {
    PromiseMock.install()
  })

  afterEach(() => {
    PromiseMock.uninstall()
  })

  context('on update success', () => {
    it('updates the item', () => {
      let rejected = false
      const { pageActions, store } = setup()
      const updateData = { active: true }
      const serverVersion = { active: false }
      const update = Promise.resolve(serverVersion)

      const expectedActions = [{
        type: actionTypes.UPDATE_ITEM,
        id: listId,
        data: updateData,
        itemId
      }, {
        type: actionTypes.UPDATING_ITEM,
        id: listId,
        itemId
      }, {
        type: actionTypes.UPDATE_ITEM,
        id: listId,
        data: serverVersion,
        itemId
      }]

      store.dispatch(pageActions.updateAsync(itemId, updateData, update)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      }).catch(() => {
        rejected = true
      })

      Promise.runAll()
      expect(rejected).toBe(false)
    })
  })

  context('on update failure', () => {
    it('reverts the item', () => {
      let rejected = false

      const record = {
        id: itemId,
        name: 'Ewe and IPA'
      }

      const results = [record]

      const { pageActions, store } = setup(true, results)
      const updateData = { name: 'Pouty Stout' }
      const error = 'server error'
      const update = Promise.reject(error)

      const expectedActions = [{
        type: actionTypes.UPDATE_ITEM,
        id: listId,
        data: updateData,
        itemId
      }, {
        type: actionTypes.UPDATING_ITEM,
        id: listId,
        itemId
      }, {
        type: actionTypes.UPDATE_ITEM,
        id: listId,
        data: record,
        itemId
      }, {
        type: actionTypes.ITEM_ERROR,
        id: listId,
        error,
        itemId
      }]

      store.dispatch(pageActions.updateAsync(itemId, updateData, update)).then(() => {
        const actions = store.getActions()
        expect(actions).toEqual(expectedActions)
      }).catch(() => {
        rejected = true
      })

      Promise.runAll()
      expect(rejected).toBe(false)
    })
  })
})

describe('updateAllAsync', () => {
  const itemId = 'itemId'

  beforeEach(() => {
    PromiseMock.install()
  })

  afterEach(() => {
    PromiseMock.uninstall()
  })

  context('on update success', () => {
    const updateData = { active: true }

    context('with default settings', () => {
      let rejected = false

      const serverVersion = { active: false }

      const expectedActions = [{
        type: actionTypes.UPDATE_ALL,
        id: listId,
        data: updateData
      }, {
        type: actionTypes.UPDATING_ALL,
        id: listId
      }, {
        type: actionTypes.UPDATE_ALL,
        id: listId,
        data: serverVersion
      }]

      it('updates all the items', () => {
        const { pageActions, store } = setup()
        const update = Promise.resolve(serverVersion)
        store.dispatch(pageActions.updateAllAsync(updateData, update)).then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        }).catch(() => {
          rejected = true
        })

        Promise.runAll()
        expect(rejected).toBe(false)
      })
    })

    context('with reset=true', () => {
      let rejected = false

      const serverVersion = [{ id: 1, name: 'Ewe and IPA', active: false }]

      const expectedActions = [{
        type: actionTypes.UPDATE_ALL,
        id: listId,
        data: updateData
      }, {
        type: actionTypes.UPDATING_ALL,
        id: listId
      }, {
        type: actionTypes.RESET_RESULTS,
        id: listId,
        results: serverVersion
      }]

      it('resets the items', () => {
        const { pageActions, store } = setup()
        const update = Promise.resolve(serverVersion)
        store.dispatch(pageActions.updateAllAsync(updateData, update, true)).then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        }).catch(() => {
          rejected = true
        })

        Promise.runAll()
        expect(rejected).toBe(false)
      })
    })
  })

  context('on update failure', () => {
    it('reverts the results', () => {
      let rejected = false

      const record = {
        id: itemId,
        name: 'Ewe and IPA',
        active: true
      }

      const results = [record]

      const { pageActions, store } = setup(true, results)
      const updateData = { active: false }
      const error = 'server error'
      const update = Promise.reject(error)

      const expectedActions = [{
        type: actionTypes.UPDATE_ALL,
        id: listId,
        data: updateData
      }, {
        type: actionTypes.UPDATING_ALL,
        id: listId
      }, {
        type: actionTypes.RESET_RESULTS,
        id: listId,
        results
      }, {
        type: actionTypes.BULK_ERROR,
        id: listId,
        error
      }]

      store.dispatch(pageActions.updateAllAsync(updateData, update)).then(() => {
        const actions = store.getActions()
        expect(actions).toEqual(expectedActions)
      }).catch(() => {
        rejected = true
      })

      Promise.runAll()
      expect(rejected).toBe(false)
    })
  })
})
