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
  const [currentName, setCurrentName] = useState('')
  const [currentEmail, setCurrentEmail] = useState('')
  const [currentCity, setCurrentCity] = useState('')
  const [currentPhone, setCurrentPhone] = useState('')

  const [isEdit, setIsEdit] = useState(true)
  const [shipOption, setShipOption] = useState('')
  const [paywithPaypal, setPaywithPaypal] = useState(false)
  const [redirectPage, setRedirectPage] = useState('/')
  const [finishBuy, setFinishBuy] = useState(false)

  const handleChangePaypal = () => {
    setPaywithPaypal(!paywithPaypal)
  }

  useEffect(() => {
    setCurrentAddress(UserSlice.Address)
    setCurrentName(UserSlice.Name)
    setCurrentEmail('')
    setCurrentCity('')
    setCurrentPhone(UserSlice.Phone)
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
  function handleChangeAddress (e) {
    setCurrentAddress(e.target.value)
  }
  function handleChangeName (e) {
    setCurrentName(e.target.value)
  }
  function handleChangeEmail (e) {
    setCurrentEmail(e.target.value)
  }
  function handleChangeCity (e) {
    setCurrentCity(e.target.value)
  }
  function handleChangePhone (e) {
    setCurrentPhone(e.target.value)
  }

  console.log(CartSlice)
  if (CartSlice !== null) {
    console.log(CartSlice)
    console.log(UserSlice)

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
                    <li id='opc-billing' class='section'>
                      <div class='step-title'>
                        <span class='number'>1</span>
                        <h3 class='one_page_heading'>
                          Billing and Shipping Information
                        </h3>
                      </div>
                      <div
                        id='checkout-step-billing'
                        class='step a-item'
                        // style={{ display: 'none' }}
                      >
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
                                          Name
                                          <span class='required'>*</span>
                                        </label>
                                        <div class='input-box1'>
                                          <input
                                            type='text'
                                            id='billing:firstname'
                                            name='billing[firstname]'
                                            value={currentName}
                                            onChange={handleChangeName}
                                            title='First Name'
                                            maxlength='255'
                                            class='input-text required-entry'
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li class='fields'>
                                    <div class='input-box'>
                                      <label for='billing:email'>
                                        Email Address
                                        <em class='required'>*</em>
                                      </label>
                                      <input
                                        type='text'
                                        name='billing[email]'
                                        id='billing:email'
                                        value={currentEmail}
                                        onChange={handleChangeEmail}
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
                                      value={currentAddress}
                                      onChange={handleChangeAddress}
                                      class='input-text  required-entry'
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
                                        value={currentCity}
                                        onChange={handleChangeCity}
                                        class='input-text  required-entry'
                                        id='billing:city'
                                      />
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
                                        value={currentPhone}
                                        onChange={handleChangePhone}
                                        title='Telephone'
                                        class='input-text  required-entry'
                                        id='billing:telephone'
                                      />
                                    </div>
                                  </li>
                                  <li
                                    class='fields'
                                    id='register-customer-password'
                                  ></li>
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
                                    </a>
                                  </div>
                                  <div
                                    class='remember-me-popup-body'
                                    style={{ display: 'none' }}
                                  >
                                    <p id='text1'>
                                      Checking "Remember Me" will let you access
                                      your shopping cart on this computer when
                                      you are logged out
                                    </p>
                                    <div class='remember-me-popup-close-button a-right'>
                                      <a
                                        href='#'
                                        class='remember-me-popup-close button'
                                        title='Close'
                                        onClick='showDiv()'
                                      >
                                        <span>Close</span>
                                      </a>
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

                            <span
                              class='please-wait'
                              id='billing-please-wait'
                              style={{ display: 'none' }}
                            >
                              <img
                                src='images/opc-ajax-loader.gif'
                                alt='Loading next step...'
                                title='Loading next step...'
                                class='v-middle'
                              />
                              Loading next step...
                            </span>
                          </div>
                        </fieldset>
                      </div>
                    </li>

                    <li id='opc-payment' class='section'>
                      <div class='step-title'>
                        <span class='number'>2</span>
                        <h3 class='one_page_heading'> Payment Information</h3>
                      </div>
                      <div
                        id='checkout-step-payment'
                        class='step a-item'
                        // style={{ display: 'none' }}
                      >
                        <fieldset>
                          <dl
                            class='sp-methods'
                            id='checkout-payment-method-load'
                          >
                            {/* <!-- Content dynamically loaded. Content from the methods.phtml is loaded during the ajax call --> */}
                          </dl>
                        </fieldset>

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
                            onClick={onSubmit}
                          >
                            <span>Finish</span>
                          </button>

                          <span
                            class='please-wait'
                            id='payment-please-wait'
                            style={{ display: 'none' }}
                          >
                            <img
                              src='images/opc-ajax-loader.gif'
                              alt='Loading next step...'
                              title='Loading next step...'
                              class='v-middle'
                            />
                            Loading next step...
                          </span>
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
                    <a href='#'>
                      <i class='fa fa-apple'></i> download
                    </a>
                    <a href='#'>
                      <i class='fa fa-android'></i> download
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <NotificationContainer />
        </>
      )
    }
    return <Redirect to={'/Login'} />
  } else {
    return <Redirect to={'/'} />
  }
}

export default PaymentConfirm
