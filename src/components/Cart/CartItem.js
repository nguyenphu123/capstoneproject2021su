import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import {
  cart,
  emptyCart,
  deleteItem,
  updateItemQuantity,
  updateItemColor,
  updateItemSize
} from '../../features/Cart/CartSlice'
import { Header } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify'
import Button from '@material-ui/core/Button'

const mapDispatch = {
  cart,
  emptyCart,
  deleteItem,
  updateItemQuantity,
  updateItemColor,
  updateItemSize
}

function CartItem ({
  Id,
  Name,
  Quantity,
  Price,
  ImageUrl,
  Color,
  Size,
  sizes,
  colors
}) {
  const dispatch = useDispatch()

  const [quantity, setQuantity] = useState(Quantity)
  const [currentColor, setCurrentColor] = useState(Color)

  const [currentSize, setCurrentSize] = useState(Size)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (quantity !== Quantity) {
      setQuantity(quantity => quantity)
      if (quantity === 0) {
        dispatch(deleteItem(Id, Color, Size))
      } else {
        dispatch(updateItemQuantity(Id, quantity, Color, Size))
      }
      console.log(isLoading)
      toast.success('Cart has been updated')
    }
  }, [quantity])

  useEffect(() => {
    setIsLoading(false)
  }, [])

  function addToCart () {
    setQuantity(quantity => quantity + 1)
  }

  function removeOneFromCart () {
    setQuantity(quantity => quantity - 1)
  }
  function removeFromCart () {
    // setLoading(true)

    // let newcart = CartSlice.splice(check_index, 1)
    // setCurrentCart(newcart)
    // currentCart.splice(check_index, 1)
    dispatch(deleteItem(Id, Color, Size))
  }

  if (isLoading) {
    return <></>
  } else {
    return (
      <tr key={Id + Color + Size} class='first last odd'>
        <td class='image hidden-table'>
          <Link to={'/Product/' + Id} title='' class='product-image'>
            {ImageUrl.includes('http') ? (
              <img src={ImageUrl} width='75' alt='' />
            ) : (
              <img src={'http://52.221.232.115:5000/' + ImageUrl} alt='404 ' />
            )}
          </Link>
        </td>
        <td>
          <h2 class='product-name'>
            <Link to={'/Product/' + Id}>{Name}</Link>
          </h2>
        </td>

        <td class='a-center hidden-table'>
          <div>
            <div>
              <Header />

              {colors.map(({ Name, Id }, index) =>
                currentColor === Id ? (
                  <Header as='h3' color={Name}>
                    {Name}
                  </Header>
                ) : null
              )}
            </div>
            <div>
              {sizes.map(({ Name, Id }, index) =>
                currentSize === Id ? <Header as='h3'>{Name}</Header> : null
              )}
            </div>
          </div>
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
                renderText={(value, props) => <div {...props}>{value}VND</div>}
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
              <td class='a-center last'>
                <Button
                  onClick={removeFromCart}
                  title='Remove item'
                  class='button remove-item'
                >
                  <span>
                    <span>Remove item</span>
                  </span>
                </Button>
              </td>

              <ToastContainer autoClose={5000} />
            </span>
          </span>
        </td>
      </tr>
    )
  }
}
export default CartItem
