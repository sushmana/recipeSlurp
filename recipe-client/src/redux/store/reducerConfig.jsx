// import {createStore} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import rootSaga from '../saga/rootSaga'
import recipeReducer from '../slices/recipes';
import createSagaMiddleware from 'redux-saga';

// const store = createStore(rootReducer);
const sagaMiddleware = createSagaMiddleware();
//rootReducer 
const reducer = combineReducers({
    //Add all reducers here
     recipeReducer,
    // cartData,
    // productData
});
const store  = configureStore({
    reducer:reducer,
    middleware:()=>[sagaMiddleware],
    // devTools​?
    // preloadedState​?
    // enhancers​?
});

sagaMiddleware.run(rootSaga);

const action = type => store.dispatch({type});
export default store;