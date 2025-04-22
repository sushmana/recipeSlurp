// import {createStore} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
// import { cartData } from './reducer'
// import {productData} from './productReducer'
import recipeSaga from '../saga/recipeSaga'
import SearchReducer from '../reducers/recipes';
import createSagaMiddleware from 'redux-saga';

// const store = createStore(rootReducer);
const sagaMiddleware = createSagaMiddleware();
//rootReducer 
const reducer = combineReducers({
    //Add all reducers here
    SearchReducer,
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

sagaMiddleware.run(recipeSaga);

export default store;