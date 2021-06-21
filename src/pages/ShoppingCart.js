import '../App.css'

import Button from '@material-ui/core/Button'
import React, { useEffect, useState } from 'react'
import { AtmMomo, GrabPay, Mastercard, Paypal, Visa } from 'react-pay-icons'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Header } from 'semantic-ui-react'

import CartItem from '../components/Cart/CartItem'
import { emptyCart } from '../features/Cart/CartSlice'

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
            <h1>Your Cart</h1>
           
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
