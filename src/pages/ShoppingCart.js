import Button from '@material-ui/core/Button'
import React, { useEffect, useState } from 'react'
import { AtmMomo } from 'react-pay-icons'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import CartItem from '../components/Cart/CartItem'
import { cart, emptyCart, deleteItem } from '../features/Cart/CartSlice'
import { v4 as uuidv4 } from 'uuid'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const mapDispatch = { cart, emptyCart, deleteItem }

function ShoppingCart () {
  const dispatch = useDispatch()
  const CartSlice = useSelector(state => state.CartSlice.cart)
  const UserSlice = useSelector(state => state.UserSlice.user)
  const [isLogin, setIsLogin] = useState(true)
  const [currentAddress, setCurrentAddress] = useState('')
  const [isEdit, setIsEdit] = useState(true)
  const [finishBuy, setFinishBuy] = useState(false)
  const [shopCart, setShopCart] = useState(CartSlice)
  const [colors, setColors] = useState([])
  const [sizes, setSizes] = useState([])
  const orderId = uuidv4()
  console.log(orderId)

  const [shipOption, setShipOption] = useState('')
  const [redirectPage, setRedirectPage] = useState('/Login')

  useEffect(() => {
    if (UserSlice !== null) {
      setCurrentAddress(UserSlice.Addres)
    } else {
      setIsLogin(false)
    }
  }, [UserSlice])
  useEffect(() => {}, [CartSlice])

  if (finishBuy) {
    return <Redirect to={redirectPage} />
  }

  if (CartSlice !== null && CartSlice.length !== 0) {
    console.log(CartSlice)
    function setEdit () {
      setIsEdit(!isEdit)
    }
    function handleChange (e, { value }) {
      setShipOption(value)
    }
    function checkOut () {
      if (isLogin) {
        const check_index = CartSlice.findIndex(
          item => item.MaxQuantity < item.Quantity
        )
        if (check_index !== -1) {
          toast.warn(
            "we don't haave enough " + CartSlice[check_index].Name + ' to sell'
          )
        } else {
          setFinishBuy(true)
          setRedirectPage('/PaymentInfo/' + orderId)
        }
      } else {
        toast.warn('Please Login before checkout')
      }
    }
    function removeAll (e) {
      e.preventDefault()
      dispatch(emptyCart())
    }
    function removeFromCart (Id, Color, Size) {
      dispatch(deleteItem(Id, Color, Size))
    }

    return (
      <>
        <div class='page-heading'>
          <div class='container'>
            <div class='row'>
              <div class='col-xs-12'>
                <div class='page-title'>
                  <h2>Shopping Cart</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- BEGIN Main Container --> */}

        <div class='main-container col1-layout wow bounceInUp animated'>
          <div class='main'>
            <div class='cart wow bounceInUp animated'>
              <div class='table-responsive shopping-cart-tbl  container'>
                <form action='' method='post'>
                  <input
                    name='form_key'
                    type='hidden'
                    value='EPYwQxF6xoWcjLUr'
                  />
                  <fieldset>
                    <table
                      id='shopping-cart-table'
                      class='data-table cart-table table-striped'
                    >
                      <colgroup>
                        <col width='1' />
                        <col />
                        <col width='1' />
                        <col width='1' />
                        <col width='1' />
                        <col width='1' />
                        <col width='1' />
                      </colgroup>
                      <thead>
                        <tr class='first last'>
                          <th rowspan='1'>&nbsp;</th>
                          <th rowspan='1'>
                            <span class='nobr'>Product Name</span>
                          </th>
                          <th rowspan='1'></th>
                          <th class='a-center' colspan='1'>
                            <span class='nobr'>Unit Price</span>
                          </th>
                          <th rowspan='1' class='a-center'>
                            Qty
                          </th>
                          <th class='a-center' colspan='1'>
                            Subtotal
                          </th>
                          <th rowspan='1' class='a-center'>
                            &nbsp;
                          </th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr class='first last'>
                          <td colspan='50' class='a-right last'>
                            <button
                              type='button'
                              title='Continue Shopping'
                              class='button btn-continue'
                              onClick=''
                            >
                              <span>
                                <span>
                                  <Link to='/'>Continue Shopping</Link>
                                </span>
                              </span>
                            </button>
                            {/* <button
                              type='submit'
                              name='update_cart_action'
                              value='update_qty'
                              title='Update Cart'
                              class='button btn-update'
                            >
                              <span>
                                <span>Update Cart</span>
                              </span>
                            </button> */}
                            <button
                              name='update_cart_action'
                              title='Clear Cart'
                              class='button btn-empty'
                              onClick={removeAll}
                            >
                              <span>
                                <span>Clear Cart</span>
                              </span>
                            </button>
                          </td>
                        </tr>
                      </tfoot>
                      <tbody>
                        {CartSlice.map(
                          ({
                            ProductId,
                            Name,
                            Quantity,
                            CurrentPrice,
                            img,
                            Color,
                            Size,
                            MaxQuantity,
                            ColorList,
                            SizeList
                          }) => (
                            <tr class='first last odd'>
                              <CartItem
                                Id={ProductId}
                                Name={Name}
                                Quantity={Quantity}
                                Price={CurrentPrice * Quantity}
                                ImageUrl={img}
                                Color={Color}
                                Size={Size}
                                colors={ColorList}
                                sizes={SizeList}
                              />

                              <td class='a-center last'>
                                <Button
                                  onClick={() =>
                                    removeFromCart(ProductId, Color, Size)
                                  }
                                  title='Remove item'
                                  class='button remove-item'
                                >
                                  <span>
                                    <span>Remove item</span>
                                  </span>
                                </Button>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </fieldset>
                </form>
              </div>

              {/* <!-- BEGIN CART COLLATERALS --> */}

              <div class='cart-collaterals container'>
                {/* <!-- BEGIN COL2 SEL COL 1 --> */}
                <div class='row'>
                  {/* <!-- BEGIN TOTALS COL 2 --> */}
                  <div class='col-sm-4'>
                    <div class='shipping'>
                      <h3>We Accept</h3>
                      <div class='shipping-form'>
                        <AtmMomo style={{ margin: 10, width: 100 }} />
                      </div>
                    </div>
                  </div>

                  <div class='col-sm-4'></div>

                  {/* <!--col-sm-4--> */}

                  <div class='col-sm-4'>
                    <div class='totals'>
                      <h3>Shopping Cart Total</h3>
                      <div class='inner'>
                        <table
                          id='shopping-cart-totals-table'
                          class='table shopping-cart-table-total'
                        >
                          <colgroup>
                            <col />
                            <col width='1' />
                          </colgroup>
                          <tfoot>
                            <tr>
                              <td class='a-left' colspan='1'>
                                <strong>Grand Total</strong>
                              </td>
                              <td class='a-right'>
                                <strong>
                                  <span class='price'>
                                    <NumberFormat
                                      value={CartSlice.reduce(
                                        (accumulator, currentValue) =>
                                          accumulator +
                                          currentValue.CurrentPrice *
                                            currentValue.Quantity,
                                        0
                                      )}
                                      className='foo'
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      prefix={''}
                                      renderText={(value, props) => (
                                        <div {...props}>{value}VND</div>
                                      )}
                                    />
                                  </span>
                                </strong>
                              </td>
                            </tr>
                          </tfoot>
                          <tbody>
                            <tr>
                              <td class='a-left' colspan='1'>
                                Subtotal
                              </td>
                              <td class='a-right'>
                                <span class='price'>
                                  <NumberFormat
                                    value={CartSlice.reduce(
                                      (accumulator, currentValue) =>
                                        accumulator +
                                        currentValue.CurrentPrice *
                                          currentValue.Quantity,
                                      0
                                    )}
                                    className='foo'
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={''}
                                    renderText={(value, props) => (
                                      <div {...props}>{value}VND</div>
                                    )}
                                  />
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <ul class='checkout'>
                          <li>
                            <button
                              type='button'
                              title='Proceed to Checkout'
                              class='button btn-proceed-checkout'
                              onClick={checkOut}
                            >
                              <span>Proceed to Checkout</span>
                            </button>
                          </li>
                          <br />
                          <br />
                        </ul>
                      </div>

                      {/* <!--inner--> */}
                    </div>

                    {/* <!--totals--> */}
                  </div>

                  {/* <!--col-sm-4--> */}
                </div>

                {/* <!--cart-collaterals--> */}
              </div>
            </div>

            {/* <!--cart--> */}
          </div>

          {/* <!--main-container--> */}
        </div>

        {/* <!--col1-layout--> */}

        <ToastContainer autoClose={5000} />
      </>
    )
  } else {
    return (
      <div style={{ marginTop: '250px' }}>
        <Header as='h1'>Let buy some clothes</Header>
      </div>
    )
  }
}
export default ShoppingCart
