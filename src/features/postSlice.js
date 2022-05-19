import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk(
    'getPosts',
    async () => {
        const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts')
        return data
    }
)

export const createPost = createAsyncThunk(
    'createPost',
    async (post) => {
        const {data} = await axios.post('https://jsonplaceholder.typicode.com/posts',post)
        return data
    }
)

const postSlice = createSlice({
    name: 'post',
    initialState: {
        value : []
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.fulfilled, (state, {payload}) => {
            state.value = payload
        })
        builder.addCase(createPost.fulfilled, (state, {payload}) => {
            state.value.push(payload)
        })
    }
})

export default postSlice.reducer