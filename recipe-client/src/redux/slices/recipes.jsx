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
    // fetchTasks: state => {
    //   state.loading = true;
    // },
    // fetchTasksSuccess: (state, action) => {
    //   state.loading = false;
    //   state.items = action.payload;
    // },
    // fetchTasksFailure: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
    // addTask: (state, action) => {
    //   state.items.push(action.payload);
    // },
    // deleteTask: (state, action) => {
    //   state.items = state.items.filter(task => task.id !== action.payload);
    // },
}
});

// this is for dispatch
export const { getRecipes, setRecipes, getRecipesDetail, setRecipesDetail } = RecipeSlice.actions;

// this is for configureStore
export default RecipeSlice.reducer;