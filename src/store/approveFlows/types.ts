export interface ApproveThreshold {
  // locally generated unique id
  id: string
  // users ids that are approvers
  approversIds: string[]
  // threshold minimum in USD
  from: number
  // threshold maximum in USD
  to: number
}

export enum ApproveFlowsActionTypes {
  ADD_APPROVE_THRESHOLD = '@@approveFlows/ADD_APPROVE_THRESHOLD',
  UPDATE_APPROVE_THRESHOLD = '@@approveFlows/UPDATE_APPROVE_THRESHOLD ',
  REMOVE_APPROVE_THRESHOLD = '@@approveFlows/REMOVE_APPROVE_THRESHOLD'
}

export interface ApproveFlowsState {
  // list of approve flows with team id as key
  [key: string]: ApproveThreshold[]
}
