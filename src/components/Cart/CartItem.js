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
          // onClick={() => increase(product)}
          className='btn btn-primary btn-sm mr-2 mb-1'
        >
          <AddCircleOutlineIcon width={'20px'} />
        </button>

        {Quantity > 1 && (
          <button
            // onClick={() => decrease(product)}
            className='btn btn-danger btn-sm mb-1'
          >
            <RemoveIcon width={'20px'} />
          </button>
        )}

        {Quantity === 1 && (
          <button
            // onClick={() => removeProduct(product)}
            className='btn btn-danger btn-sm mb-1'
          >
            <DeleteIcon width={'20px'} />
          </button>
        )}
      </div>
    </div>

    // <Item style={{ width: '500px' }}>
    //   <Item.Image size='small' src={ImageUrl} />

    //   <Item.Content verticalAlign='top'>
    //     <Item.Header floated='left'>{Name}</Item.Header>
    //     <Item.Description floated='left'>{Quantity}</Item.Description>
    //     <Item.Description floated='left'>{Price}</Item.Description>
    //     <Item.Description></Item.Description>

    //     <Item.Extra>
    //       <Button floated='right'>Remove</Button>
    //     </Item.Extra>
    //   </Item.Content>
    // </Item>
  )
}

export default CartItem
