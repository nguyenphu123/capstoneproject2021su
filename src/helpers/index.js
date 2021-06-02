import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import UserSlice from '../features/User/UserSlice'

const reducer = combineReducers({
  // here we will be adding reducers
  UserSlice
})
const store = configureStore({
  reducer
})
export default store
