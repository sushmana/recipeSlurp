import { all } from 'redux-saga/effects';
import recipeSaga from './recipeSaga';

export default function* rootSaga() {
  yield all([
    recipeSaga()
  ]);
}
