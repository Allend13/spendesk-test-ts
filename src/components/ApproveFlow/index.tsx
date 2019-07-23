import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'

import { fetchRequest as fetchTeamsAction } from '../../store/teams/actions'
import { fetchRequest as fetchUsersAction } from '../../store/users/actions'
import {
  addApproveThreshold as addApproveThresholdAction,
  updateApproveThreshold as updateApproveThresholdAction,
  removeApproveThreshold as removeApproveThresholdAction,
  addApproveUser as addApproveUserAction,
  removeApproveUser as removeApproveUserAction
} from '../../store/approveFlows/actions'
import ApproveFlowForm from './ApproveFlowForm'
import {
  freeToAddUsersSelector,
  currentApproveThresholdsSelector,
  currentTeamWithUserDataSelector
} from './selectors'

import { ApproveFlowProps } from './interface'
import { ApplicationState } from '../../store'

class ApproveFlow extends Component<ApproveFlowProps> {
  componentDidMount() {
    const { fetchTeams, fetchUsers, teamsLoaded, usersLoaded } = this.props
    if (!teamsLoaded) fetchTeams()
    if (!usersLoaded) fetchUsers()
  }

  private renderForm = () => {
    const {
      currentTeam,
      approveThresholds,
      addApproveThreshold,
      updateApproveThreshold,
      removeApproveThreshold,
      addApproveUser,
      removeApproveUser,
      freeToAddUsers
    } = this.props

    if (!currentTeam) return 'No team with this id'

    return (
      <ApproveFlowForm
        currentTeam={currentTeam}
        freeToAddUsers={freeToAddUsers}
        approveThresholds={approveThresholds}
        addApproveThreshold={addApproveThreshold}
        updateApproveThreshold={updateApproveThreshold}
        removeApproveThreshold={removeApproveThreshold}
        addApproveUser={addApproveUser}
        removeApproveUser={removeApproveUser}
      />
    )
  }

  render() {
    const { loading } = this.props

    return (
      <Spin spinning={loading} delay={200}>
        {!loading && this.renderForm()}
      </Spin>
    )
  }
}

export default connect(
  (state: ApplicationState, ownProps: ApproveFlowProps) => ({
    loading: state.teams.loading || state.users.loading,
    teamsLoaded: state.teams.loaded,
    usersLoaded: state.users.loaded,
    currentTeam: currentTeamWithUserDataSelector(state, ownProps),
    approveThresholds: currentApproveThresholdsSelector(state, ownProps),
    freeToAddUsers: freeToAddUsersSelector(state, ownProps)
  }),
  {
    fetchTeams: fetchTeamsAction,
    fetchUsers: fetchUsersAction,
    addApproveThreshold: addApproveThresholdAction,
    updateApproveThreshold: updateApproveThresholdAction,
    removeApproveThreshold: removeApproveThresholdAction,
    addApproveUser: addApproveUserAction,
    removeApproveUser: removeApproveUserAction
  }
)(ApproveFlow)
