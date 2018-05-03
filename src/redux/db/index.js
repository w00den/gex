import db from 'utils/db'
import { DB_BACKUP, DB_RESTORE } from './actions'

export const backup = () => {
  return (dispatch, getState) => {
    return db.backup().then((data) => {
      dispatch({
        type    : DB_BACKUP,
        payload: {
          data,
          lastAction: 'backup'
        }
      })
    })
  }
}

export const restore = (values) => {
  return (dispatch, getState) => {
    return db.restore(values).then((data) => {
      console.log('reducer', data)
      dispatch({
        type : DB_RESTORE,
        payload: {
          lastAction: 'restore',
          received: data
        }
      })
    })
  }
}

const ACTION_HANDLERS = {
  [DB_BACKUP] : (state, action) => { return { ...state, ...action.payload } },
  [DB_RESTORE] : (state, action) => { return { ...state, ...action.payload } },
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {}

export default function dbReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
