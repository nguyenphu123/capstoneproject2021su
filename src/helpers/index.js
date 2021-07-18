import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import UserSlice from '../features/User/UserSlice'
import CartSlice from '../features/Cart/CartSlice'
import OrderDataSlice from '../features/OrderData/OrderDataSlice'

const reducer = combineReducers({
  // here we will be adding reducers
  UserSlice,
  CartSlice,
  OrderDataSlice
})
const store = configureStore({
  reducer
})
export default store
