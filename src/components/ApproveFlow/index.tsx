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

import { Team } from '../../store/teams/types'
import { ApproveFlowProps, TeamWithUsersData } from './interface'

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
      removeApproveUser
    } = this.props

    if (!currentTeam) return 'No team with this id'

    return (
      <ApproveFlowForm
        currentTeam={currentTeam}
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

// Should be memoized with reselect :)
const getCurrentTeam = (state: ApplicationState, teamId: string): TeamWithUsersData | null => {
  const { teams, users } = state
  if (!teams.loaded || !users.loaded) return null

  const currentTeam: Team | undefined = teams.data.find(({ id }) => id === teamId)
  if (!currentTeam) return null

  return {
    ...currentTeam,
    usersData: users.data.filter(({ id }) => currentTeam.users.includes(id))
  }
}

export default connect(
  (state: ApplicationState, { match: { params } }: ApproveFlowProps) => ({
    loading: state.teams.loading || state.users.loading,
    teamsLoaded: state.teams.loaded,
    usersLoaded: state.users.loaded,
    currentTeam: getCurrentTeam(state, params.teamId),
    approveThresholds: state.approveFlows[params.teamId] || []
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
