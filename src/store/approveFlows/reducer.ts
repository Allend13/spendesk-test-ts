import { Reducer } from 'redux'
import uuid from 'uniqid'
import { ApproveFlowsState, ApproveFlowsActionTypes } from './types'

export const initialState: ApproveFlowsState = {}

const reducer: Reducer<ApproveFlowsState> = (state = initialState, action) => {
  switch (action.type) {
    // THRESHOLDS REDUCERS
    case ApproveFlowsActionTypes.ADD_APPROVE_THRESHOLD: {
      const { teamId } = action.payload
      const nextState = { ...state }

      if (!nextState[teamId]) nextState[teamId] = []

      const newThreshold = {
        id: uuid(),
        approversIds: [],
        from: undefined,
        to: undefined
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

      return {
        ...state,
        [teamId]: state[teamId].filter(({ id }) => id !== thresholdId)
      }
    }

    // APPROVERS REDUCERS
    case ApproveFlowsActionTypes.ADD_APPROVE_USER: {
      const { teamId, thresholdId, userId } = action.payload
      const nextState = { ...state }

      nextState[teamId].forEach(({ id, approversIds }) => {
        if (id === thresholdId) approversIds.push(userId)
      })

      return nextState
    }

    case ApproveFlowsActionTypes.REMOVE_APPROVE_USER: {
      const { teamId, thresholdId, userId } = action.payload
      const nextState = { ...state }

      nextState[teamId].forEach(({ id, approversIds }) => {
        if (id === thresholdId) {
          const index = approversIds.indexOf(userId)
          approversIds.splice(index, 1)
        }
      })

      return nextState
    }

    default: {
      return state
    }
  }
}

export { reducer as approveFlowsReducer }
