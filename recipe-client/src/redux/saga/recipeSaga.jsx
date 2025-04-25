import { type } from '@testing-library/user-event/dist/type';
import { takeEvery, put, call } from 'redux-saga/effects'
import { getRecipes, setRecipes } from 'src/redux/slices/recipes';

function* getRecipe(action) {
try{
    const searchTerm = action.payload;
    console.log('searchTerm', searchTerm)
    let data = yield call(fetch, `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    data = yield data.json();
    console.warn("action is called", data)
    yield put({type: setRecipes, data}) //setRecipes(data.meals || [])
    
}
catch(e){
    console.error("Error while fetching the recipe data", e);
}
}

function* recipeSaga() {
    yield takeEvery(getRecipes.type, getRecipe)
}

export default recipeSaga;