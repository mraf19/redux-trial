import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

export interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export interface CommentsState {
  comments: Comment[]
  status: 'idle' | 'success' | 'failed'
  error: string | undefined
}

const initialState: CommentsState = {
  comments: [],
  status: 'idle',
  error: '',
}

export const fetchComments = createAsyncThunk('comments/fetchComments', async (postId: string) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/post/${postId}/comments`)
  return response.data
})

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.status = 'idle'
    })
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.status = 'success'
      state.comments = action.payload
    })
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.status = 'failed'
      state.comments = []
      state.error = action.error.message
    })
  },
})

export const selectAllComments = (state: RootState) => state.comments.comments

export default commentsSlice.reducer

