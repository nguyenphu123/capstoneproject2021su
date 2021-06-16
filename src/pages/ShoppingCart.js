import '../App.css'
import {
  Item,
  Header,
  Divider,
  Grid,
  Segment,
  Icon,
  Form,
  Checkbox,
  Input
} from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { emptyCart } from '../features/Cart/CartSlice'
import CartItem from '../components/Cart/CartItem'
import { Visa, Mastercard, Paypal, AtmMomo, GrabPay } from 'react-pay-icons'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

const mapDispatch = { emptyCart }

function ShoppingCart () {
  const dispatch = useDispatch()
  const CartSlice = useSelector(state => state.CartSlice.cart)
  const UserSlice = useSelector(state => state.UserSlice.user)
  const [isLogin, setIsLogin] = useState(true)
  const [currentAddress, setCurrentAddress] = useState('')
  const [isEdit, setIsEdit] = useState(true)
  const [finishBuy, setFinishBuy] = useState(false)

  const [shipOption, setShipOption] = useState('')
  const [redirectPage, setRedirectPage] = useState('/Login')

  useEffect(() => {
    if (UserSlice !== null) {
      setCurrentAddress(UserSlice.Addres)
    } else {
      setIsLogin(false)
    }
  }, [UserSlice])

  if (finishBuy) {
    return <Redirect to={redirectPage} />
  }

  if (CartSlice !== null) {
    function onSubmit () {
      console.log(UserSlice)

      if (UserSlice !== null) {
        //reference the element in the "JSON" aka object literal we want

        //loop through the array

        const totalPrice = CartSlice.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.CurrentPrice * currentValue.Quantity,
          0
        )
        //Do the math!

        const order = {
          UserId: UserSlice.Id,
          TotalPrice: totalPrice,
          AddressShipping: currentAddress,
          Date: '2021-06-04T10:16:09.015Z',
          Status: true,
          OrderDetails: CartSlice
        }
        axios({
          method: 'post',
          url: '/api/order-management/users/orders',
          headers: { 'content-type': 'application/json' },
          data: JSON.stringify(order)
        }).then(res => {
          dispatch(emptyCart())
          setFinishBuy(true)
        })
      } else {
        setIsLogin(false)
        console.log(isLogin)
      }
    }
    function setEdit () {
      setIsEdit(!isEdit)
    }
    function handleChange (e, { value }) {
      setShipOption(value)
    }
    function checkOut () {
      setFinishBuy(true)
      if (isLogin) {
        setRedirectPage('/PaymentInfo')
      } else {
      }
    }

    return (
      <div
        style={{ marginTop: '200px' }}
        title='Cart'
        description='This is the Cart page'
      >
        <div>
          <div className='text-center mt-5'>
            <h1>Cart</h1>
            <p>This is the Cart Page.</p>
          </div>

          <div className='row no-gutters justify-content-center'>
            <div className='col-sm-9 p-3'>
              {CartSlice.length > 0 ? (
                <div style={{ marginLeft: '100px' }}>
                  <div>
                    <div className='card card-body border-0'>
                      {CartSlice.map(
                        ({ ProductId, Name, Quantity, CurrentPrice, img }) => (
                          <CartItem
                            Id={ProductId}
                            Name={Name}
                            Quantity={Quantity}
                            Price={CurrentPrice * Quantity}
                            ImageUrl={img}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className='p-3 text-center text-muted'>
                  Your cart is empty
                </div>
              )}

              {/* {checkout && (
                  <div className='p-3 text-center text-success'>
                    <p>Checkout successfull</p>
                    <Link to='/' className='btn btn-outline-success btn-sm'>
                      BUY MORE
                    </Link>
                  </div>
                )} */}
            </div>
            {CartSlice.length > 0 && (
              <div className='col-sm-3 p-3'>
                <div className='card card-body'>
                  <p className='mb-1'>Total Items</p>
                  <h4 className=' mb-3 txt-right'>{CartSlice.length}</h4>
                  <p className='mb-1'>Total Payment</p>
                  <h3 className='m-0 txt-right'>
                    {CartSlice.reduce(
                      (accumulator, currentValue) =>
                        accumulator +
                        currentValue.CurrentPrice * currentValue.Quantity,
                      0
                    )}
                    ,000 VND
                  </h3>
                  We Accept
                  <div class='footer__payment'>
                    <a href='/'>
                      <Visa style={{ width: 50 }} />
                    </a>
                    <a href='/'>
                      <Mastercard style={{ width: 50 }} />
                    </a>
                    <a href='/'>
                      <Paypal style={{ width: 50 }} />
                    </a>
                    <a href='/'>
                      <AtmMomo style={{ width: 50 }} />
                    </a>
                    <a href='/'>
                      <GrabPay style={{ width: 50 }} />
                    </a>
                  </div>
                  <hr className='my-4' />
                  <div className='text-center'>
                    <Button
                      onClick={checkOut}
                      variant='outlined'
                      color='primary'
                      size='medium'
                      // endIcon={<AddShoppingCartIcon />}
                      style={{ width: '45%' }}
                    >
                      Check out
                    </Button>

                    <button
                      type='button'
                      className='btn btn-outlineprimary btn-sm'
                      onClick={dispatch(emptyCart)}
                    >
                      CLEAR
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div style={{ marginTop: '250px' }}>
      <Header as='h1'>Let buy some clothes</Header>
    </div>
  )
}
export default ShoppingCart
