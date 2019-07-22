export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
}

export enum UsersActionTypes {
  FETCH_REQUEST = '@@users/FETCH_REQUEST',
  FETCH_SUCCESS = '@@users/FETCH_SUCCESS',
  FETCH_ERROR = '@@users/FETCH_ERROR'
}

export interface UsersState {
  readonly loading: boolean
  readonly loaded: boolean
  readonly data: User[]
  readonly errors?: string
}
