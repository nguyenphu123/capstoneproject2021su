import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import DeleteIcon from '@material-ui/icons/Delete'
import RemoveIcon from '@material-ui/icons/Remove'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { Link } from 'react-router-dom'

import { cart } from '../../features/Cart/CartSlice'

const mapDispatch = { cart }

function CartItem ({ Id, Name, Quantity, Price, ImageUrl }) {
  const dispatch = useDispatch()
  const CartSlice = useSelector(state => state.CartSlice.cart)
  function addToCart () {
    const check_index = CartSlice.findIndex(item => item.Id === Id)
    if (check_index !== -1) {
      CartSlice[check_index].Quantity = CartSlice[check_index].Quantity + 1

      console.log('Quantity updated:', cart)
    } else {
    }
    NotificationManager.success('Success message', 'Product added to cart')

    dispatch(cart(CartSlice))
  }
  function removeFromCart () {
    const check_index = CartSlice.findIndex(item => item.Id === Id)
    if (check_index !== -1) {
      CartSlice.splice(check_index, 1)
    } else {
    }
    NotificationManager.success('Success message', 'Product added to cart')

    dispatch(cart(CartSlice))
  }
  function removeOneFromCart () {
    const check_index = CartSlice.findIndex(item => item.Id === Id)
    if (check_index !== -1) {
      CartSlice[check_index].Quantity = CartSlice[check_index].Quantity - 1
    } else {
    }
    NotificationManager.success('Success message', 'Product added to cart')

    dispatch(cart(CartSlice))
  }

  return (
    <tr class='first last odd'>
      <td class='image hidden-table'>
        <Link
          to={'/'}
          title='Women&#39;s Georgette Animal Print'
          class='product-image'
        >
          <img
            src={ImageUrl}
            width='75'
            alt='Women&#39;s Georgette Animal Print'
          />
        </Link>
      </td>
      <td>
        <h2 class='product-name'>
          <Link to={'/'}>{Name}</Link>
        </h2>
      </td>
      <td class='a-center hidden-table'>
        <Link href='#' class='edit-bnt' title='Edit item parameters'></Link>
      </td>

      <td class='a-right hidden-table'>
        <span class='cart-price'>
          <span class='price'>{Price},000 vnd</span>
        </span>
      </td>
      <td class='a-center movewishlist'>
        <input
          name='cart[26340][qty]'
          value='1'
          size='4'
          title='Qty'
          class='input-text qty'
          maxlength='12'
        />
      </td>
      <td class='a-right movewishlist'>
        <span class='cart-price'>
          <span class='price'>{Price * Quantity},000 vnd</span>
        </span>
      </td>
      <td class='a-center last'>
        <Link
          onClick={removeFromCart}
          to='#'
          title='Remove item'
          class='button remove-item'
        >
          <span>
            <span>Remove item</span>
          </span>
        </Link>
      </td>
    </tr>

  
  )
}

export default CartItem
