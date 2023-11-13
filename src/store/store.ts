import { configureStore } from '@reduxjs/toolkit'
import activitiesSlice from './slice/activitiesSlice'
import commentsSlice from './slice/commentsSlice'
import postsSlice from './slice/postsSlice'
import usersSlice from './slice/usersSlice'

const store = configureStore({
  reducer: {
    users: usersSlice,
    posts: postsSlice,
    activities: activitiesSlice,
    comments: commentsSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
