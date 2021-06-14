import React, { useState, useEffect } from 'react'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Divider,
  Icon
} from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, logout } from '../features/User/UserSlice'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const mapDispatch = { loginUser }

function LoginPage () {
  // const dispatch = useDispatch()
  const dispatch = useDispatch()
  const UserSlice = useSelector(state => state.UserSlice.user)
  // const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState()

  // const location = useLocation()

  // reset login status
  useEffect(() => {
    // dispatch(userActions.logout())
  }, [])
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
    )
  }
}
export default LoginPage
