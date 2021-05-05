import { createSlice } from '@reduxjs/toolkit'
import http from '../../service/http'


export const login = createAsyncThunk('chef/login',
    async () => {
        const response = await http.get('posts')
        return response.data;
    })


export const chefSlice = createSlice({
    name: 'chef',
    initialState: {
        name: '',
        email: '',
        password: '',
        status: '',
        about: '',
    },
    reducers: {
    },
    extraReducers: {
        [getPosts.pending]: (state, action) => {
            state.status = "Loading"
        },
        [getPosts.fulfilled]: (state, { payload }) => {
            state.status = "Succeed"
            state.posts = payload
        },
        [getPosts.rejected]: (state, action) => {
            state.status = "failed"
        }
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = chefSlice.actions

export default chefSlice.reducer