import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Avatar, Spin } from 'antd'

import { fetchRequest as fetchTeamsAction } from '../../store/teams/actions'
import { fetchRequest as fetchUsersAction } from '../../store/users/actions'
import { TeamsProps } from './interface'

import css from './style.module.css'
import { ApplicationState } from '../../store'

class Teams extends Component<TeamsProps> {
  componentDidMount() {
    const { fetchTeams, fetchUsers, teamsLoaded, usersLoaded } = this.props
    if (!teamsLoaded) fetchTeams()
    if (!usersLoaded) fetchUsers()
  }

  private renderFirst3Users = (teamUsersIds: string[]) => {
    const { users } = this.props

    return users
      .filter(({ id }) => teamUsersIds.includes(id))
      .splice(0, 3)
      .map(({ id, first_name, last_name }) => (
        <div key={id} className={css.name}>
          <Avatar icon="user" />
          {` ${first_name} ${last_name}`}
        </div>
      ))
  }

  private renderTeams = () => {
    const { teams } = this.props

    return teams.map(({ id, name, users }) => (
      <Card key={id} title={name} className={css.card}>
        {this.renderFirst3Users(users)}
      </Card>
    ))
  }

  render() {
    const { loading } = this.props

    return (
      <Spin spinning={loading}>
        <div className={css.root}>{this.renderTeams()}</div>
      </Spin>
    )
  }
}

export default connect(
  (state: ApplicationState) => ({
    teams: state.teams.data,
    users: state.users.data,
    loading: state.teams.loading || state.users.loading,
    teamsLoaded: state.teams.loaded,
    usersLoaded: state.users.loaded
  }),
  {
    fetchTeams: fetchTeamsAction,
    fetchUsers: fetchUsersAction
  }
)(Teams)
