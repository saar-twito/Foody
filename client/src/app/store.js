import { configureStore } from '@reduxjs/toolkit';
import foodCategoryReducer from '../features/foodCategory/foodCategorySlice'
import recipeReducer from '../features/recipe/recipeSlice'

export const store = configureStore({
  reducer: {
    foodCategory: foodCategoryReducer,
    recipe: recipeReducer,
  },
});
