import { Reducer } from 'redux'
import { UsersState, UsersActionTypes } from './types'

export const initialState: UsersState = {
  data: [],
  errors: undefined,
  loading: false,
  loaded: false
}

const reducer: Reducer<UsersState> = (state = initialState, action) => {
  switch (action.type) {
    case UsersActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }
    case UsersActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, loaded: true, data: action.payload }
    }
    case UsersActionTypes.FETCH_ERROR: {
      return { ...initialState, errors: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as usersReducer }
