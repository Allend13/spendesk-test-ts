export interface Team {
  id: string
  name: string
  users: string[]
}

export enum TeamsActionTypes {
  FETCH_REQUEST = '@@teams/FETCH_REQUEST',
  FETCH_SUCCESS = '@@teams/FETCH_SUCCESS',
  FETCH_ERROR = '@@teams/FETCH_ERROR'
}

export interface TeamsState {
  readonly loading: boolean
  readonly loaded: boolean
  readonly data: Team[]
  readonly errors?: string
}
