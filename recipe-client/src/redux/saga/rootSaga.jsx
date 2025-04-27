import { all } from 'redux-saga/effects';
import recipeSaga from './recipeSaga';
import recipeDetailSaga from './recipeDetailSaga';

export default function* rootSaga() {
  yield all([
    recipeSaga(),
    recipeDetailSaga(),
  ]);
}
