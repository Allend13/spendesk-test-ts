import { combineReducers, Dispatch, Action, AnyAction } from 'redux'
import { all, fork } from 'redux-saga/effects'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import teamsSaga from './teams/sagas'
import { TeamsState } from './teams/types'
import { teamsReducer } from './teams/reducer'
import usersSaga from './users/sagas'
import { UsersState } from './users/types'
import { usersReducer } from './users/reducer'
import { ApproveFlowsState } from './approveFlows/types'
import { approveFlowsReducer } from './approveFlows/reducer'

export interface ApplicationState {
  teams: TeamsState
  users: UsersState
  approveFlows: ApproveFlowsState
  router: RouterState
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}

export const createRootReducer = (history: History) =>
  combineReducers({
    teams: teamsReducer,
    users: usersReducer,
    approveFlows: approveFlowsReducer,
    router: connectRouter(history)
  })

export function* rootSaga() {
  yield all([fork(teamsSaga), fork(usersSaga)])
}
