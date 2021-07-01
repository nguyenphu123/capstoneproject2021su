import { createSlice } from '@reduxjs/toolkit'
// Slice

const initialCart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : null

const CartSlice = createSlice({
  name: 'CartSlice',
  initialState: {
    cart: initialCart
  },
  reducers: {
    updateCart: (state, action) => {
      state.cart = action.payload
      localStorage.setItem('cart', JSON.stringify(action.payload))
    },
    emptyMyCart: (state, action) => {
      state.cart = null
      localStorage.setItem('cart', JSON.stringify(state.cart))

      localStorage.removeItem('cart')
    }
  }
})
export default CartSlice.reducer
// Actions
const { updateCart, emptyMyCart } = CartSlice.actions
export const cart = cart => async dispatch => {
  try {
    dispatch(updateCart(cart))
  } catch (e) {
    return console.error(e.message)
  }
}
export const emptyCart = () => async dispatch => {
  try {
    return dispatch(emptyMyCart())
  } catch (e) {
    return console.error(e.message)
  }
}
