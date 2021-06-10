import '../App.css'
import {
  Item,
  Header,
  Button,
  Divider,
  Grid,
  Segment,
  Icon
} from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { emptyCart } from '../features/Cart/CartSlice'
import CartItem from '../components/Cart/CartItem'
import { Visa, Mastercard, Paypal, AtmMomo, GrabPay } from 'react-pay-icons'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

const mapDispatch = { emptyCart }

function ShoppingCart () {
  const dispatch = useDispatch()
  const CartSlice = useSelector(state => state.CartSlice.cart)
  const UserSlice = useSelector(state => state.UserSlice.user)
  const [isLogin, setIsLogin] = useState(true)
  const [currentAddress, setCurrentAddress] = useState('')
  const [isEdit, setIsEdit] = useState(true)

  useEffect(() => {
    setCurrentAddress(UserSlice.Addres)
  }, [UserSlice])

  if (CartSlice !== null) {
    function onSubmit () {
      console.log(UserSlice)

      // if (UserSlice !== null) {
      //   //reference the element in the "JSON" aka object literal we want

      //   //loop through the array

      //   const totalPrice = CartSlice.reduce(
      //     (accumulator, currentValue) =>
      //       accumulator + currentValue.CurrentPrice * currentValue.Quantity,
      //     0
      //   )
      //   //Do the math!

      //   const order = {
      //     UserId: UserSlice.Id,
      //     TotalPrice: totalPrice,
      //     AddressShipping: currentAddress,
      //     Date: '2021-06-04T10:16:09.015Z',
      //     Status: true,
      //     OrderDetails: CartSlice
      //   }
      //   axios({
      //     method: 'post',
      //     url: '/api/order-management/users/orders',
      //     headers: { 'content-type': 'application/json' },
      //     data: JSON.stringify(order)
      //   }).then(res => {
      //     dispatch(emptyCart())
      //   })
      // } else {
      //   setIsLogin(false)
      //   console.log(isLogin)
      // }
    }
    function setEdit () {
      setIsEdit(!isEdit)
    }

    if (isLogin) {
      return (
        <div
          style={{ marginTop: '250px', marginLeft: '300px', width: '1500px' }}
        >
          <Segment placeholder>
            <Grid columns={2} relaxed='very' stackable>
              <Grid.Column>
                <Header floated='left' as='h1'>
                  Your Cart
                </Header>

                <Item.Group relaxed divided>
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
                </Item.Group>
              </Grid.Column>

              <Grid.Column verticalAlign='middle'>
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

                <Button  animated as='a' href='/PaymentInfo'>
                  <Button.Content visible>Finish</Button.Content>
                  <Button.Content hidden>
                    <Icon name='shopping bag' />
                  </Button.Content>
                </Button>
              </Grid.Column>
            </Grid>

            <Divider vertical></Divider>
          </Segment>
        </div>
      )
    }
    return <Redirect to={'/Login'} />
  }
  return (
    <div style={{ marginTop: '250px' }}>
      <Header as='h1'>Let buy some clothes</Header>
    </div>
  )
}
export default ShoppingCart
