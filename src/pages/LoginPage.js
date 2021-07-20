import React, { useEffect, useState } from 'react'
// import { useAlert } from 'react-alert'
import 'react-notifications/lib/notifications.css'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { Link } from 'react-router-dom'
import Modal from 'react-awesome-modal'
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
import RegistrationPage from './RegistrationPage'
import { loginUser } from '../features/User/UserSlice'
import { ToastContainer, toast } from 'react-toastify'
var SHA256 = require('crypto-js/sha256')

const mapDispatch = { loginUser }

function LoginPage () {
  // const dispatch = useDispatch()
  const dispatch = useDispatch()
  const UserSlice = useSelector(state => state.UserSlice.user)
  const UserSliceError = useSelector(state => state.UserSlice.error)

  // const history = useHistory()
  const [visibility, setVisibility] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState()
  // const alert = useAlert()

  // const location = useLocation()

  // reset login status
  useEffect(() => {
    if (UserSlice) {
      toast.success('Welcome' + UserSlice.Name)
    }
  }, [UserSlice])
  useEffect(() => {
    console.log(UserSliceError)

    if (UserSliceError !== null) {
      toast.warn('Wrong username or password')
    }
  }, [UserSliceError])

  function handleSubmit (e) {
    const authData = {
      UserName: username,
      Password: SHA256(password).toString()
    }

    if (username && password) {
      dispatch(loginUser(authData))
    } else {
      toast.warn('Please fill all required information')
    }
  }
  function handleChangeUsername (e, { value }) {
    setUsername(value)
  }
  function handleChangePassword (e, { value }) {
    setPassword(value)
  }
  function SetLoginForm (e) {
    e.stopPropagation()
    setVisibility(!visibility)
  }

  if (UserSlice) {
    return (
      <>
        <ToastContainer autoClose={5000} />

        <Redirect to={'/'} />
      </>
    )
  } else {
    return (
      <>
        <Modal
          visible={visibility}
          width='1000'
          height='700'
          effect='fadeInUp'
          onClickAway={SetLoginForm}
        >
          <div>
            <a href='javascript:void(0);' onClick={SetLoginForm}>
              Close
            </a>

            <RegistrationPage />
          </div>
        </Modal>

        <div class='main-container col1-layout wow bounceInUp animated animated'>
          <div class='main'>
            <div class='account-login container'>
              {/* <!--page-title--> */}

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
                        onClick={SetLoginForm}
                      >
                        <span>
                          <span>Create an Account</span>
                        </span>
                      </button>
                      <br />
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
      </>
    )
  }
}
export default LoginPage
