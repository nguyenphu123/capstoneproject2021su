import { Icon, Image, Segment, Form, Input } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { emptyCart } from '../features/Cart/CartSlice'
import CartItem from '../components/Cart/CartItem'
import { Visa, Mastercard, Paypal, AtmMomo, GrabPay } from 'react-pay-icons'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'

const mapDispatch = { emptyCart }

function PaymentConfirm () {
  const dispatch = useDispatch()
  const CartSlice = useSelector(state => state.CartSlice.cart)
  const UserSlice = useSelector(state => state.UserSlice.user)
  const [isLogin, setIsLogin] = useState(true)
  const [currentAddress, setCurrentAddress] = useState('')
  const [isEdit, setIsEdit] = useState(true)
  const [shipOption, setShipOption] = useState('')
  const [paywithPaypal, setPaywithPaypal] = useState(true)
  const [redirectPage, setRedirectPage] = useState('/')
  const [finishBuy, setFinishBuy] = useState(false)

  const useStyles = makeStyles(theme => ({
    appBar: {
      position: 'relative'
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3)
      }
    },
    stepper: {
      padding: theme.spacing(3, 0, 5)
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1)
    }
  }))
  const steps = ['Shipping address', 'Payment details']
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }
  const handleChangePaypal = () => {
    setPaywithPaypal(!paywithPaypal)
  }

  function getStepContent (step) {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <Typography variant='h6' gutterBottom>
              Shipping address
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id='firstName'
                  name='firstName'
                  label='First name'
                  fullWidth
                  autoComplete='given-name'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id='lastName'
                  name='lastName'
                  label='Last name'
                  fullWidth
                  autoComplete='family-name'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id='address1'
                  name='address1'
                  label='Address line 1'
                  fullWidth
                  value={currentAddress}
                  autoComplete='shipping address-line1'
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  id='address2'
                  name='address2'
                  label='Address line 2'
                  fullWidth
                  autoComplete='shipping address-line2'
                />
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id='city'
                  name='city'
                  label='City'
                  fullWidth
                  autoComplete='shipping address-level2'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id='state'
                  name='state'
                  label='State/Province/Region'
                  fullWidth
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id='zip'
                  name='zip'
                  label='Zip / Postal code'
                  fullWidth
                  autoComplete='shipping postal-code'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id='country'
                  name='country'
                  label='Country'
                  fullWidth
                  autoComplete='shipping country'
                />
              </Grid> */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color='secondary'
                      name='saveAddress'
                      value='yes'
                    />
                  }
                  label='Use this address for payment details'
                />
              </Grid>
            </Grid>
          </React.Fragment>
        )

      case 1:
        return (
          <React.Fragment>
            <Typography variant='h6' gutterBottom>
              Payment method
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleChangePaypal}
                      checked={paywithPaypal}
                      color='secondary'
                      name='saveCard'
                      value='yes'
                    />
                  }
                  label='Pay on deliveried'
                />
              </Grid>
              {paywithPaypal ? (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id='cardName'
                      label='Name on card'
                      fullWidth
                      autoComplete='cc-name'
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id='cardNumber'
                      label='Card number'
                      fullWidth
                      autoComplete='cc-number'
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id='expDate'
                      label='Expiry date'
                      fullWidth
                      autoComplete='cc-exp'
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id='cvv'
                      label='CVV'
                      helperText='Last three digits on signature strip'
                      fullWidth
                      autoComplete='cc-csc'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color='secondary'
                          name='saveCard'
                          value='yes'
                        />
                      }
                      label='Remember credit card details for next time'
                    />
                  </Grid>
                </>
              ) : (
                <div></div>
              )}
            </Grid>
          </React.Fragment>
        )

      default:
        throw new Error('Unknown step')
    }
  }

  useEffect(() => {
    setCurrentAddress(UserSlice.Address)
  }, [UserSlice])
  if (finishBuy) {
    return <Redirect to={redirectPage} />
  }

  console.log(CartSlice)
  if (CartSlice !== null) {
    console.log(CartSlice)

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
          Date: new Date()
            .toISOString()
            .slice(0, 19)
            .replace('T', ' '),
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

    if (isLogin) {
      return (
        <div style={{ marginTop: '200px' }}>
          <React.Fragment>
            <CssBaseline />

            <main className={classes.layout}>
              <Paper className={classes.paper}>
                <Typography component='h1' variant='h4' align='center'>
                  Checkout
                </Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                  {steps.map(label => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <React.Fragment>
                  {activeStep === steps.length ? (
                    <React.Fragment>
                      <Typography variant='h5' gutterBottom>
                        Thank you for your order.
                      </Typography>
                      <Typography variant='subtitle1'>
                        Your order number is #2001539. We have emailed your
                        order confirmation, and will send you an update when
                        your order has shipped.
                      </Typography>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {getStepContent(activeStep)}
                      <div className={classes.buttons}>
                        {activeStep !== 0 && (
                          <Button
                            onClick={handleBack}
                            className={classes.button}
                          >
                            Back
                          </Button>
                        )}
                        {activeStep === steps.length - 1 ? (
                          <Button
                            variant='contained'
                            color='primary'
                            onClick={onSubmit}
                            className={classes.button}
                          >
                            Place order
                          </Button>
                        ) : (
                          <Button
                            variant='contained'
                            color='primary'
                            onClick={handleNext}
                            className={classes.button}
                          >
                            Next
                          </Button>
                        )}
                      </div>
                    </React.Fragment>
                  )}
                </React.Fragment>
              </Paper>
            </main>
          </React.Fragment>
        </div>
      )
    }
    return <Redirect to={'/Login'} />
  } else {
    return <Redirect to={'/'} />
  }
}

export default PaymentConfirm
