import db from 'utils/db'
// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
export const COUNTER_LOAD = 'COUNTER_LOAD'
export const COUNTER_SAVE = 'COUNTER_SAVE'
export const COUNTER_CLEAR = 'COUNTER_CLEAR'

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
  return {
    type    : COUNTER_INCREMENT,
    payload : value
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : COUNTER_DOUBLE_ASYNC,
          payload : getState().counter
        })
        resolve()
      }, 200)
    })
  }
}

export const save = (e) => {
  return (dispatch, getState) => {
    // console.log(e.target)
    const value = getState().counter
    return db.save(value).then((data) => {
      dispatch({
        type    : COUNTER_SAVE,
        payload : value
      })
    })
  }
}

export const load = () => {
  return (dispatch, getState) =>
    db.get().then((data) => {
      dispatch({
        type    : COUNTER_LOAD,
        payload : data.value
      })
    })
}

export const clear = () => {
  return (dispatch, getState) => {
    dispatch({
      type    : COUNTER_CLEAR,
      payload : 0
    })
    dispatch({
      type    : COUNTER_SAVE,
      payload : 0
    })
    save(0)
  }
}

export const actions = {
  increment,
  doubleAsync,
  save,
  load,
  clear
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]    : (state, action) => state + action.payload,
  [COUNTER_DOUBLE_ASYNC] : (state, action) => state * 2,
  [COUNTER_LOAD] : (state, action) => action.payload,
  [COUNTER_SAVE] : (state, action) => state,
  [COUNTER_CLEAR] : (state, action) => 0,
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = 0

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
