import React from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Badge from '@material-ui/core/Badge'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

function CartButton ({ count }) {
  return (
    <div>
      {count === 0 ? (
        <ShoppingCartIcon />
      ) : (
        <Badge color='secondary' badgeContent={count}>
          <ShoppingCartIcon fontSize='large' />
        </Badge>
      )}
    </div>
  )
}

export default CartButton
