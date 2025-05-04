import { createSlice } from '@reduxjs/toolkit';
import recipeDetailSaga from '../saga/recipeDetailSaga';

export const RecipeSlice = createSlice({
  name: 'recipe',
  initialState: {
    recipeData: [],
    isLoading: false,
    error: null,
    recipeDetailData: [],
    isLoadingDetail: false,
    favorites: [],
    allRecipe:[],
    allCategory:[],
    isLoaddingCategory: false,
  },
  reducers: {
    getRecipes: (state, action) => {
      console.log('Triggered getRecipes with payload:', action.payload);
      state.isLoading = true;
      state.recipeData = []; 
    },
    setRecipes: (state, action) => {
        state.recipeData.push(action.data);
        state.isLoading = false;
    },
    getRecipesDetail: (state, action) => {
      console.log('Triggered getRecipesDetail with payload:', action.payload);
      state.isLoadingDetail = true;
      state.recipeDetailData = []; 
    },
    setRecipesDetail: (state, action) => {
        state.recipeDetailData.push(action.data);
        console.log("setRecipesDetail", action.data)
        state.isLoadingDetail = false;
    },
    getRandomRecipes: (state, action) => {
      console.log('Triggered getRandomRecipe with payload:', action.payload);
      state.isLoading = true;
      state.recipeData = []; 
    },
    setFavorites: (state, action) => {
    
      state.favorites.push(action.payload);
    },
    getAllRecipes: (state, action) => {
      console.log('Triggered getAllRecipe with payload:', action.payload);
    },
    getAllCategories: (state, action) => {  
      console.log('Triggered getAllCategory with payload:', action.payload);

    },
    setAllCategories: (state, action) => {
      state.allCategory.push(action.data.categories);
      console.log("setAllCategory", state.allCategory)
    }
}
});

// this is for dispatch
export const { getRecipes, setRecipes, getRecipesDetail, setRecipesDetail, getRandomRecipes,getAllRecipes, getAllCategories, setAllCategories } = RecipeSlice.actions;

// this is for configureStore
export default RecipeSlice.reducer;