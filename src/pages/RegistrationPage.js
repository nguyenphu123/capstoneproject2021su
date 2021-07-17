import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Segment,
  Select
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import emailjs from 'emailjs-com'


// import { useDispatch, useSelector } from 'react-redux'
// import { userActions } from '../actions/user.actions'
function RegistrationPage () {
  // const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [matchPassword, setMatchPassword] = useState('')
  const [gender, setGender] = useState(true)
  const [phone, setPhone] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [address, setAddress] = useState('')
  const [agreement, setAgreement] = useState(false)

  // const [user, setUser] = useState()

  // const location = useLocation()

  // reset login status
  useEffect(() => {
    // dispatch(userActions.logout())
  }, [])

  function handleChange (e) {
    // const { name, value } = e.target
    // setInputs(inputs => ({ ...inputs, [name]: value }))
  }

  function handleSubmit (e) {
    // e.preventDefault()
    console.log(username)
    console.log(password)
    const authData = {
      UserName: username,
      PassWord: password,
      RankId: 1,
      RoleId: 1,
      Name: name,
      Phone: phone,
      Address: address,
      Gender: gender,
      Point: 20
    }
    if (username && password && name && address) {
      axios({
        method: 'post',
        url: '/api/user-management/users',
        headers: {},
        data: authData
      }).then(res => {
        console.log(res)
        console.log(res.data)
        toast.success('thank you for your registration')
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
      })
    } else {
    }
  }
  function handleChangeUsername (e, { value }) {
    setUsername(value)
  }
  function handleChangePassword (e, { value }) {
    setPassword(value)
  }
  function handleChangeMatchPassword (e, { value }) {
    setMatchPassword(value)
    if (password === matchPassword) {
    } else if (password !== matchPassword) {
    } else {
    }
  }
  function handleChangeGender (e, { value }) {
    setGender(value)
  }

  function handleChangeName (e, { value }) {
    setName(value)
  }
  function handleChangeAddress (e, { value }) {
    setAddress(value)
  }
  function handleChangeAgreement (e, { value }) {
    setAgreement(value)
  }
  function handleChangePhone (e, { value }) {
    setPhone(value)
  }
  function handleChangeEmail (e, { value }) {
    setEmail(value)
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
            <div class='col-1 registered-users'>
              <strong>Registration Customers</strong>
              <div class='content'>
                <p>Create Account.</p>
                <ul class='form-list'>
                  <li>
                    <label for='email'>
                      UserName<em class='required'>*</em>
                    </label>
                    <div class='input-box'>
                      <input
                        type='text'
                        name='login[username]'
                        value={username}
                        id='email'
                        class='input-text required-entry validate-email'
                        title='Email Address'
                        onChange={e => setUsername(e.target.value)}
                      />
                    </div>
                    <label for='email'>
                      Gender<em class='required'>*</em>
                    </label>
                    <input
                      type='radio'
                      name='billing[use_for_shipping]'
                      id='billing:use_for_shipping_yes'
                      value={gender}
                      checked='checked'
                      title='gender'
                      onClick={e => setGender(e.target.value)}
                      class='radio'
                    />
                    <label for='email'>Male</label>
                  </li>
                  <li>
                    <label for='pass'>
                      Password<em class='required'>*</em>
                    </label>
                    <div class='input-box'>
                      <input
                        value={password}
                        type='password'
                        name='login[password]'
                        class='input-text required-entry validate-password'
                        id='pass'
                        title='Password'
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                  </li>
                  <li>
                    <label for='pass'>
                      Password confirm<em class='required'>*</em>
                    </label>
                    <div class='input-box'>
                      <input
                        value={matchPassword}
                        type='password'
                        name='login[password]'
                        class='input-text required-entry validate-password'
                        id='pass'
                        title='Password'
                        onChange={handleChangeMatchPassword}
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
                        name='login[username]'
                        value={address}
                        id='email'
                        class='input-text required-entry validate-email'
                        title='Email Address'
                        onChange={e => setAddress(e.target.value)}
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
                        name='login[username]'
                        value={email}
                        id='email'
                        class='input-text required-entry validate-email'
                        title='Email Address'
                        onChange={e => setEmail(e.target.value)}
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
                        name='login[username]'
                        value={phone}
                        id='phone'
                        class='input-text required-entry validate-email'
                        title='Email Address'
                        onChange={e => setPhone(e.target.value)}
                      />
                    </div>
                  </li>
                </ul>
                <div class='remember-me-popup'>
                  <div class='remember-me-popup-head'>
                    <h3 id='text2'>What's this?</h3>
                    <Link
                      to={' '}
                      class='remember-me-popup-close'
                      onClick='showDiv()'
                      title='Close'
                    >
                      Close
                    </Link>
                  </div>
                  <div class='remember-me-popup-body'>
                    <p id='text1'>I have read all of the policies and rules</p>
                    <div class='remember-me-popup-close-button a-right'>
                      <Link
                        to={' '}
                        class='remember-me-popup-close button'
                        title='Close'
                        onClick='showDiv()'
                      >
                        <span>Close</span>
                      </Link>
                    </div>
                  </div>
                </div>

                <p class='required'>* Required Fields</p>

                {/* <!--buttons-set--> */}
              </div>
              {/* <!--content--> */}
            </div>
            <div class='col-2 new-users'>
              <div class='buttons-set'>
                <form onSubmit={handleSubmit}>
                  <button
                    type='submit'
                    class='button login'
                    title='Login'
                    name='send'
                    id='send2'
                  >
                    <span>Registration</span>
                  </button>

                  <input
                    type='text'
                    name='Name'
                    value={email}
                    id='email'
                    title='Email'
                    class='input-text required-entry'
                    style={{ visibility: 'hidden' }}
                  />
                </form>
              </div>

              <strong>Or</strong>
              <div class='content'>
                <div class='buttons-set'>
                  <br />
                  <button
                    style={{ marginTop: '10px' }}
                    type='button'
                    title='Create an Account'
                    class='button create-account'
                    onClick=''
                  >
                    <span>
                      <span>Registration with google</span>
                    </span>
                  </button>
                  <br />

                  <button
                    style={{ marginTop: '10px' }}
                    type='button'
                    title='Create an Account'
                    class='button create-account'
                    onClick=''
                  >
                    <span>
                      <span>Registration with facebook</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
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
