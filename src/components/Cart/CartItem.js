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
import { Form, Radio, Header } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify'

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
    if (currentColor !== Color) {
      setCurrentColor(currentColor => currentColor)
      dispatch(updateItemColor(Id, currentColor))
      console.log(currentColor)
      toast.success('Cart has been updated')
    }
  }, [currentColor])
  useEffect(() => {
    if (currentSize !== Size) {
      setCurrentSize(currentSize => currentSize)
      dispatch(updateItemSize(Id, currentSize))

      toast.success('Cart has been updated')
    }
  }, [currentSize])
  useEffect(() => {
    if (quantity !== Quantity) {
      setQuantity(quantity => quantity)
      if (quantity === 0) {
        dispatch(deleteItem(Id))
      } else {
        dispatch(updateItemQuantity(Id, quantity))
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
  console.log(currentColor)
  if (isLoading) {
    return <></>
  } else {
    return (
      <>
        <td class='image hidden-table'>
          <Link to={'/Product/' + Id} title='' class='product-image'>
            <img src={ImageUrl} width='75' alt='' />
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
              {sizes.map(
                ({ Name, Id }, index) =>
                  currentSize === Id ? <Header as='h3'>{Name}</Header> : null

                // <Radio
                //   label={Name}
                //   name={'radioGroupSize' + index}
                //   value={Id}
                //   checked={currentSize === Id}
                //   onChange={() => setCurrentSize(Id)}
                // />
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
              <NumberFormat
                value={Price * Quantity}
                className='foo'
                displayType={'text'}
                thousandSeparator={true}
                prefix={''}
                renderText={(value, props) => <div {...props}>{value}VND</div>}
              />
            </span>
          </span>
        </td>
      </>
    )
  }
}
export default CartItem
