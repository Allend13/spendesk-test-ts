import { Reducer } from 'redux'
import { TeamsState, TeamsActionTypes } from './types'

export const initialState: TeamsState = {
  data: [],
  errors: undefined,
  loading: false,
  loaded: false
}

const reducer: Reducer<TeamsState> = (state = initialState, action) => {
  switch (action.type) {
    case TeamsActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }
    case TeamsActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, loaded: true, data: action.payload }
    }
    case TeamsActionTypes.FETCH_ERROR: {
      return { ...initialState, errors: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as teamsReducer }
