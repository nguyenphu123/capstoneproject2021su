import '../App.css'
import {
  Item,
  Header,
  Button,
  Divider,
  Form,
  Grid,
  Segment
} from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cart } from '../features/Cart/CartSlice'
import CartItem from '../components/Cart/CartItem'
import { Visa, Mastercard, Paypal, AtmMomo, GrabPay } from 'react-pay-icons'
import { Redirect } from 'react-router-dom'

function ShoppingCart () {
  const dispatch = useDispatch()
  const CartSlice = useSelector(state => state.CartSlice.cart)
  const UserSlice = useSelector(state => state.UserSlice.user)
  function onFinish () {
    if (UserSlice !== null) {
      const total = 0 //set a variable that holds our total
      const fullorder = CartSlice
      //reference the element in the "JSON" aka object literal we want

      for (let i = 0; i < fullorder.length; i++) {
        //loop through the array
        total += fullorder[i].CurrentPrice * fullorder[i].Quantity
        //Do the math!
      }

      const order = {
        UserId: UserSlice.Id,
        TotalPrice: total,
        AddressShipping: 'string',
        Date: '2021-06-04T10:16:09.015Z',
        Status: true,
        OrderDetails: CartSlice
      }
    } else {
      return <Redirect to={'/Login'} />
    }
    console.log('ok')

  }
  console.log(CartSlice)
  if (CartSlice !== null) {
    return (
      <div style={{ marginTop: '250px', marginLeft: '300px', width: '1500px' }}>
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
              <Button
                content='Finish'
                icon='cart'
                size='big'
                onClick={onFinish}
              />
            </Grid.Column>
          </Grid>

          <Divider vertical></Divider>
        </Segment>
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
