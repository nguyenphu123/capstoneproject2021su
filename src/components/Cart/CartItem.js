import React, { useState, useEffect } from 'react'
import { Button, Image, Item } from 'semantic-ui-react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import RemoveIcon from '@material-ui/icons/Remove'
import DeleteIcon from '@material-ui/icons/Delete'
import { useSelector, useDispatch } from 'react-redux'
import { cart } from '../../features/Cart/CartSlice'

const mapDispatch = { cart }

function CartItem ({ Id, Name, Quantity, Price, ImageUrl }) {
  const dispatch = useDispatch()
  const CartSlice = useSelector(state => state.CartSlice.cart)
  function addToCart () {
    const check_index = shopCart.findIndex(item => item.Id === Id)
    if (check_index !== -1) {
      shopCart[check_index].Quantity = shopCart[check_index].Quantity + 1

      console.log('Quantity updated:', cart)
    } else {
    }

    dispatch(cart(shopCart))
  }
  function removeFromCart () {
    const check_index = shopCart.findIndex(item => item.Id === Id)
    if (check_index !== -1) {
      shopCart.splice(check_index, 1)
    } else {
    }

    dispatch(cart(shopCart))
  }
  function removeOneFromCart () {
    const check_index = shopCart.findIndex(item => item.Id === Id)
    if (check_index !== -1) {
      shopCart[check_index].Quantity = shopCart[check_index].Quantity - 1
    } else {
    }

    dispatch(cart(shopCart))
  }

  return (
    <div className='row no-gutters py-2'>
      <div className='col-sm-2 p-2'>
        <img
          alt={Name}
          style={{ margin: '0 auto', maxHeight: '50px' }}
          src={ImageUrl}
          className='img-fluid d-block'
        />
      </div>
      <div className='col-sm-4 p-2'>
        <h5 className='mb-1'>{Name}</h5>
        <p className='mb-1'>Price: {Price * Quantity},000vnd </p>
      </div>
      <div className='col-sm-2 p-2 text-center '>
        <p className='mb-0'>Qty: {Quantity}</p>
      </div>
      <div className='col-sm-4 p-2 text-right'>
        <button
          onClick={addToCart}
          className='btn btn-primary btn-sm mr-2 mb-1'
        >
          <AddCircleOutlineIcon width={'20px'} />
        </button>

        {Quantity > 1 && (
          <button
            onClick={removeOneFromCart}
            className='btn btn-danger btn-sm mb-1'
          >
            <RemoveIcon width={'20px'} />
          </button>
        )}

        {Quantity === 1 && (
          <button
            onClick={removeFromCart}
            className='btn btn-danger btn-sm mb-1'
          >
            <DeleteIcon width={'20px'} />
          </button>
        )}
      </div>
    </div>
  )
}

export default CartItem
