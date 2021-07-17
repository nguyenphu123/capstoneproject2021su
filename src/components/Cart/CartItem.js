import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import DeleteIcon from '@material-ui/icons/Delete'
import RemoveIcon from '@material-ui/icons/Remove'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import { cart, emptyCart } from '../../features/Cart/CartSlice'
import { Button } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'


const mapDispatch = { cart, emptyCart }

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

  useEffect(() => {
    if (quantity !== Quantity) {
      setQuantity(quantity => quantity)
      const check_index = shopCart.findIndex(item => item.Id === Id)

      if (check_index !== -1) {
        shopCart[check_index].Quantity = quantity
        toast.success('Cart has been updated')
      }

      dispatch(cart(CartSlice))
    }
  }, [quantity])
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
    const check_index = shopCart.findIndex(item => item.Id === Id)

    if (CartSlice.length === 1) {
      if (quantity === 0) {
        dispatch(emptyCart())
      } else {
        if (check_index !== -1) {
          shopCart[check_index].Quantity = quantity
          toast.success('Cart has been updated')
        }
      }
    } else {
      if (Quantity === 1) {
        // CartSlice.splice(check_index, 1)
      } else {
        if (check_index !== -1) {
          shopCart[check_index].Quantity = quantity
          toast.success('Cart has been updated')
        }
      }
    }
    dispatch(cart(CartSlice))
  }, [CartSlice])
  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/product-management/productId?productId=' + Id,
      headers: {}
    }).then(res => {
      console.log(res.data)
      setProduct(res.data)

      for (let index = 0; index < res.data.Elements.length; index++) {
        const element = res.data.Elements[index]
        colors.push(element.Color)
        sizes.push(element.Size)
      }
    })
  }, [Id])

  function addToCart () {
    const check_index = CartSlice.findIndex(item => item.Id === Id)
    if (check_index !== -1) {
      CartSlice[check_index].Quantity = CartSlice[check_index].Quantity + 1
      setQuantity(quantity => quantity + 1)

      console.log('Quantity updated:', cart)
    } else {
    }
    NotificationManager.success('Success message', 'Product added to cart')

    // dispatch(cart(CartSlice))
  }
  function removeFromCart () {
    const check_index = CartSlice.findIndex(item => item.Id === Id)
    if (check_index !== -1) {
      CartSlice.splice(check_index, 1)
    } else {
    }
    NotificationManager.success('Success message', 'Product updated to cart')

    // dispatch(cart(CartSlice))
  }
  function removeOneFromCart () {
    const check_index = CartSlice.findIndex(item => item.Id === Id)
    if (check_index !== -1) {
      if (Quantity === 1) {
        setQuantity(quantity => 0)
      } else {
        setQuantity(quantity => quantity - 1)

        CartSlice[check_index].Quantity = CartSlice[check_index].Quantity - 1
      }

      NotificationManager.success('Success message', 'Product Removed to cart')
    } else {
    }
  }

  return (
    <tr class='first last odd'>
      <td class='image hidden-table'>
        <Link to={'/'} title='' class='product-image'>
          <img src={ImageUrl} width='75' alt='' />
        </Link>
      </td>
      <td>
        <h2 class='product-name'>
          <Link to={'/'}>{Name}</Link>
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
