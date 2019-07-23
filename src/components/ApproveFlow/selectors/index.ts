import { createSelector } from 'reselect'
import { ApplicationState } from '../../../store'
import { User } from '../../../store/users/types'
import { ApproveFlowProps, TeamWithUsersData } from '../interface'

const currentTeamSelector = (state: ApplicationState, props: ApproveFlowProps) => {
  const {
    teams: { data }
  } = state
  const {
    params: { teamId }
  } = props.match

  return data.find(({ id }) => id === teamId)
}
export const currentApproveThresholdsSelector = (
  state: ApplicationState,
  props: ApproveFlowProps
) => {
  const { approveFlows } = state
  const {
    params: { teamId }
  } = props.match

  return approveFlows[teamId] ? [...approveFlows[teamId]] : []
}
const usersSelector = (state: ApplicationState) => state.users.data

export const currentTeamWithUserDataSelector = createSelector(
  [currentTeamSelector, usersSelector],
  (team, users): TeamWithUsersData | null => {
    if (!team) return null

    return {
      ...team,
      usersData: users.filter(({ id }) => team.users.includes(id))
    }
  }
)

const approversIdsSelector = createSelector(
  [currentApproveThresholdsSelector],
  thresholds => {
    const initArray: string[] = []
    return thresholds.reduce((res, { approversIds }) => {
      return [...res, ...approversIds]
    }, initArray)
  }
)

export const freeToAddUsersSelector = createSelector(
  [currentTeamWithUserDataSelector, approversIdsSelector],
  (currentTeam, approversIds): User[] => {
    if (!currentTeam) return []

    return currentTeam.usersData.filter(({ id }) => !approversIds.includes(id))
  }
)
