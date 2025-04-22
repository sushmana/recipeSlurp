import { takeEvery, put } from 'redux-saga/effects'
import { RECIPE_LIST, SET_RECIPE_LIST } from 'src/redux/constants';

function* getRecipe() {
    let data = yield fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');
    data = yield data.json();
    console.warn("action is called", data)
    yield put({type: SET_RECIPE_LIST, data})
}

function* recipeSaga() {
    yield takeEvery(RECIPE_LIST, getRecipe)
}

export default recipeSaga;