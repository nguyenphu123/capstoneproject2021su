import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import UserSlice from '../features/User/UserSlice'
import CartSlice from '../features/Cart/CartSlice'
import OrderDataSlice from '../features/OrderData/OrderDataSlice'
import ComparatorSlice from '../features/Comparator/ComparatorSlice'
import ToastSlice from '../features/Toast/ToastSlice'

const reducer = combineReducers({
  // here we will be adding reducers
  UserSlice,
  CartSlice,
  OrderDataSlice,
  ComparatorSlice,
  ToastSlice
})
const store = configureStore({
  reducer
})
export default store
