import { type } from '@testing-library/user-event/dist/type';
import { takeEvery, put, call } from 'redux-saga/effects'
import { getRecipes, setRecipes, getRandomRecipes,getAllRecipes, getAllCategories, setAllCategories } from 'src/redux/slices/recipes';

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

function* getRandomRecipe() {
    try{
        let data = yield call(fetch, `https://www.themealdb.com/api/json/v1/1/random.php`);
        data = yield data.json();
        console.warn("action is called", data)
        if(data.meals.length>1) return;
        yield put({type: setRecipes, data}) 
    }
    catch(e){
        console.error("Error while fetching the recipe data", e);
    }
}

function* getAllRecipe() {
    try{
        let data = yield call(fetch, `https://www.themealdb.com/api/json/v1/1/`)
        data = yield data.json();
    }
    catch(e){
        console.error("Error while fetching the recipe data", e);
    }
}

function* getAllCategory() {
    try{
        let data = yield call(fetch, `https://www.themealdb.com/api/json/v1/1/categories.php`)
        data = yield data.json();
        yield put({type: setAllCategories, data})
    }
    catch(e){
        console.error("Error while fetching the recipe data", e);
    }
}
function* recipeSaga() {
    yield takeEvery(getRecipes.type, getRecipe)
    yield takeEvery(getRandomRecipes.type, getRandomRecipe)
    yield takeEvery(getAllRecipes.type, getAllRecipe)
    yield takeEvery(getAllCategories.type, getAllCategory)
}

export default recipeSaga;