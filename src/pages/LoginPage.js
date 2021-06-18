import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
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
  const alert = useAlert()

  // const location = useLocation()

  // reset login status
  useEffect(() => {
    // dispatch(userActions.logout())
  }, [])
  useEffect(() => {
    alert.success('Wellcome ' + UserSlice.UserName)
  }, [UserSlice])

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(clearState())
  //     history.push('/')
  //   }

  //   if (isError) {
  //     toast.error(errorMessage)
  //     dispatch(clearState())
  //   }
  // }, [isSuccess, isError])

  function handleChange (e) {
    // const { name, value } = e.target
    // setInputs(inputs => ({ ...inputs, [name]: value }))
  }

  function handleSubmit (e) {
    // e.preventDefault()

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
    return <Redirect to={'/'} />
  } else {
    return (
      <div style={{ marginTop: '200px' }}>
        <Segment placeholder>
          <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
              <Header as='h2' color='teal' textAlign='center'>
                <Image src='/logo.png' /> Log-in to your account
              </Header>
              <Form size='large' onSubmit={handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='E-mail address'
                    value={username}
                    onChange={handleChangeUsername}
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    value={password}
                    onChange={handleChangePassword}
                  />

                  <Button color='pink' fluid size='large'>
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                New to us? <a href='/Registration'>Sign Up</a>
              </Message>
            </Grid.Column>
            <Grid.Column verticalAlign='middle'>
              Login with
              <Button
                color='facebook'
                style={{ width: '150px', marginTop: '10px' }}
              >
                <Icon name='facebook' /> Facebook
              </Button>
              <Button
                color='twitter'
                style={{ width: '150px', marginTop: '10px' }}
              >
                <Icon name='twitter' /> Twitter
              </Button>
              <Button
                color='google plus'
                style={{ width: '150px', marginTop: '10px' }}
              >
                <Icon name='google plus' /> Google Plus
              </Button>
            </Grid.Column>
          </Grid>
          <Divider vertical>Or</Divider>
        </Segment>
      </div>
    )
  }
}
export default LoginPage
