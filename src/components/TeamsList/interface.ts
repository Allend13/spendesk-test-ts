import { RouteComponentProps } from 'react-router-dom'

import { Team } from '../../store/teams/types'
import { User } from '../../store/users/types'

export interface TeamsProps extends RouteComponentProps {
  teams: Team[]
  users: User[]
  loading: boolean
  teamsLoaded: boolean
  usersLoaded: boolean
  fetchTeams: () => void
  fetchUsers: () => void
}
