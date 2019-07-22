import { Reducer } from 'redux'
import uuid from 'uniqid'
import { ApproveFlowsState, ApproveFlowsActionTypes } from './types'

export const initialState: ApproveFlowsState = {}

const reducer: Reducer<ApproveFlowsState> = (state = initialState, action) => {
  switch (action.type) {
    case ApproveFlowsActionTypes.ADD_APPROVE_THRESHOLD: {
      const { teamId } = action.payload
      const nextState = { ...state }

      if (!nextState[teamId]) nextState[teamId] = []

      const newThreshold = {
        id: uuid(),
        approversIds: [],
        from: 0,
        to: 0
      }

      nextState[teamId].push(newThreshold)

      return nextState
    }

    case ApproveFlowsActionTypes.UPDATE_APPROVE_THRESHOLD: {
      const { teamId, thresholdId, threshold } = action.payload
      const nextState = { ...state }

      nextState[teamId] = nextState[teamId].map(currentThreshhold => {
        if (currentThreshhold.id !== thresholdId) return currentThreshhold

        return { ...currentThreshhold, ...threshold }
      })

      return nextState
    }

    case ApproveFlowsActionTypes.REMOVE_APPROVE_THRESHOLD: {
      const { teamId, thresholdId } = action.payload

      if (!state[teamId]) return state

      return {
        ...state,
        [teamId]: state[teamId].filter(({ id }) => id !== thresholdId)
      }
    }
    default: {
      return state
    }
  }
}

export { reducer as approveFlowsReducer }
