import { type } from '@testing-library/user-event/dist/type';
import { takeEvery, put, call } from 'redux-saga/effects'
import { getRecipesDetail, setRecipesDetail } from 'src/redux/slices/recipes';

function* getRecipeDetail(action) {
try{
    const mealId = action.payload.id;
    console.log('searchTerm', mealId)
    let data = yield call(fetch, `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    data = yield data.json();
    console.warn("action detail is called", data)
    yield put(setRecipesDetail(data)) //setRecipes(data.meals || [])
    
}
catch(e){
    console.error("Error while fetching the recipe data", e);
}
}

function* recipeDetailSaga() {
    yield takeEvery(getRecipesDetail.type, getRecipeDetail)
}

export default recipeDetailSaga;