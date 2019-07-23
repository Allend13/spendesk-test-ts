import { ApproveFlowActions, TeamWithUsersData } from '../interface'
import { ApproveThreshold } from '../../../store/approveFlows/types'
import { User } from '../../../store/users/types'

export interface ApproveFlowFormProps extends ApproveFlowActions {
  freeToAddUsers: User[]
  currentTeam: TeamWithUsersData
  approveThresholds: ApproveThreshold[]
}

export type InputNames = 'from' | 'to' | 'approversIds'
