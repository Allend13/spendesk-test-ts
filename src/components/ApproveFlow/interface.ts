import { RouteComponentProps } from 'react-router-dom'

import { Team } from '../../store/teams/types'
import { User } from '../../store/users/types'
import { ApproveThreshold } from '../../store/approveFlows/types'

interface ApproveFlowRouterProps {
  teamId: string
}

export interface TeamWithUsersData extends Team {
  usersData: User[]
}

export interface ApproveFlowActions {
  addApproveThreshold: (teamId: string) => void
  updateApproveThreshold: (teamId: string, thresholdId: string, threshold: ApproveThreshold) => void
  removeApproveThreshold: (teamId: string, thresholdId: string) => void
  addApproveUser: (teamId: string, thresholdId: string, userId: string) => void
  removeApproveUser: (teamId: string, thresholdId: string, userId: string) => void
}

export interface ApproveFlowProps
  extends ApproveFlowActions,
    RouteComponentProps<ApproveFlowRouterProps> {
  loading: boolean
  teamsLoaded: boolean
  usersLoaded: boolean
  currentTeam: TeamWithUsersData | null
  approveThresholds: ApproveThreshold[]
  fetchTeams: () => void
  fetchUsers: () => void
}
