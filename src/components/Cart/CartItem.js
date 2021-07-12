import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import DeleteIcon from '@material-ui/icons/Delete'
import RemoveIcon from '@material-ui/icons/Remove'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import { cart, emptyCart } from '../../features/Cart/CartSlice'

const mapDispatch = { cart, emptyCart }

function CartItem ({ Id, Name, Quantity, Price, ImageUrl }) {
  const dispatch = useDispatch()
  const CartSlice = useSelector(state => state.CartSlice.cart)
  const [quantity, setQuantity] = useState(Quantity)
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
    NotificationManager.success('Success message', 'Product updated to cart')

    dispatch(cart(CartSlice))
  }
  function removeOneFromCart () {
    const check_index = CartSlice.findIndex(item => item.Id === Id)
    if (check_index !== -1) {
      if (Quantity === 1) {
        if (CartSlice.length === 1) {
          dispatch(emptyCart())
        } else {
          CartSlice.splice(check_index, 1)
        }
      } else {
        CartSlice[check_index].Quantity = CartSlice[check_index].Quantity - 1
      }

      dispatch(cart(CartSlice))

      NotificationManager.success('Success message', 'Product Removed to cart')
    } else {
    }
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
          <span class='price'>
            <NumberFormat
              value={Price}
              className='foo'
              displayType={'text'}
              thousandSeparator={true}
              prefix={''}
              renderText={(value, props) => (
                <div {...props}>{value},000VND</div>
              )}
            />
          </span>
        </span>
      </td>
      <td class='a-center movewishlist'>
        <div class='pull-left'>
          <div class='custom pull-left'>
            <button
              onClick={removeOneFromCart}
              class='reduced items-count'
              type='button'
            >
              <i class='fa fa-minus'>&nbsp;</i>
            </button>
            <input
              type='text'
              class='input-text qty'
              title='Qty'
              value={quantity}
              maxlength='12'
              id='qty'
              name='qty'
              // onChange={updateNumberPicker}
            />
            <button
              onClick={addToCart}
              class='increase items-count'
              type='button'
            >
              <i class='fa fa-plus'>&nbsp;</i>
            </button>
          </div>
        </div>
      </td>
      <td class='a-right movewishlist'>
        <span class='cart-price'>
          <span class='price'>
            <NumberFormat
              value={Price * Quantity}
              className='foo'
              displayType={'text'}
              thousandSeparator={true}
              prefix={''}
              renderText={(value, props) => (
                <div {...props}>{value},000VND</div>
              )}
            />
          </span>
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
