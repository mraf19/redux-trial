import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

export interface Activity {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface ActivitiesState {
  activities: Activity[]
  status: 'idle' | 'success' | 'failed'
  error: string | undefined
}

const initialState: ActivitiesState = {
  activities: [],
  status: 'idle',
  error: '',
}

export const fetchActivities = createAsyncThunk('posts/fetchActivities', async (userId: string) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)

  return response.data
})

const activitiesSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchActivities.pending, (state) => {
      state.status = 'idle'
    })
    builder.addCase(fetchActivities.fulfilled, (state, action) => {
      state.status = 'success'
      state.activities = action.payload
    })
    builder.addCase(fetchActivities.rejected, (state, action) => {
      state.status = 'failed'
      state.activities = []
      state.error = action.error.message
    })
  },
})

export const selectAllActivities = (state: RootState) => state.activities.activities

export default activitiesSlice.reducer

