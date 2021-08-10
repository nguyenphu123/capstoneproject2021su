import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import emailjs from 'emailjs-com'
import { Checkbox } from 'semantic-ui-react'
var SHA256 = require('crypto-js/sha256')
var otpGenerator = require('otp-generator')

// import { useDispatch, useSelector } from 'react-redux'
// import { userActions } from '../actions/user.actions'
function RegistrationPage () {
  // const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [matchPassword, setMatchPassword] = useState('')
  const [gender, setGender] = useState(true)
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [matchotp, setMatchOTP] = useState('')
  const [otp, setOTP] = useState(
    otpGenerator.generate(6, { upperCase: false, specialChars: false })
  )
  const [openOtp, setOpenOtp] = useState('none')
  const [address, setAddress] = useState('')
  const [agreement, setAgreement] = useState(false)

  // const [user, setUser] = useState()

  // const location = useLocation()

  // reset login status
  useEffect(() => {}, [])

  function handleChange (e) {
    // const { name, value } = e.target
    // setInputs(inputs => ({ ...inputs, [name]: value }))
  }
  function Regist (e) {
    e.preventDefault()

    if (matchotp === '' || matchotp !== otp) {
      toast.warn('Wrong OTP')
    } else {
      const authData = {
        UserName: username,
        PassWord: SHA256(password).toString(),
        RankId: '12341234-1234-1234-1234-123412341234',
        RoleId: 'd00d3c17-6180-4a32-884c-976cd044ce7b',
        Name: name,
        Phone: phone,
        Address: address,
        Gender: gender,
        Point: 20,
        Email: email
      }
      axios({
        method: 'post',
        url: '/api/user-management/users',
        headers: {},
        data: authData
      })
        .then(res => {
          console.log(res)
          console.log(res.data)
          toast.success(
            'Your registration has completed, you can now login to shopping'
          )
        })
        .catch(function (error) {
          console.log('Show error notification!')
          return Promise.reject(error)
        })
    }
  }
  function handleSubmit (e) {
    e.preventDefault()
    console.log(username)
    console.log(password)

    if (
      username &&
      password &&
      name &&
      address &&
      phone &&
      email &&
      matchPassword
    ) {
      if (agreement) {
        emailjs
          .sendForm(
            'service_nueuo8m',
            'template_fihobul',
            e.target,
            'user_32k4I6JJIEyo5ehBoH1Ae'
          )
          .then(
            result => {
              toast.success(
                'Thank you for your registration, you will receive an email with OTP please input it to verify your account'
              )
              setOpenOtp('inline')
            },
            error => {
              toast.warn('Email error')
            }
          )
      } else {
        toast.warn('Please accept our policies')
      }
    } else {
      toast.warn('Please fill all required information')
    }
  }
  function handleChangeUsername (e) {
    if (e.target.value === '') {
      toast.warn('Sorry user name cannot be empty')
    } else {
      if (e.target.value.length < 6) {
        toast.warn('Sorry user name cannot be under 6 character')
      } else {
      }
    }
  }
  function handleChangePassword (e) {
    if (e.target.value === '') {
      toast.warn('Sorry password cannot be empty')
    } else {
      if (e.target.value.length < 8) {
        toast.warn('Sorry password cannot be under 8 character')
      } else {
        var reg = /^(?=.*\d)(?=.*[a-zA-Z]).{8,32}$/

        var test = reg.test(e.target.value)
        if (test) {
        } else {
          toast.warn('password must contain atleast a letter and a number')
        }
      }
    }
  }
  function handleChangeMatchPassword () {
    if (matchPassword !== password) {
      toast.warn('Your password does not match')
    } else {
    }
  }

  function handleChangeName (e) {
    if (e.target.value === '') {
      toast.warn('Sorry name cannot be empty')
    } else {
    }
  }
  function handleChangeAddress (e) {
    if (e.target.value === '') {
      toast.warn('Sorry address cannot be empty')
    } else {
    }
  }

  function handleChangePhone (e) {
    if (e.target.value === '') {
      toast.warn('Sorry phone cannot be empty')
    } else {
      if (e.target.value.length < 10) {
        toast.warn('Sorry phonenumber cannot be under 10 character')
      } else {
        var reg = /(84|0[3|5|7|8|9])+([0-9]{8})/
        var test = reg.test(e.target.value)
        if (test) {
        } else {
          toast.warn('phone number must contain number only')
        }
      }
    }
  }
  function handleChangeEmail (e) {
    if (e.target.value === '') {
      toast.warn('Sorry email cannot be empty')
    } else {
      var reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

      var test = reg.test(e.target.value)
      if (test) {
      } else {
        toast.warn('email must include @mail.com')
      }
    }
  }

  const genderOptions = [
    { key: 'm', text: 'Male', value: true },
    { key: 'f', text: 'Female', value: false }
    // { key: 'o', text: 'Other', value: 'other' }
  ]

  return (
    <div class='main-container col1-layout wow bounceInUp animated animated'>
      <div class='main'>
        <div class='account-login container'>
          {/* <!--page-title--> */}

          <input name='form_key' type='hidden' value='EPYwQxF6xoWcjLUr' />
          <fieldset class='col2-set'>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                name='otp'
                value={otp}
                id='otp'
                style={{ display: 'none' }}
              />
              <input
                type='text'
                name='email'
                value={email}
                id='email'
                style={{ display: 'none' }}
              />

              <div class='col-1 registered-users'>
                <strong>Registration Customers</strong>
                <div class='content'>
                  <p>Create Account.</p>
                  <ul class='form-list'>
                    <li>
                      <label for='username'>
                        UserName<em class='required'>*</em>
                      </label>
                      <div class='input-box'>
                        <input
                          type='text'
                          name='username'
                          value={username}
                          id='username'
                          class='input-text required-entry validate-email'
                          title='Email Address'
                          onChange={e => setUsername(e.target.value)}
                          onBlur={handleChangeUsername}
                        />
                      </div>
                      <label for='email'>
                        Gender<em class='required'>*</em>
                      </label>

                      <Checkbox
                        radio
                        label='Male'
                        name='checkboxRadioGroup'
                        value={true}
                        checked={gender}
                        onChange={() => setGender(!gender)}
                      />

                      <Checkbox
                        radio
                        label='Female'
                        name='checkboxRadioGroup'
                        value={false}
                        checked={!gender}
                        onChange={() => setGender(!gender)}
                      />
                    </li>
                    <li>
                      <label for='password'>
                        Password<em class='required'>*</em>
                      </label>
                      <div class='input-box'>
                        <input
                          value={password}
                          type='password'
                          name='Password'
                          class='input-text required-entry validate-password'
                          id='password'
                          title='Password'
                          onChange={e => setPassword(e.target.value)}
                          onBlur={handleChangePassword}
                        />
                      </div>
                    </li>
                    <li>
                      <label for='matchpassword'>
                        Password confirm<em class='required'>*</em>
                      </label>
                      <div class='input-box'>
                        <input
                          value={matchPassword}
                          type='password'
                          name='matchpassword'
                          class='input-text required-entry validate-password'
                          id='matchpassword'
                          title='Password'
                          onChange={e => setMatchPassword(e.target.value)}
                          onBlur={handleChangeMatchPassword}
                        />
                      </div>
                    </li>
                    <li>
                      <label for='email'>
                        Address<em class='required'>*</em>
                      </label>
                      <div class='input-box'>
                        <input
                          type='text'
                          name='address'
                          value={address}
                          id='address'
                          class='input-text required-entry validate-email'
                          title='Address'
                          onChange={e => setAddress(e.target.value)}
                        />
                      </div>
                    </li>
                    <li>
                      <label for='name'>
                        Name<em class='required'>*</em>
                      </label>
                      <div class='input-box'>
                        <input
                          type='text'
                          name='name'
                          value={name}
                          id='name'
                          class='input-text required-entry validate-email'
                          title='name'
                          onChange={e => setName(e.target.value)}
                        />
                      </div>
                    </li>

                    <li>
                      <label for='email'>
                        Email Address<em class='required'>*</em>
                      </label>
                      <div class='input-box'>
                        <input
                          type='text'
                          name='email'
                          value={email}
                          id='email'
                          class='input-text required-entry validate-email'
                          title='Email Address'
                          onChange={e => setEmail(e.target.value)}
                          onBlur={handleChangeEmail}
                        />
                      </div>
                    </li>

                    <li>
                      <label for='email'>
                        Phone <em class='required'>*</em>
                      </label>
                      <div class='input-box'>
                        <input
                          type='text'
                          name='phone'
                          value={phone}
                          id='phone'
                          class='input-text required-entry validate-email'
                          title='Email Address'
                          onChange={e => setPhone(e.target.value)}
                          onBlur={handleChangePhone}
                        />
                      </div>
                    </li>
                  </ul>
                  <div class='remember-me-popup'></div>

                  {/* <!--buttons-set--> */}
                </div>
                {/* <!--content--> */}
              </div>
              <div class='col-2 new-users'>
                <div class='buttons-set'>
                  <p class='required'>* Required Fields</p>
                  <div class='remember-me-popup-body'>
                    <div>
                      <h1>Policy</h1>
                      <br />
                    </div>

                    <Checkbox
                      label={' I have read all of the policies and rules'}
                      name='checkbox'
                      value='this'
                      checked={agreement}
                      onChange={() => setAgreement(!agreement)}
                    />
                  </div>

                  <button
                    type='submit'
                    class='button login'
                    title='Login'
                    name='send'
                    id='send2'
                  >
                    <span>Registration</span>
                  </button>
                </div>
              </div>
            </form>
            <form style={{ display: openOtp }} onSubmit={Regist}>
              <div>
                <label for='email'>
                  Otp <em class='required'>*</em>
                </label>
                <div class='input-box'>
                  <input
                    type='text'
                    name='matchotp'
                    value={matchotp}
                    id='matchotp'
                    class='input-text required-entry validate-email'
                    title='matchotp'
                    onChange={e => setMatchOTP(e.target.value)}
                  />
                  <button
                    type='submit'
                    class='button login'
                    title='Login'
                    name='send'
                    id='send2'
                  >
                    <span>Confirm</span>
                  </button>
                </div>
              </div>
            </form>
            {/* <!--col-2 registered-users--> */}
          </fieldset>
          {/* <!--col2-set--> */}
          {/* </form> */}
        </div>
        {/* <!--account-login--> */}
      </div>
      <ToastContainer autoClose={5000} />
    </div>
  )
}

export default RegistrationPage
