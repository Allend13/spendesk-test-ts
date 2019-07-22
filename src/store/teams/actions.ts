import { action } from 'typesafe-actions'
import { TeamsActionTypes, Team } from './types'

export const fetchRequest = () => action(TeamsActionTypes.FETCH_REQUEST)

export const fetchSuccess = (data: Team[]) => action(TeamsActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(TeamsActionTypes.FETCH_ERROR, message)
