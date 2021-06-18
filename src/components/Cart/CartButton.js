import Badge from '@material-ui/core/Badge'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import React from 'react'

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
