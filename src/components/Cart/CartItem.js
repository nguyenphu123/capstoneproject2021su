import React, { useState, useEffect } from 'react'
import { Button, Image, Item } from 'semantic-ui-react'

import { useSelector, useDispatch } from 'react-redux'
import { cart } from '../../features/Cart/CartSlice'
const paragraph = (
  <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
)

function CartItem () {
  const dispatch = useDispatch()
  const CartSlice = useSelector(state => state.CartSlice.cart)

  return (
    <Item>
      <Item.Image
        size='small'
        src='https://react.semantic-ui.com/images/wireframe/image.png'
      />

      <Item.Content verticalAlign='middle'>
        <Item.Header>Content A</Item.Header>
        <Item.Description>{paragraph}</Item.Description>
        <Item.Extra>
          <Button floated='right'>Action</Button>
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}

export default CartItem
