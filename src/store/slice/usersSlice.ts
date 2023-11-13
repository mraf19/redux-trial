import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
}

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
}

export interface UsersState {
  users: User[]
  status: 'idle' | 'success' | 'failed'
  error: string | undefined
  selectedUser: string
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: '',
  selectedUser: ''
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectedUser: (state, action) => {
      state.selectedUser = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = 'idle'
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = 'success'
      state.users = action.payload
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = 'failed'
      state.users = []
      state.error = action.error.message
    })
  },
})
export const {selectedUser} = usersSlice.actions
export const selectAllUsers = (state: RootState) => state.users.users

export default usersSlice.reducer

