import '../App.css'
import { Item } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cart } from '../features/Cart/CartSlice'
import CartItem from '../components/Cart/CartItem'
function ShoppingCart () {
  const dispatch = useDispatch()
  const CartSlice = useSelector(state => state.CartSlice.cart)

  return (
    <Item.Group relaxed>
      <CartItem />
      <CartItem />
      <CartItem />
    </Item.Group>
  )
}

export default ShoppingCart
