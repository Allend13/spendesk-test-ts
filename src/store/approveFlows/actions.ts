import { action } from 'typesafe-actions'
import { ApproveFlowsActionTypes, ApproveThreshold } from './types'

export const addApproveThreshold = (teamId: string) =>
  action(ApproveFlowsActionTypes.ADD_APPROVE_THRESHOLD, {
    teamId
  })

export const updateApproveThreshold = (
  teamId: string,
  thresholdId: string,
  threshold: ApproveThreshold
) =>
  action(ApproveFlowsActionTypes.UPDATE_APPROVE_THRESHOLD, {
    teamId,
    thresholdId,
    threshold
  })

export const removeApproveThreshold = (teamId: string, thresholdId: string) =>
  action(ApproveFlowsActionTypes.REMOVE_APPROVE_THRESHOLD, {
    teamId,
    thresholdId
  })
