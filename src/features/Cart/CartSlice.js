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
    }
  }
})
export default CartSlice.reducer
// Actions
const { updateCart } = CartSlice.actions
export const cart = cart => async dispatch => {
  try {
    dispatch(updateCart(cart))
  } catch (e) {
    return console.error(e.message)
  }
}
// export const logout = () => async dispatch => {
//   try {
//     return dispatch(logoutSuccess())
//   } catch (e) {
//     return console.error(e.message)
//   }
