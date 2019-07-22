import { ApproveFlowActions, TeamWithUsersData } from '../interface'
import { ApproveThreshold } from '../../../store/approveFlows/types'

export interface ApproveFlowFormProps extends ApproveFlowActions {
  currentTeam: TeamWithUsersData
  approveThresholds: ApproveThreshold[]
}

export type InputNames = 'from' | 'to' | 'approversIds'
