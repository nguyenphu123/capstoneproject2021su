import React, { useState, useEffect } from 'react'
import { Button, Image, Item } from 'semantic-ui-react'

import { useSelector, useDispatch } from 'react-redux'
import { cart } from '../../features/Cart/CartSlice'
const paragraph = (
  <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
)

function CartItem ({ Id, Name, Quantity, Price, ImageUrl }) {
  const dispatch = useDispatch()
  const CartSlice = useSelector(state => state.CartSlice.cart)

  return (
    <Item style={{ width: '500px' }}>
      <Item.Image size='small' src={ImageUrl} />

      <Item.Content verticalAlign='top'>
        <Item.Header floated='left'>{Name}</Item.Header>
        <Item.Description floated='left'>{Quantity}</Item.Description>
        <Item.Description floated='left'>{Price}</Item.Description>
        <Item.Description></Item.Description>

        <Item.Extra>
          <Button floated='right'>Remove</Button>
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}

export default CartItem
