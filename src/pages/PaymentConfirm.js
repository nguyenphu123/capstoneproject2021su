import axios from 'axios'
import React, { useEffect, useState } from 'react'

import emailjs from 'emailjs-com'
import { v4 as uuidv4 } from 'uuid'
import { Checkbox, Dropdown } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify'
import 'semantic-ui-css/semantic.min.css'

import 'react-toastify/dist/ReactToastify.css'
import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { emptyCart } from '../features/Cart/CartSlice'
import { createOrder, removeOrder } from '../features/OrderData/OrderDataSlice'

const mapDispatch = { emptyCart, createOrder, removeOrder }
// const client = new SMTPClient({
//   user: 'phu nguyen',
//   password: 'Mu125690',
//   host: 'phunguyen12111998@gmail.com',
//   ssl: true
// })
const options = [
  { key: 1, text: 'Hà Nội', value: 'Hà Nội' },
  { key: 2, text: 'Hồ Chí Minh', value: 'Hồ Chí Minh' }
]

function PaymentConfirm () {
  const [isEdit, setIsEdit] = useState(false)

  const { IsPay } = useParams()

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
  const orderId = uuidv4()
  const totalPrice = 0
  const Ispay = window.location.href.includes('true')
  const CartSlice = useSelector(state => state.CartSlice.cart)

  const OrderSlice = useSelector(state => state.OrderDataSlice.order)
  const [isLoading, setIsLoading] = useState(true)

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
    setWards(wards => wards)
  }, [wards])
  useEffect(() => {
    setCityAndProvince(cityAndProvince => cityAndProvince)
  }, [cityAndProvince])

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
            text: element.ProvinceName,
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
      setCurrentAddress(OrderSlice.AddressShipping)
      setCurrentName(OrderSlice.Name)
      setCurrentEmail(OrderSlice.Email)
      // setCurrentCity('')
      setCurrentPhone(OrderSlice.Phone)

      axios({
        method: 'post',
        url: '/api/order-management/users/orders',
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify(OrderSlice)
      }).then(res => {
        dispatch(emptyCart())
        console.log(res)

        toast.success('We have received your order')

        dispatch(removeOrder())

        setFinishBuy(true)
      })
    } else {
    }
  }, [OrderSlice])

  console.log(finishBuy)
  useEffect(() => {
    setFinishBuy(false)

    if (finishBuy) {
      // document.getElementById('finishform').submit()

      dispatch(emptyCart())
    } else {
    }
  }, [finishBuy])

  if (finishBuy) {
    function onSubmit2 (e) {
      e.preventDefault()

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

        <Redirect to={'/FinishPayment'} />
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
  function handleChangeCity (e, { value, text, key }) {
    setCityAndProvince(value)
    console.log(value)
    console.log(cityAndProvince)
    setDistricts(districts => [])

    axios({
      method: 'get',
      url:
        ' https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=' +
        value.ProvinceID,
      headers: {
        'content-type': 'application/json',
        token: '9e21b8e5-ec50-11eb-9388-d6e0030cbbb7'
      }
    }).then(res => {
      console.log(res.data.data)
      res.data.data.forEach(element => {
        let district = {
          key: element.Code,
          text: element.DistrictName,
          value: element
        }
        setDistricts(districts => [...districts, district])
      })
    })
  }

  function handleChangeDistrict (e, { value }) {
    setDistrict(value)
    setWards(wards => [])
    axios({
      method: 'get',
      url:
        ' https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=' +
        value.DistrictID,
      headers: {
        'content-type': 'application/json',
        token: '9e21b8e5-ec50-11eb-9388-d6e0030cbbb7'
      }
    }).then(res => {
      console.log(res.data.data)
      res.data.data.forEach(element => {
        let ward = {
          key: element.WardCode,
          text: element.WardName,
          value: element
        }
        setWards(wards => [...wards, ward])
      })
    })
  }
  function handleChangeWard (e, { value }) {
    setWard(value)
  }
  function handleChangePhone (e) {
    setCurrentPhone(e.target.value)
  }
  if (isLoading) {
    return <>...loading please wait a moment</>
  } else {
    if (CartSlice !== null) {
      console.log(isEdit)
      function onSubmit (e) {
        e.preventDefault()

        if (UserSlice !== null) {
          //reference the element in the "JSON" aka object literal we want

          //loop through the array

          //Do the math!
          if (
            cityAndProvince.ProvinceName === null ||
            district.DistrictName === null ||
            ward.WardName === null
          ) {
            toast.warn('please choose your region')

          } else {
            if (paywithMomo) {
              const order = {
                UserId: UserSlice.Id,
                Name: currentName,
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
                  cityAndProvince.ProvinceName +
                  ' ' +
                  district.DistrictName +
                  ' ' +
                  ward.WardName,
                Date: new Date()
                  .toISOString()
                  .slice(0, 19)
                  .replace('T', ' '),
                Status: true,
                Phone: currentPhone,
                Email: currentEmail,
                OrderDetails: CartSlice
              }

              axios({
                method: 'post',
                url:
                  '/api/order-management/' +
                  order.TotalPrice * 10 +
                  '?currentOrderId=' +
                  orderId,
                headers: { 'content-type': 'application/json' }
                // data: JSON.stringify(order)
              }).then(res => {
                // dispatch(emptyCart())

                dispatch(createOrder(order))

                window.open(res.data, '_self')
                setFinishBuy(true)
              })
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
                  cityAndProvince.ProvinceName +
                  ' ' +
                  district.DistrictName +
                  ward.WardName,
                Date: new Date()
                  .toISOString()
                  .slice(0, 19)
                  .replace('T', ' '),
                Status: false,
                Phone: currentPhone,

                OrderDetails: CartSlice
              }

              axios({
                method: 'post',
                url: '/api/order-management/users/orders',
                headers: { 'content-type': 'application/json' },
                data: JSON.stringify(order)
              }).then(res => {
                dispatch(emptyCart())
                console.log(res)

                e.preventDefault() //This is important, i'm not sure why, but the email won't send without it

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
                toast.success('We have received your order')

                setTimeout(function () {
                  setFinishBuy(true)
                }, 5000)
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
                                        <Dropdown
                                          onChange={handleChangeCity}
                                          options={cityAndProvinces}
                                          placeholder='City and province'
                                          search
                                          selection
                                          value={cityAndProvince}
                                        />
                                        <Dropdown
                                          onChange={handleChangeDistrict}
                                          options={districts}
                                          search
                                          placeholder='District'
                                          selection
                                          value={district}
                                        />
                                        <Dropdown
                                          onChange={handleChangeWard}
                                          options={wards}
                                          search
                                          placeholder='Ward'
                                          selection
                                          value={ward}
                                        />
                                      </div>
                                    </li>
                                  </ul>
                                  <div class='remember-me-popup'></div>
                                </fieldset>
                              </li>

                              <li class='go-behind'>
                                <Checkbox
                                  radio
                                  label='pay on delivery'
                                  name='checkboxRadioGroup'
                                  value='this'
                                  checked={!paywithMomo}
                                  onChange={() => setPaywithMomo(!paywithMomo)}
                                />

                                <Checkbox
                                  radio
                                  label='Or pay with MOMO'
                                  name='checkboxRadioGroup'
                                  value='that'
                                  checked={paywithMomo}
                                  onChange={() => setPaywithMomo(!paywithMomo)}
                                />
                              </li>
                              <li class='go-behind'>
                                <Checkbox
                                  radio
                                  label='use current information for billing'
                                  name='checkboxRadioGroup'
                                  value='this'
                                  checked={!isEdit}
                                  onChange={() => setIsEdit(!isEdit)}
                                />

                                <Checkbox
                                  radio
                                  label='use different information'
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
                                  <span>Finish</span>
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
                              </form>

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
            <ToastContainer autoClose={5000} />
          </>
        )
      }
      return <Redirect to={'/1'} />
    } else {
      return <Redirect to={'/2'} />
    }
  }
}
export default PaymentConfirm
