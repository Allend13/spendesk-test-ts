import { Team } from '../../store/teams/types'
import { User } from '../../store/users/types'

export interface TeamsProps {
  teams: Team[]
  users: User[]
  loading: boolean
  teamsLoaded: boolean
  usersLoaded: boolean
  fetchTeams: () => void
  fetchUsers: () => void
}
