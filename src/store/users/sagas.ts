import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { UsersActionTypes } from './types'
import { fetchError, fetchSuccess } from './actions'
import api from '../../api'

function* handleFetch() {
  try {
    const res = yield call(api, '/contents/users')

    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(fetchSuccess(res.data))
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

function* watchFetchRequest() {
  yield takeEvery(UsersActionTypes.FETCH_REQUEST, handleFetch)
}

function* usersSaga() {
  yield all([fork(watchFetchRequest)])
}

export default usersSaga
