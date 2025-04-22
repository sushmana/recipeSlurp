import { createSlice } from '@reduxjs/toolkit';
import { RECIPE_LIST, SET_RECIPE_LIST } from 'src/redux/constants';

export const Recipe = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    RECIPE_LIST: (state, action) => {
      const todo = {
        // id: uuid(),
        text: action.payload,
      };
      console.log('action', action)
      state.push(todo);
  },
}
});

// this is for dispatch
export const { getRecipes } = Recipe.actions;

// this is for configureStore
export default Recipe.reducer;