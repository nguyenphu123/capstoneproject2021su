import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import {
  cart,
  emptyCart,
  deleteItem,
  updateItemQuantity
} from '../../features/Cart/CartSlice'
import { Button } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

const mapDispatch = { cart, emptyCart, deleteItem, updateItemQuantity }

function CartItem ({ Id, Name, Quantity, Price, ImageUrl, Color, Size }) {
  const dispatch = useDispatch()
  const CartSlice = useSelector(state => state.CartSlice.cart)
  const [quantity, setQuantity] = useState(Quantity)
  const [currentColor, setCurrentColor] = useState(Color)
  const [product, setProduct] = useState({})
  const [currentSize, setCurrentSize] = useState(Size)
  const [colors, setColors] = useState([])
  const [sizes, setSizes] = useState([])
  const [shopCart, setShopCart] = useState(CartSlice)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (currentColor !== Color) {
      setCurrentColor(currentColor => currentColor)
      const check_index = shopCart.findIndex(item => item.Id === Id)

      if (check_index !== -1) {
        shopCart[check_index].Color = currentColor
        const Description = JSON.stringify(shopCart[check_index].Description)
        Description.Color = currentColor
        toast.success('Cart has been updated')
      }

      dispatch(cart(CartSlice))
    }
  }, [currentColor])
  useEffect(() => {
    if (currentSize !== Size) {
      setCurrentSize(currentSize => currentSize)
      const check_index = shopCart.findIndex(item => item.Id === Id)

      if (check_index !== -1) {
        shopCart[check_index].Size = currentSize
        const Description = JSON.stringify(shopCart[check_index].Description)
        Description.Size = currentSize

        toast.success('Cart has been updated')
      }

      dispatch(cart(CartSlice))
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
    axios({
      method: 'get',
      url: '/api/product-management/productId?productId=' + Id,
      headers: {}
    }).then(res => {
      console.log(res.data)
      setProduct(res.data)
      // setColors([])
      // setSizes([])

      for (let index = 0; index < res.data.Elements.length; index++) {
        const element = res.data.Elements[index]
        colors.push(element.Color)
        sizes.push(element.Size)
      }
      setIsLoading(false)
    })
  }, [])

  function addToCart () {
    setQuantity(quantity => quantity + 1)
  }

  function removeOneFromCart () {
    setQuantity(quantity => quantity - 1)
  }

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
              <Button.Group>
                {colors.map(({ Name, Id }) =>
                  currentColor === Id ? (
                    <Button color={Name} toggle active={true}>
                      {Name}
                    </Button>
                  ) : (
                    <Button
                      color={Name}
                      onClick={value => setCurrentColor(value)}
                      toggle
                      active={false}
                    >
                      >{Name}
                    </Button>
                  )
                )}
              </Button.Group>
            </div>
            <div>
              <br />

              <Button.Group>
                {sizes.map(({ Name, Id }) =>
                  currentSize === Id ? (
                    <Button toggle active={true}>
                      {Name}
                    </Button>
                  ) : (
                    <Button
                      onClick={value => setCurrentSize(value)}
                      toggle
                      active={false}
                    >
                      >{Name}
                    </Button>
                  )
                )}
              </Button.Group>
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
      </>
    )
  }
}
export default CartItem
