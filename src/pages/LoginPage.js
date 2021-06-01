import React, { useState, useEffect } from 'react'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react'
// import { useDispatch, useSelector } from 'react-redux'
// import { userActions } from '../actions/user.actions'
import axios from 'axios'
function LoginPage () {
  // const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
      Password: password
    }
    if (username && password) {
      // get return url from location state or default to home page
      axios({
        method: 'post',
        url: '/api/login-management',
        headers: {},
        data: authData
      }).then(res => {
        console.log(res)
        console.log(res.data)
      })

      // dispatch(userActions.login(username, password))
    }
  }
  function handleChangeUsername (e, { value }) {
    setUsername(value)
  }
  function handleChangePassword (e, { value }) {
    setPassword(value)
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
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
          New to us? <a href='/'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default LoginPage
