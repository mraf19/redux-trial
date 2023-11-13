import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface PostsState {
  posts: Post[]
  status: 'idle' | 'success' | 'failed'
  error: string | undefined
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: '',
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (userId: string) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
  return response.data
})

export const createPost = createAsyncThunk('posts/createPost', async (post: Post) => {
  const response = await axios.post(`https://jsonplaceholder.typicode.com/posts`, post)
  return response.data
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = 'idle'
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'success'
      state.posts = action.payload
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'failed'
      state.posts = []
      state.error = action.error.message
    })

    builder.addCase(createPost.fulfilled, () => {
      alert('Post created successfully')
    })
    builder.addCase(createPost.rejected, (action) => {
      alert(action.error)
    })
  },
})

export const selectAllPosts = (state: RootState) => state.posts.posts

export default postsSlice.reducer

