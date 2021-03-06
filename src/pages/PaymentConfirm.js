import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css'

import emailjs from 'emailjs-com'
import { Cascader } from 'antd'

import { Checkbox } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify'
import 'semantic-ui-css/semantic.min.css'
import { notification } from 'antd'

import 'react-toastify/dist/ReactToastify.css'
import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { emptyCart } from '../features/Cart/CartSlice'
import { createOrder, removeOrder } from '../features/OrderData/OrderDataSlice'
import { toastCalling } from '../features/Toast/ToastSlice'

const mapDispatch = { emptyCart, createOrder, removeOrder, toastCalling }
const API_KEY =
  '03d22ab188621af12c5c8dd271d888f082ee83bc6c6e9e05a80dc9d930ab8b7c'

function PaymentConfirm () {
  const [isEdit, setIsEdit] = useState(false)

  const { orderId } = useParams()
  const [currentOrderId, setCurrentOrderId] = useState()
  const dispatch = useDispatch()
  const UserSlice = useSelector(state => state.UserSlice.user)

  const [isLogin, setIsLogin] = useState(true)
  const [currentAddress, setCurrentAddress] = useState(UserSlice.Address)
  const [currentName, setCurrentName] = useState('')
  const [currentEmail, setCurrentEmail] = useState('')

  const [currentPhone, setCurrentPhone] = useState(UserSlice.Phone)

  const [shipOption, setShipOption] = useState('')
  const [paywithMomo, setPaywithMomo] = useState(false)
  const [redirectPage, setRedirectPage] = useState('/FinishPayment')
  const [finishBuy, setFinishBuy] = useState(false)

  const totalPrice = 0

  const CartSlice = useSelector(state => state.CartSlice.cart)

  const OrderSlice = useSelector(state => state.OrderDataSlice.order)
  const [isLoading, setIsLoading] = useState(true)
  const [isChecking, setIsChecking] = useState(false)

  const [cityAndProvinces, setCityAndProvinces] = useState([])
  const [cityAndProvince, setCityAndProvince] = useState(null)
  const [districts, setDistricts] = useState([])
  const [district, setDistrict] = useState(null)
  const [wards, setWards] = useState([])
  const [ward, setWard] = useState(null)

  useEffect(() => {
    setIsLoading(false)
    setTimeout(function () {}, 5000)
  }, [isEdit])

  const handleChangeMomo = () => {
    setPaywithMomo(!paywithMomo)
  }
  useEffect(() => {
    setDistricts(districts => districts)
  }, [districts])
  useEffect(() => {
    setIsChecking(isChecking => isChecking)
  }, [isChecking => districts])

  useEffect(() => {
    setCurrentOrderId(currentOrderId => currentOrderId)
  }, [currentOrderId])

  useEffect(() => {
    setWards(wards => wards)
  }, [wards])

  console.log(UserSlice)
  useEffect(() => {
    setCurrentAddress(UserSlice.Address)
    setCurrentName(UserSlice.Name)
    setCurrentEmail(UserSlice.Email)
    // setCurrentCity('')
    setCurrentPhone(UserSlice.Phone)
    setIsEdit(false)
    if (cityAndProvinces.length === 0) {
      axios({
        method: 'get',
        url:
          ' https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province',
        headers: {
          'content-type': 'application/json',
          token: '9e21b8e5-ec50-11eb-9388-d6e0030cbbb7'
        }
      }).then(res => {
        console.log(res.data.data)
        res.data.data.forEach(element => {
          let city = {
            key: element.ProvinceID,
            label: element.ProvinceName,
            value: element
          }
          cityAndProvinces.push(city)
        })
      })
    } else {
    }

    console.log(cityAndProvinces)
    setIsLoading(false)
  }, [UserSlice])

  useEffect(() => {
    console.log(OrderSlice)
    if (OrderSlice !== null) {
      setIsChecking(true)
      // setCurrentAddress(OrderSlice.AddressShipping)
      // setCurrentName(OrderSlice.Name)
      // setCurrentEmail(OrderSlice.Email)
      // // setCurrentCity('')
      // setCurrentPhone(OrderSlice.Phone)

      axios({
        method: 'POST',
        url:
          '/api/order-management/UpdateStatusServer?total=' +
          OrderSlice.TotalPrice +
          '&currentOrderId=' +
          OrderSlice.Id,
        headers: { 'content-type': 'application/json' }
        // data: JSON.stringify(order)
      }).then(res => {
        let templateParams = {
          currentName: OrderSlice.Name,
          currentEmail: OrderSlice.Email,
          OrderId: OrderSlice.Id
        }

        emailjs
          .send(
            'service_nueuo8m',
            'template_omuck9t',
            templateParams,
            'user_32k4I6JJIEyo5ehBoH1Ae'
          )
          .then(
            result => {
              console.log(result.text)
              notification['success']({
                message: 'order',
                description: 'We have received your order.',
                duration: 10
              })

              dispatch(emptyCart())
              dispatch(removeOrder())
              setIsChecking(false)

              setFinishBuy(true)
            },
            error => {
              dispatch(removeOrder())
              setIsChecking(false)

              setFinishBuy(true)
            }
          )
      })
    } else {
      // notification['error']({
      //   message: 'order',
      //   description: 'We have failed to received your order.',
      //   duration: 10
      // })
      // setFinishBuy(true)
    }
  }, [])
  useEffect(() => {
    if (finishBuy) {
      // document.getElementById('finishform').submit()

      setFinishBuy(false)
    } else {
    }
  }, [finishBuy])

  if (finishBuy) {
    return (
      <>
        <Redirect to={'/' + 'Finishpayment'} />
      </>
    )
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
  function handleChangeCity (e, value) {
    if (value === null || value === undefined) {
      setCityAndProvince('')
    } else {
      setCityAndProvince(value[0].label)
      console.log(value[0].label)
      console.log(cityAndProvince)
      setDistricts(districts => [])

      axios({
        method: 'get',
        url:
          ' https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=' +
          value[0].value.ProvinceID,
        headers: {
          'content-type': 'application/json',
          token: '9e21b8e5-ec50-11eb-9388-d6e0030cbbb7'
        }
      }).then(res => {
        console.log(res.data.data)
        res.data.data.forEach(element => {
          let district = {
            key: element.Code,
            label: element.DistrictName,
            value: element
          }
          setDistricts(districts => [...districts, district])
        })
      })
    }
  }
  useEffect(() => {
    setCityAndProvince(cityAndProvince => cityAndProvince)
    console.log(cityAndProvince)
  }, [cityAndProvince])
  useEffect(() => {
    setWard(ward => ward)
  }, [ward])
  useEffect(() => {
    setDistrict(district => district)
  }, [district])

  function handleChangeDistrict (e, value) {
    if (value === null || value === undefined) {
      setDistrict('')
    } else {
      setDistrict(value[0].label)
      setWards(wards => [])
      axios({
        method: 'get',
        url:
          ' https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=' +
          value[0].value.DistrictID,
        headers: {
          'content-type': 'application/json',
          token: '9e21b8e5-ec50-11eb-9388-d6e0030cbbb7'
        }
      }).then(res => {
        console.log(res.data.data)
        if (res.data.data !== null) {
          res.data.data.forEach(element => {
            let ward = {
              key: element.WardCode,
              label: element.WardName,
              value: element
            }
            setWards(wards => [...wards, ward])
          })
        } else {
        }
      })
    }
  }
  function handleChangeWard (e, value) {
    if (value === null || value === undefined) {
      setWard('')
    } else {
      setWard(value[0].label)
    }
  }
  function handleChangePhone (e) {
    setCurrentPhone(e.target.value)
  }
  if (isLoading || isChecking) {
    return (
      <section className=' wow bounceInUp animated'>
        <div className='best-pro slider-items-products container'>
          <div className='new_title'>
            <h2>... Loading please wait a moment</h2>
          </div>
        </div>
      </section>
    )
  } else {
    if (CartSlice !== null) {
      console.log(isEdit)
      function onSubmit (e) {
        e.preventDefault()

        if (UserSlice !== null) {
          //reference the element in the "JSON" aka object literal we want

          //loop through the array

          //Do the math!
          if (cityAndProvince === null || district === null) {
            toast.warn('please choose your region')
          } else {
            let myward = ''

            if (ward === null) {
            } else {
              myward = ward
            }

            if (paywithMomo) {
              const order = {
                UserId: UserSlice.Id,
                Name: currentName,

                TotalPrice: CartSlice.reduce(
                  (accumulator, currentValue) =>
                    accumulator +
                    currentValue.CurrentPrice * currentValue.Quantity,
                  0
                ),
                AddressShipping:
                  currentAddress +
                  ' ' +
                  cityAndProvince +
                  ' ' +
                  district +
                  ' ' +
                  myward,
                Date: new Date()
                  .toISOString()
                  .slice(0, 19)
                  .replace('T', ' '),
                Status: 'Completed',
                Phone: currentPhone,
                Email: currentEmail,
                OrderDetails: CartSlice,
                Ship: [
                  {
                    CompanyName: 'FPT',
                    ShipStatus: 'Pending'
                  }
                ]
              }

              if (1000 > order.TotalPrice || order.TotalPrice > 50000000) {
                toast.warn(
                  'Please note that your total exceed the 50 million limit so you can only choose pay on delivery'
                )
              } else {
                axios({
                  method: 'post',
                  url: '/api/order-management/users/orders',
                  headers: { 'content-type': 'application/json' },
                  data: JSON.stringify(order)
                }).then(res => {
                  console.log(res.data)
                  order.Id = res.data

                  axios({
                    method: 'post',
                    url:
                      '/api/order-management/' +
                      order.TotalPrice +
                      '?currentOrderId=' +
                      res.data,
                    headers: { 'content-type': 'application/json' }
                    // data: JSON.stringify(order)
                  }).then(res => {
                    // dispatch(emptyCart())
                    order.MoMoURL = res.data

                    dispatch(createOrder(order))

                    window.open(res.data, '_self')
                  })
                })
              }
            } else {
              let myward = ''

              if (ward === null) {
              } else {
                myward = ward
              }

              const order = {
                UserId: UserSlice.Id,
                OrderId: orderId,
                TotalPrice: CartSlice.reduce(
                  (accumulator, currentValue) =>
                    accumulator +
                    currentValue.CurrentPrice * currentValue.Quantity,
                  0
                ),
                AddressShipping:
                  currentAddress +
                  ' ' +
                  cityAndProvince +
                  ' ' +
                  district +
                  ' ' +
                  myward,
                Date: new Date()
                  .toISOString()
                  .slice(0, 19)
                  .replace('T', ' '),
                Status: 'Failed',
                Phone: currentPhone,

                OrderDetails: CartSlice,
                Ship: [
                  {
                    CompanyName: 'FPT',
                    ShipStatus: 'Pending'
                  }
                ]
              }

              axios({
                method: 'post',
                url: '/api/order-management/users/orders',
                headers: { 'content-type': 'application/json' },
                data: JSON.stringify(order)
              }).then(res => {
                console.log(res)

                // e.preventDefault() //This is important, i'm not sure why, but the email won't send without it
                let templateParams = {
                  currentName: currentName,
                  currentEmail: currentEmail,
                  OrderId: res.data
                }

                emailjs
                  .send(
                    'service_nueuo8m',
                    'template_omuck9t',
                    templateParams,
                    'user_32k4I6JJIEyo5ehBoH1Ae'
                  )
                  .then(
                    result => {
                      console.log(result.text)
                      notification['success']({
                        message: 'order',
                        description: 'We have received your order.',
                        duration: 10
                      })

                      setTimeout(function () {
                        setFinishBuy(true)
                        dispatch(emptyCart())
                      }, 5000)
                    },
                    error => {
                      console.log(error.text)
                    }
                  )
              })
            }
          }
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
      function handlePayMethod () {
        setPaywithMomo(!paywithMomo)
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
                                              name='Name'
                                              value={currentName}
                                              onChange={handleChangeName}
                                              disabled={isEdit ? false : true}
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
                                        <label for='Email'>
                                          Email Address
                                          <em class='required'>*</em>
                                        </label>
                                        <input
                                          type='text'
                                          name='billing[email]'
                                          id='billing:email'
                                          value={currentEmail}
                                          onChange={handleChangeEmail}
                                          disabled={isEdit ? false : true}
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
                                        disabled={isEdit ? false : true}
                                        class='input-text  required-entry'
                                      />
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
                                          disabled={isEdit ? false : true}
                                          title='Telephone'
                                          class='input-text  required-entry'
                                          id='billing:telephone'
                                        />
                                      </div>
                                    </li>
                                    <li
                                      class='fields'
                                      style={{ zIndex: '10000' }}
                                    >
                                      <div
                                        class='dropdown-box'
                                        style={{ zIndex: '10000' }}
                                      >
                                        <label for='city'>
                                          Region<em class='required'>*</em>
                                        </label>
                                        <Cascader
                                          options={cityAndProvinces}
                                          onChange={handleChangeCity}
                                          placeholder='Please select'
                                        />

                                        <Cascader
                                          options={districts}
                                          onChange={handleChangeDistrict}
                                          placeholder='Please select'
                                        />

                                        <Cascader
                                          options={wards}
                                          onChange={handleChangeWard}
                                          placeholder='Please select'
                                        />
                                      </div>
                                    </li>
                                  </ul>
                                </fieldset>
                              </li>

                              <li class='go-behind'>
                                <Checkbox
                                  radio
                                  label='Pay on delivery'
                                  name='checkboxRadioGroup'
                                  value='this'
                                  checked={!paywithMomo}
                                  onChange={() => setPaywithMomo(!paywithMomo)}
                                />

                                <Checkbox
                                  radio
                                  label='Pay with MOMO'
                                  name='checkboxRadioGroup'
                                  value='that'
                                  checked={paywithMomo}
                                  onChange={() => setPaywithMomo(!paywithMomo)}
                                />
                              </li>
                              <li class='go-behind'>
                                <Checkbox
                                  radio
                                  label='Use current information for billing'
                                  name='checkboxRadioGroup'
                                  value='this'
                                  checked={!isEdit}
                                  onChange={() => setIsEdit(!isEdit)}
                                />

                                <Checkbox
                                  radio
                                  label='Use different information'
                                  name='checkboxRadioGroup'
                                  value='that'
                                  checked={isEdit}
                                  onChange={() => setIsEdit(!isEdit)}
                                />
                              </li>
                            </ul>
                            <div
                              class='buttons-set go-behind'
                              id='billing-buttons-container'
                            >
                              <p class='required'>* Required Fields</p>
                              <form onSubmit={onSubmit}>
                                <button
                                  type='button'
                                  class='button continue'
                                  type='submit'

                                  // onClick={onSubmit}
                                >
                                  <span>Checkout</span>
                                </button>
                                <input
                                  type='text'
                                  name='Name'
                                  value={currentName}
                                  onChange={handleChangeName}
                                  title='First Name'
                                  maxlength='255'
                                  class='input-text required-entry'
                                  style={{ visibility: 'hidden' }}
                                />
                                <input
                                  type='text'
                                  name='email'
                                  value={currentEmail}
                                  id='email'
                                  style={{ display: 'none' }}
                                />

                                <input
                                  type='text'
                                  name='OrderId'
                                  value={orderId}
                                  class='input-text required-entry'
                                  style={{ visibility: 'hidden' }}
                                />
                              </form>
                            </div>
                          </fieldset>
                        </div>
                      </li>
                    </ol>
                  </section>

                  <aside
                    class='col-right sidebar col-sm-3 wow bounceInUp animated animated'
                    style={{ visibility: 'visible' }}
                  ></aside>
                  {/* <!--col-right sidebar-->  */}
                </div>
                {/* <!--row-->  */}
              </div>
              {/* <!--main-container-inner-->  */}
            </div>
            {/* <!--main-container col2-left-layout--> */}
            <div className='mid-section'>
              <div class='container'>
                <div class='row our-features-box'>
                  <ul>
                    <li>
                      <div class='feature-box'>
                        <div class='icon-truck'></div>
                        <div class='content'>
                          FREE SHIPPING on order over $99
                        </div>
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
            </div>
            <ToastContainer autoClose={5000} />
          </>
        )
      }
      return <Redirect to={'/1'} />
    } else {
      function onSubmit2 (e) {
        e.preventDefault()
        toast.success('We have received your order')

        console.log(UserSlice)

        if (UserSlice !== null) {
          //reference the element in the "JSON" aka object literal we want

          //loop through the array

          //Do the math!

          e.preventDefault()

          emailjs
            .sendForm(
              'service_nueuo8m',
              'template_omuck9t',
              e.target,
              'user_32k4I6JJIEyo5ehBoH1Ae'
            )
            .then(
              result => {
                console.log(result.text)
              },
              error => {
                console.log(error.text)
              }
            )
        } else {
          setIsLogin(false)
          console.log(isLogin)
        }
      }

      return (
        <>
          <Redirect to={'/' + 2} />
          <form
            style={{ visibility: 'hidden' }}
            id='finishform'
            onSubmit={onSubmit2}
          >
            <input
              type='text'
              name='Name'
              value={currentName}
              onChange={handleChangeName}
              title='First Name'
              maxlength='255'
              class='input-text required-entry'
              style={{ visibility: 'hidden' }}
            />
          </form>
          <ToastContainer autoClose={5000} />
        </>
      )
    }
  }
}
export default PaymentConfirm
