import { createSlice } from '@reduxjs/toolkit';

export const RecipeSlice = createSlice({
  name: 'recipe',
  initialState: {
    recipeData: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    getRecipes: (state, action) => {
      console.log('Triggered getRecipes with payload:', action.payload);
      state.isLoading = true;
      state.recipeData = []; // Clear previous data
    },
    setRecipes: (state, action) => {
        state.recipeData.push(action.data);
        state.isLoading = false;
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
export const { getRecipes, setRecipes } = RecipeSlice.actions;

// this is for configureStore
export default RecipeSlice.reducer;