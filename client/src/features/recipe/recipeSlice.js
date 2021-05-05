import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../service/http'


export const getRecipes = createAsyncThunk('recipe/getRecipes',
    async (categoryId) => {
        const response = await http.get(`recipe/foodCategory/${categoryId}`)
        return response.data;
    })


export const handleLike = createAsyncThunk('recipe/handleLike',
    async (recipeId) => {
        const response = await http.post(`recipe/like/${recipeId}`)
        return response.data;
    })


export const chefSlice = createSlice({
    name: 'recipe',
    initialState: {
        recipes: [],
        recipe: {},
        status: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRecipes.fulfilled, (state, action) => {
                state.status = "Succeed"
                state.recipes = action.payload
            })
            .addCase(getRecipes.rejected, (state, action) => {
                state.status = "Failed"
            })
            .addCase(handleLike.fulfilled, (state, action) => {
                state.status = "Succeed"
                const index = state.recipes.findIndex(recipe => recipe._id === action.payload._id)
                state.recipes[index].likes = action.payload.likes
            })
            .addCase(handleLike.rejected, (state, action) => {
                state.status = "Failed"
            })
            // and provide a default case if no other handlers matched
            .addDefaultCase((state, action) => state)
    },
})

// Action creators are generated for each case reducer function
export const { } = chefSlice.actions

export default chefSlice.reducer