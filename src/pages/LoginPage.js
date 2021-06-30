import React, { useEffect, useState } from 'react'
// import { useAlert } from 'react-alert'
import 'react-notifications/lib/notifications.css'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Message,
  Segment
} from 'semantic-ui-react'

import { loginUser } from '../features/User/UserSlice'

const mapDispatch = { loginUser }

function LoginPage () {
  // const dispatch = useDispatch()
  const dispatch = useDispatch()
  const UserSlice = useSelector(state => state.UserSlice.user)
  // const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState()
  // const alert = useAlert()

  // const location = useLocation()

  // reset login status
  useEffect(() => {
    // dispatch(userActions.logout())
  }, [])
  

  function handleChange (e) {}

  function handleSubmit (e) {
    const authData = {
      UserName: username,
      Password: password
    }

    if (username && password) {
      dispatch(loginUser(authData))
    }
  }
  function handleChangeUsername (e, { value }) {
    setUsername(value)
  }
  function handleChangePassword (e, { value }) {
    setPassword(value)
  }
  console.log(UserSlice)
  if (UserSlice) {
    return (
      <>
        <Redirect to={'/'} />
      </>
    )
  } else {
    return (
      <div class='main-container col1-layout wow bounceInUp animated animated'>
        <div class='main'>
          <div class='account-login container'>
            {/* <!--page-title--> */}

            {/* <form action='' method='post' id='login-form'> */}
              <input name='form_key' type='hidden' value='EPYwQxF6xoWcjLUr' />
              <fieldset class='col2-set'>
                <div class='col-1 registered-users'>
                  <strong>Registered Customers</strong>
                  <div class='content'>
                    <p>If you have an account with us, please log in.</p>
                    <ul class='form-list'>
                      <li>
                        <label for='email'>
                          Email Address<em class='required'>*</em>
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
                        <p id='text1'>
                          Checking "Remember Me" will let you access your
                          shopping cart on this computer when you are logged out
                        </p>
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

                    <div class='buttons-set'>
                      <button
                        type='submit'
                        class='button login'
                        title='Login'
                        name='send'
                        id='send2'
                        onClick={handleSubmit}
                      >
                        <span>Login</span>
                      </button>

                      <Link to={' '} class='forgot-word'>
                        Forgot Your Password?
                      </Link>
                    </div>
                    {/* <!--buttons-set--> */}
                  </div>
                  {/* <!--content--> */}
                </div>
                <div class='col-2 new-users'>
                  <strong>Or</strong>
                  <div class='content'>
                    <div class='buttons-set'>
                      <button
                        style={{ marginTop: '10px' }}
                        type='button'
                        title='Create an Account'
                        class='button create-account'
                        onClick=''
                      >
                        <span>
                          <span>Create an Account</span>
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
                          <span>Login with google</span>
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
                          <span>Login with facebook</span>
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
      </div>
    )
  }
}
export default LoginPage
