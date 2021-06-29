import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Stepper from '@material-ui/core/Stepper'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'react-notifications/lib/notifications.css'
import { NotificationContainer, NotificationManager } from 'react-notifications'

import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { emptyCart } from '../features/Cart/CartSlice'

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
                  onChange={value => {
                    setCurrentAddress(value)
                  }}
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
  useEffect(() => {
    NotificationManager.success(
      'Success message',
      'We have reiceived your order'
    )
  }, [finishBuy])

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
        <>
          <div class='page-heading'>
            <div class='container'>
              <div class='row'>
                <div class='col-xs-12'>
                  <div class='page-title'>
                    <h2>Checkout</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- BEGIN Main Container col2-right --> */}
          <div class='main-container col2-right-layout'>
            <div class='main container'>
              <div class='row'>
                <section
                  class='col-main col-sm-9'
                  style={{ visibility: 'visible' }}
                >
                  <ol class='one-page-checkout' id='checkoutSteps'>
                    <li id='opc-login' class='section allow active'>
                      <div class='step-title'>
                        {' '}
                        <span class='number'>1</span>
                        <h3 class='one_page_heading'> Checkout Method</h3>
                      </div>
                    </li>
                    <li id='opc-billing' class='section'>
                      <div class='step-title'>
                        {' '}
                        <span class='number'>2</span>
                        <h3 class='one_page_heading'> Billing Information</h3>
                      </div>
                      <div
                        id='checkout-step-billing'
                        class='step a-item'
                        style={{ display: 'none' }}
                      >
                        <form id='co-billing-form' action=''>
                          <fieldset class='group-select'>
                            <ul class=''>
                              <li id='billing-new-address-form'>
                                <fieldset>
                                  <input
                                    type='hidden'
                                    name='billing[address_id]'
                                    value=''
                                    id='billing:address_id'
                                  />
                                  <ul>
                                    <li class='fields'>
                                      <div class='customer-name'>
                                        <div class='input-box name-firstname'>
                                          <label for='billing:firstname'>
                                            First Name
                                            <span class='required'>*</span>
                                          </label>
                                          <div class='input-box1'>
                                            <input
                                              type='text'
                                              id='billing:firstname'
                                              name='billing[firstname]'
                                              value=''
                                              title='First Name'
                                              maxlength='255'
                                              class='input-text required-entry'
                                            />
                                          </div>
                                        </div>
                                        <div class='input-box name-lastname'>
                                          <label for='billing:lastname'>
                                            Last Name
                                            <span class='required'>*</span>
                                          </label>
                                          <div class='input-box1'>
                                            <input
                                              type='text'
                                              id='billing:lastname'
                                              name='billing[lastname]'
                                              value=''
                                              title='Last Name'
                                              maxlength='255'
                                              class='input-text required-entry'
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                    <li class='fields'>
                                      <div class='input-box'>
                                        <label for='billing:company'>
                                          Company
                                        </label>
                                        <input
                                          type='text'
                                          id='billing:company'
                                          name='billing[company]'
                                          value=''
                                          title='Company'
                                          class='input-text '
                                        />
                                      </div>
                                      <div class='input-box'>
                                        <label for='billing:email'>
                                          Email Address
                                          <em class='required'>*</em>
                                        </label>
                                        <input
                                          type='text'
                                          name='billing[email]'
                                          id='billing:email'
                                          value=''
                                          title='Email Address'
                                          class='input-text validate-email required-entry'
                                        />
                                      </div>
                                    </li>
                                    <li class='wide'>
                                      <label for='billing:street1'>
                                        Address<em class='required'>*</em>
                                      </label>
                                      <br />
                                      <input
                                        type='text'
                                        title='Street Address'
                                        name='billing[street][]'
                                        id='billing:street1'
                                        value=''
                                        class='input-text  required-entry'
                                      />
                                    </li>
                                    <li class='wide'>
                                      <input
                                        type='text'
                                        title='Street Address 2'
                                        name='billing[street][]'
                                        id='billing:street2'
                                        value=''
                                        class='input-text '
                                      />
                                    </li>
                                    <li class='fields'>
                                      <div class='input-box'>
                                        <label for='billing:city'>
                                          City<em class='required'>*</em>
                                        </label>
                                        <input
                                          type='text'
                                          title='City'
                                          name='billing[city]'
                                          value=''
                                          class='input-text  required-entry'
                                          id='billing:city'
                                        />
                                      </div>
                                    </li>
                                    <li class='fields'>
                                      <div class='input-box'>
                                        <label for='billing:postcode'>
                                          Zip/Postal Code
                                          <em class='required'>*</em>
                                        </label>
                                        <input
                                          type='text'
                                          title='Zip/Postal Code'
                                          name='billing[postcode]'
                                          id='billing:postcode'
                                          value=''
                                          class='input-text validate-zip-international  required-entry'
                                        />
                                      </div>
                                      <div class='input-box'>
                                        <label for='billing:country_id'>
                                          Country<em class='required'>*</em>
                                        </label>
                                      </div>
                                    </li>
                                    <li class='fields'>
                                      <div class='input-box'>
                                        <label for='billing:telephone'>
                                          Telephone<em class='required'>*</em>
                                        </label>
                                        <input
                                          type='text'
                                          name='billing[telephone]'
                                          value=''
                                          title='Telephone'
                                          class='input-text  required-entry'
                                          id='billing:telephone'
                                        />
                                      </div>
                                      <div class='input-box'>
                                        <label for='billing:fax'>Fax</label>
                                        <input
                                          type='text'
                                          name='billing[fax]'
                                          value=''
                                          title='Fax'
                                          class='input-text '
                                          id='billing:fax'
                                        />
                                      </div>
                                    </li>
                                    <li
                                      class='fields'
                                      id='register-customer-password'
                                    >
                                      <div class='input-box'>
                                        <label for='billing:customer_password'>
                                          Password<em class='required'>*</em>
                                        </label>
                                        <input
                                          type='password'
                                          name='billing[customer_password]'
                                          id='billing:customer_password'
                                          title='Password'
                                          class='input-text required-entry validate-password'
                                        />
                                      </div>
                                      <div class='input-box'>
                                        <label for='billing:confirm_password'>
                                          Confirm Password
                                          <em class='required'>*</em>
                                        </label>
                                        <input
                                          type='password'
                                          name='billing[confirm_password]'
                                          title='Confirm Password'
                                          id='billing:confirm_password'
                                          class='input-text required-entry validate-cpassword'
                                        />
                                      </div>
                                    </li>
                                    <li class='no-display'>
                                      <input
                                        type='hidden'
                                        name='billing[save_in_address_book]'
                                        value='1'
                                      />
                                    </li>
                                  </ul>
                                  <div class='remember-me-popup'>
                                    <div
                                      class='remember-me-popup-head'
                                      style={{ display: 'none' }}
                                    >
                                      <h3 id='text2'>What's this?</h3>
                                      <a
                                        href='#'
                                        class='remember-me-popup-close'
                                        onClick='showDiv()'
                                        title='Close'
                                      >
                                        Close
                                      </a>{' '}
                                    </div>
                                    <div
                                      class='remember-me-popup-body'
                                      style={{ display: 'none' }}
                                    >
                                      <p id='text1'>
                                        Checking "Remember Me" will let you
                                        access your shopping cart on this
                                        computer when you are logged out
                                      </p>
                                      <div class='remember-me-popup-close-button a-right'>
                                        {' '}
                                        <a
                                          href='#'
                                          class='remember-me-popup-close button'
                                          title='Close'
                                          onClick='
            showDiv()'
                                        >
                                          <span>Close</span>
                                        </a>{' '}
                                      </div>
                                    </div>
                                  </div>
                                </fieldset>
                              </li>
                              <li class=''>
                                <input
                                  type='radio'
                                  name='billing[use_for_shipping]'
                                  id='billing:use_for_shipping_yes'
                                  value='1'
                                  checked='checked'
                                  title='Ship to this address'
                                  onClick='$(&#39;shipping:same_as_billing&#39;).checked = true;'
                                  class='radio'
                                />
                                <label for='billing:use_for_shipping_yes'>
                                  Ship to this address
                                </label>
                                <input
                                  type='radio'
                                  name='billing[use_for_shipping]'
                                  id='billing:use_for_shipping_no'
                                  value='0'
                                  title='Ship to different address'
                                  onClick='$(&#39;shipping:same_as_billing&#39;).checked = false;'
                                  class='radio'
                                />
                                <label for='billing:use_for_shipping_no'>
                                  Ship to different address
                                </label>
                              </li>
                            </ul>
                            <div
                              class='buttons-set'
                              id='billing-buttons-container'
                            >
                              <p class='required'>* Required Fields</p>
                              <button
                                type='button'
                                title='Continue'
                                class='button continue'
                                onClick='billing.save()'
                              >
                                <span>Continue</span>
                              </button>
                              <span
                                class='please-wait'
                                id='billing-please-wait'
                                style={{ display: 'none' }}
                              >
                                {' '}
                                <img
                                  src='images/opc-ajax-loader.gif'
                                  alt='Loading next step...'
                                  title='Loading next step...'
                                  class='v-middle'
                                />{' '}
                                Loading next step...{' '}
                              </span>{' '}
                            </div>
                          </fieldset>
                        </form>
                      </div>
                    </li>
                    <li id='opc-shipping' class='section'>
                      <div class='step-title'>
                        {' '}
                        <span class='number'>3</span>
                        <h3 class='one_page_heading'> Shipping Information</h3>
                      </div>
                      <div
                        id='checkout-step-shipping'
                        class='step a-item'
                        style={{ display: 'none' }}
                      >
                        <form action='' id='co-shipping-form'>
                          <ul class=''>
                            <li id='shipping-new-address-form'>
                              <fieldset class='group-select'>
                                <input
                                  type='hidden'
                                  name='shipping[address_id]'
                                  value=''
                                  id='shipping:address_id'
                                />
                                <ul>
                                  <li class='fields'>
                                    <div class='customer-name'>
                                      <div class='input-box name-firstname'>
                                        <label for='shipping:firstname'>
                                          First Name
                                          <span class='required'>*</span>
                                        </label>
                                        <div class='input-box1'>
                                          <input
                                            type='text'
                                            id='shipping:firstname'
                                            name='shipping[firstname]'
                                            value=''
                                            title='First Name'
                                            maxlength='255'
                                            class='input-text required-entry'
                                            onChange='shipping.setSameAsBilling(false)'
                                          />
                                        </div>
                                      </div>
                                      <div class='input-box name-lastname'>
                                        <label for='shipping:lastname'>
                                          Last Name
                                          <span class='required'>*</span>
                                        </label>
                                        <div class='input-box1'>
                                          <input
                                            type='text'
                                            id='shipping:lastname'
                                            name='shipping[lastname]'
                                            value=''
                                            title='Last Name'
                                            maxlength='255'
                                            class='input-text required-entry'
                                            onChange='shipping.setSameAsBilling(false)'
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li class='fields'>
                                    <div class='input-box'>
                                      <label for='shipping:company'>
                                        Company
                                      </label>
                                      <input
                                        type='text'
                                        id='shipping:company'
                                        name='shipping[company]'
                                        value=''
                                        title='Company'
                                        class='input-text '
                                        onChange='shipping.setSameAsBilling(false);'
                                      />
                                    </div>
                                  </li>
                                  <li class='wide'>
                                    <label for='shipping:street1'>
                                      Address<em class='required'>*</em>
                                    </label>
                                    <br />
                                    <input
                                      type='text'
                                      title='Street Address'
                                      name='shipping[street][]'
                                      id='shipping:street1'
                                      value=''
                                      class='input-text  required-entry'
                                      onChange='shipping.setSameAsBilling(false);'
                                    />
                                  </li>
                                  <li class='wide'>
                                    <input
                                      type='text'
                                      title='Street Address 2'
                                      name='shipping[street][]'
                                      id='shipping:street2'
                                      value=''
                                      class='input-text '
                                      onChange='shipping.setSameAsBilling(false);'
                                    />
                                  </li>
                                  <li class='fields'>
                                    <div class='input-box'>
                                      <label for='shipping:city'>
                                        City<em class='required'>*</em>
                                      </label>
                                      <input
                                        type='text'
                                        title='City'
                                        name='shipping[city]'
                                        value=''
                                        class='input-text  required-entry'
                                        id='shipping:city'
                                        onChange='shipping.setSameAsBilling(false);'
                                      />
                                    </div>
                                    <div class='input-box'>
                                      <label for='shipping:region'>
                                        State/Province
                                      </label>

                                      <input
                                        type='text'
                                        id='shipping:region'
                                        name='shipping[region]'
                                        value=''
                                        title='State/Province'
                                        class='input-text required-entry'
                                        style={{ display: 'none' }}
                                      />
                                    </div>
                                  </li>
                                  <li class='fields'>
                                    <div class='input-box'>
                                      <label for='shipping:postcode'>
                                        Zip/Postal Code
                                        <em class='required'>*</em>
                                      </label>
                                      <input
                                        type='text'
                                        title='Zip/Postal Code'
                                        name='shipping[postcode]'
                                        id='shipping:postcode'
                                        value=''
                                        class='input-text validate-zip-international  required-entry'
                                        onChange='shipping.setSameAsBilling(false);'
                                      />
                                    </div>
                                    <div class='input-box'>
                                      <label for='shipping:country_id'>
                                        Country<em class='required'>*</em>
                                      </label>
                                    </div>
                                  </li>
                                  <li class='fields'>
                                    <div class='input-box'>
                                      <label for='shipping:telephone'>
                                        Telephone<em class='required'>*</em>
                                      </label>
                                      <input
                                        type='text'
                                        name='shipping[telephone]'
                                        value=''
                                        title='Telephone'
                                        class='input-text  required-entry'
                                        id='shipping:telephone'
                                        onChange='shipping.setSameAsBilling(false);'
                                      />
                                    </div>
                                    <div class='input-box'>
                                      <label for='shipping:fax'>Fax</label>
                                      <input
                                        type='text'
                                        name='shipping[fax]'
                                        value=''
                                        title='Fax'
                                        class='input-text '
                                        id='shipping:fax'
                                        onChange='shipping.setSameAsBilling(false);'
                                      />
                                    </div>
                                  </li>
                                  <li class='no-display'>
                                    <input
                                      type='hidden'
                                      name='shipping[save_in_address_book]'
                                      value='1'
                                    />
                                  </li>
                                </ul>
                              </fieldset>
                            </li>
                            <li class=''>
                              <input
                                style={{ margin: '0 3px 3px 0' }}
                                type='checkbox'
                                name='shipping[same_as_billing]'
                                id='shipping:same_as_billing'
                                value='1'
                                title='Use Billing Address'
                                onClick='shipping.setSameAsBilling(this.checked)'
                                class='checkbox'
                              />
                              <label for='shipping:same_as_billing'>
                                Use Billing Address
                              </label>
                            </li>
                          </ul>
                          <div
                            class='buttons-set'
                            id='shipping-buttons-container'
                          >
                            <p class='required'>* Required Fields</p>
                            <button
                              type='button'
                              class='button continue'
                              title='Continue'
                              onClick='shipping.save()'
                            >
                              <span>Continue</span>
                            </button>
                            <a
                              href='#'
                              onClick='checkout.back(); return false;'
                            >
                              <small>« </small>Back
                            </a>{' '}
                            <span
                              id='shipping-please-wait'
                              class='please-wait'
                              style={{ display: 'none' }}
                            >
                              {' '}
                              <img
                                src='images/opc-ajax-loader.gif'
                                alt='Loading next step...'
                                title='Loading next step...'
                                class='v-middle'
                              />{' '}
                              Loading next step...{' '}
                            </span>{' '}
                          </div>
                        </form>
                      </div>
                    </li>
                    <li id='opc-shipping_method' class='section'>
                      <div class='step-title'>
                        {' '}
                        <span class='number'>4</span>
                        <h3 class='one_page_heading'> Shipping Method</h3>
                      </div>
                      <div
                        id='checkout-step-shipping_method'
                        class='step a-item'
                        style={{ display: 'none' }}
                      >
                        <form id='co-shipping-method-form' action=''>
                          <div id='checkout-shipping-method-load'>
                            <p>
                              Sorry, no quotes are available for this order at
                              this time.
                            </p>
                          </div>
                          <div id='onepage-checkout-shipping-method-additional-load'>
                            {' '}
                          </div>
                          <div
                            class='buttons-set'
                            id='shipping-method-buttons-container'
                          >
                            <button
                              type='button'
                              class='button continue'
                              onClick='shippingMethod.save()'
                            >
                              <span>Continue</span>
                            </button>
                            <a
                              href='#'
                              onClick='checkout.back(); return false;'
                            >
                              <small>« </small>Back
                            </a>{' '}
                            <span
                              id='shipping-method-please-wait'
                              class='please-wait'
                              style={{ display: 'none' }}
                            >
                              {' '}
                              <img
                                src='images/opc-ajax-loader.gif'
                                alt='Loading next step...'
                                title='Loading next step...'
                                class='v-middle'
                              />{' '}
                              Loading next step...{' '}
                            </span>{' '}
                          </div>
                        </form>
                      </div>
                    </li>
                    <li id='opc-payment' class='section'>
                      <div class='step-title'>
                        {' '}
                        <span class='number'>5</span>
                        <h3 class='one_page_heading'> Payment Information</h3>
                      </div>
                      <div
                        id='checkout-step-payment'
                        class='step a-item'
                        style={{ display: 'none' }}
                      >
                        <form action='' id='co-payment-form'>
                          <fieldset>
                            <dl
                              class='sp-methods'
                              id='checkout-payment-method-load'
                            >
                              {/* <!-- Content dynamically loaded. Content from the methods.phtml is loaded during the ajax call --> */}
                            </dl>
                          </fieldset>
                        </form>
                        <div
                          class='tool-tip'
                          id='payment-tool-tip'
                          style={{ display: 'none' }}
                        >
                          <div class='btn-close'>
                            <a
                              href='#'
                              id='payment-tool-tip-close'
                              title='Close'
                            >
                              Close
                            </a>
                          </div>
                          <div class='tool-tip-content'>
                            Card Verification Number Visual Reference
                          </div>
                        </div>
                        <div class='buttons-set' id='payment-buttons-container'>
                          <p class='required'>* Required Fields</p>
                          <button
                            type='button'
                            class='button continue'
                            onClick='payment.save()'
                          >
                            <span>Continue</span>
                          </button>
                          <a href='#' onClick='checkout.back(); return false;'>
                            <small>« </small>Back
                          </a>{' '}
                          <span
                            class='please-wait'
                            id='payment-please-wait'
                            style={{ display: 'none' }}
                          >
                            {' '}
                            <img
                              src='images/opc-ajax-loader.gif'
                              alt='Loading next step...'
                              title='Loading next step...'
                              class='v-middle'
                            />{' '}
                            Loading next step...{' '}
                          </span>{' '}
                        </div>
                      </div>
                    </li>
                    <li id='opc-review' class='section'>
                      <div class='step-title'>
                        {' '}
                        <span class='number'>6</span>
                        <h3 class='one_page_heading'> Order Review</h3>
                      </div>
                      <div
                        id='checkout-step-review'
                        class='step a-item'
                        style={{ display: 'none' }}
                      >
                        <div class='order-review' id='checkout-review-load'>
                          {/* <!-- Content loaded dynamically -->  */}
                        </div>
                      </div>
                    </li>
                  </ol>
                </section>
                <aside
                  class='col-right sidebar col-sm-3 wow bounceInUp animated animated'
                  style={{ visibility: 'visible' }}
                >
                  <div id='checkout-progress-wrapper'>
                    <div class='block block-progress'>
                      <div class='block-title'> Your Checkout </div>
                      <div class='block-content'>
                        <dl>
                          <div id='billing-progress-opcheckout'>
                            <dt> Billing Address</dt>
                          </div>
                          <div id='shipping-progress-opcheckout'>
                            <dt> Shipping Address</dt>
                          </div>
                          <div id='shipping_method-progress-opcheckout'>
                            <dt> Shipping Method</dt>
                          </div>
                          <div id='payment-progress-opcheckout'>
                            <dt> Payment Method</dt>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </aside>
                {/* <!--col-right sidebar-->  */}
              </div>
              {/* <!--row-->  */}
            </div>
            {/* <!--main-container-inner-->  */}
          </div>
          {/* <!--main-container col2-left-layout--> */}

          <div class='container'>
            <div class='row our-features-box'>
              <ul>
                <li>
                  <div class='feature-box'>
                    <div class='icon-truck'></div>
                    <div class='content'>FREE SHIPPING on order over $99</div>
                  </div>
                </li>
                <li>
                  <div class='feature-box'>
                    <div class='icon-support'></div>
                    <div class='content'>
                      Have a question?
                      <br />
                      +1 800 789 0000
                    </div>
                  </div>
                </li>
                <li>
                  <div class='feature-box'>
                    <div class='icon-money'></div>
                    <div class='content'>100% Money Back Guarantee</div>
                  </div>
                </li>
                <li>
                  <div class='feature-box'>
                    <div class='icon-return'></div>
                    <div class='content'>30 days return Service</div>
                  </div>
                </li>
                <li class='last'>
                  <div class='feature-box'>
                    {' '}
                    <a href='#'>
                      <i class='fa fa-apple'></i> download
                    </a>{' '}
                    <a href='#'>
                      <i class='fa fa-android'></i> download
                    </a>{' '}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </>
      )
    }
    return <Redirect to={'/Login'} />
  } else {
    return <Redirect to={'/'} />
  }
}

export default PaymentConfirm
