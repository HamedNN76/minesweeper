import {all} from 'redux-saga/effects';
import {watcherSaga} from './game/gameSaga';

export function* rootSaga() {
  yield all([watcherSaga()]);
}
