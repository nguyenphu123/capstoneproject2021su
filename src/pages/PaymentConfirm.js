import {
  Icon,
  Image,
  Segment,
  Form,
  Button,
  Checkbox,
  Input,
  Grid
} from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { emptyCart } from '../features/Cart/CartSlice'
import CartItem from '../components/Cart/CartItem'
import { Visa, Mastercard, Paypal, AtmMomo, GrabPay } from 'react-pay-icons'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
const mapDispatch = { emptyCart }

function PaymentConfirm () {
  const dispatch = useDispatch()
  const CartSlice = useSelector(state => state.CartSlice.cart)
  const UserSlice = useSelector(state => state.UserSlice.user)
  const [isLogin, setIsLogin] = useState(true)
  const [currentAddress, setCurrentAddress] = useState('')
  const [isEdit, setIsEdit] = useState(true)
  const [shipOption, setShipOption] = useState('')

  useEffect(() => {
    setCurrentAddress(UserSlice.Address)
  }, [UserSlice])

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
          Date: new Date() + '',
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

    if (isLogin) {
      return (
        <Grid
          textAlign='center'
          style={{ height: '100vh' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            Choose your shipping options
            <Form>
              <Form.Field>
                <Checkbox
                  radio
                  label='pay on delivery'
                  name='checkboxRadioGroup'
                  value='pay on delivery'
                  checked={shipOption === 'pay on delivery'}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='pay with paypal'
                  name='checkboxRadioGroup'
                  value='pay with paypal'
                  checked={shipOption === 'pay with paypal'}
                  onChange={handleChange}
                />
              </Form.Field>
            </Form>
            {shipOption === 'pay with paypal' ? (
              <Form size='large'>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='E-mail address'
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                  />

                  <Button color='pink' fluid size='large'>
                    Done
                  </Button>
                </Segment>
              </Form>
            ) : null}
            <Input
              disabled={isEdit}
              defaultValue={currentAddress}
              action={<Button onClick={setEdit}>Edit</Button>}
              actionPosition='right'
            />
            <br />
            <Button animated onClick={onSubmit}>
              <Button.Content visible>Finish</Button.Content>
              <Button.Content hidden>
                <Icon name='shopping bag' />
              </Button.Content>
            </Button>
          </Grid.Column>
        </Grid>
      )
    }
    return <Redirect to={'/Login'} />
  }

  return <Redirect to={'/'} />
}

export default PaymentConfirm
