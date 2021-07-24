import { createSlice } from '@reduxjs/toolkit'
// Slice

const initialCart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : []

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
      localStorage.setItem('cart', JSON.stringify([]))
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
export const deleteItem = Id => async dispatch => {
  try {
    const cart = JSON.parse(localStorage.getItem('cart'))

    const check_index = cart.findIndex(item => item.ProductId === Id)

    if (check_index !== -1) {
      cart.splice(check_index, 1)
    } else {
    }

    return dispatch(updateCart(cart))
  } catch (e) {
    return console.error(e.message)
  }
}
export const updateItemQuantity = (Id, Quantity) => async dispatch => {
  try {
    console.log(Quantity)

    const cart = JSON.parse(localStorage.getItem('cart'))

    const check_index = cart.findIndex(item => item.ProductId === Id)

    if (check_index !== -1) {
      cart[check_index].Quantity = Quantity
      cart[check_index].TotalLine = Quantity * cart[check_index].CurrentPrice
    } else {
    }

    return dispatch(updateCart(cart))
  } catch (e) {
    return console.error(e.message)
  }
}
export const updateItemColor = (Id, Color) => async dispatch => {
  try {
    const cart = JSON.parse(localStorage.getItem('cart'))

    const check_index = cart.findIndex(item => item.ProductId === Id)

    if (check_index !== -1) {
      cart[check_index].Color = Color
      const Description = JSON.parse(cart[check_index].Description)
      Description.Color = Color
      const Elements = cart[check_index].Elements
      const check_element_index = Elements.findIndex(
        item =>
          item.Color.Id === Color && item.Size.Id === cart[check_index].Size
      )
      if (check_element_index !== -1) {
        cart[check_index].MaxQuantity = Elements[check_element_index].Quantity
      } else {
        cart[check_index].MaxQuantity = 0
      }
    } else {
    }

    return dispatch(updateCart(cart))
  } catch (e) {
    return console.error(e.message)
  }
}

export const updateItemSize = (Id, Size) => async dispatch => {
  try {
    const cart = JSON.parse(localStorage.getItem('cart'))

    const check_index = cart.findIndex(item => item.ProductId === Id)

    if (check_index !== -1) {
      cart[check_index].Size = Size
      const Description = JSON.parse(cart[check_index].Description)
      Description.Size = Size
      const Elements = cart[check_index].Elements
      const check_element_index = Elements.findIndex(
        item =>
          item.Size.Id === Size && item.Color.Id === cart[check_index].Color
      )
      if (check_element_index !== -1) {
        cart[check_index].MaxQuantity = Elements[check_element_index].Quantity
      } else {
        cart[check_index].MaxQuantity = 0
      }
    } else {
    }

    return dispatch(updateCart(cart))
  } catch (e) {
    return console.error(e.message)
  }
}
