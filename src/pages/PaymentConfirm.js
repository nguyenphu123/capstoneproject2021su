import React from 'react'
import { Icon, Image, Segment, Step, Form, Button } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { emptyCart } from '../features/Cart/CartSlice'
import CartItem from '../components/Cart/CartItem'
import { Visa, Mastercard, Paypal, AtmMomo, GrabPay } from 'react-pay-icons'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
const mapDispatch = { emptyCart }

function PaymentConfirm () {
  const CartSlice = useSelector(state => state.CartSlice.cart)
  const UserSlice = useSelector(state => state.UserSlice.user)
  const [isLogin, setIsLogin] = useState(true)
  const [currentAddress, setCurrentAddress] = useState('')
  const [isEdit, setIsEdit] = useState(true)
  const [shipOption, setShipOption] = useState('')

  useEffect(() => {
    setCurrentAddress(UserSlice.Addres)
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
      setShipOption()
    }

    if (isLogin) {
      return (
        <div>
          <Step.Group attached='top'>
            <Step>
              <Icon name='truck' />
              <Step.Content>
                <Step.Title>Shipping</Step.Title>
                <Step.Description>
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
                        value='that'
                        checked={shipOption === 'pay with paypal'}
                        onChange={handleChange}
                      />
                    </Form.Field>
                  </Form>
                </Step.Description>
              </Step.Content>
            </Step>

            {shipOption === 'pay with paypal' ? (
              <Step active>
                <Icon name='payment' />
                <Step.Content>
                  <Step.Title>Paypal information</Step.Title>
                  <Step.Description></Step.Description>
                </Step.Content>
              </Step>
            ) : null}

            <Step active>
              <Icon name='info' />
              <Step.Content>
                <Step.Title>Confirm Order</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>

          <Segment attached>
            <Input
              disabled={isEdit}
              defaultValue={currentAddress}
              action={<Button onClick={setEdit()}></Button>}
              actionPosition='right'
            />
            <Button animated onClick={onSubmit}>
              <Button.Content visible>Finish</Button.Content>
              <Button.Content hidden>
                <Icon name='shopping bag' />
              </Button.Content>
            </Button>
          </Segment>
        </div>
      )
    }
    return <Redirect to={'/Login'} />
  }

  return <Redirect to={'/'} />
}

export default PaymentConfirm
