import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../service/http'


export const getFoodCategories = createAsyncThunk('foodCategory/getFoodCategories',
    async () => {
        const response = await http.get('foodCategory')
        return response.data;
    })


export const chefSlice = createSlice({
    name: 'foodCategory',
    initialState: {
        foodCategories: [],
        categorySelection: {},
        status: null
    },
    reducers: {
        select: (state, action) => {
            state.categorySelection = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFoodCategories.pending, (state, action) => {
                state.status = "Loading"
            })
            .addCase(getFoodCategories.fulfilled, (state, action) => {
                state.status = "Succeed"
                state.foodCategories = action.payload
            })
            .addCase(getFoodCategories.rejected, (state, action) => {
                state.status = "Failed"
            })
            // and provide a default case if no other handlers matched
            .addDefaultCase((state, action) => state)
    },
})

// Action creators are generated for each case reducer function
export const { select } = chefSlice.actions

export default chefSlice.reducer