import { createSlice } from '@reduxjs/toolkit'
// Slice
import axios from 'axios'

const initialOrder = localStorage.getItem('order')
  ? JSON.parse(localStorage.getItem('order'))
  : null

const OrderSlice = createSlice({
  name: 'OrderSlice',
  initialState: {
    order: initialOrder
  },
  reducers: {
    newOrder: (state, action) => {
      state.order = action.payload
      localStorage.setItem('order', JSON.stringify(action.payload))
    },
    deleteNewOrder: (state, action) => {
      state.order = null

      localStorage.removeItem('order')
    }
  }
})
export default OrderSlice.reducer
// Actions
const { newOrder, deleteNewOrder } = OrderSlice.actions
export const createOrder = order => async dispatch => {
  try {
    return dispatch(newOrder(order))
  } catch (e) {
    return console.error(e.message)
  }
}
export const removeOrder = () => async dispatch => {
  try {
    return dispatch(deleteNewOrder())
  } catch (e) {
    return console.error(e.message)
  }
}
