import React, { useState, useEffect } from 'react'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Select
} from 'semantic-ui-react'
// import { useDispatch, useSelector } from 'react-redux'
// import { userActions } from '../actions/user.actions'
import axios from 'axios'
function RegistrationPage () {
  // const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [matchPassword, setMatchPassword] = useState('')
  const [gender, setGender] = useState(true)
  const [phone, setPhone] = useState(0)
  const [name, setName] = useState('')
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

  const genderOptions = [
    { key: 'm', text: 'Male', value: true },
    { key: 'f', text: 'Female', value: false }
    // { key: 'o', text: 'Other', value: 'other' }
  ]

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo.png' /> Log-in to your account
        </Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              required
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              value={username}
              onChange={handleChangeUsername}
            />
            <Form.Input
              required
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              value={password}
              onChange={handleChangePassword}
            />
            <Form.Input
              fluid
              required
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              value={matchPassword}
              onChange={handleChangeMatchPassword}
            />
            ;
            <Form.Input
              fluid
              required
              icon='phone'
              iconPosition='left'
              placeholder='Password'
              value={phone}
              onChange={handleChangePhone}
            />
            <Form.Field
              control={Select}
              required
              options={genderOptions}
              label={{
                children: 'Gender',
                htmlFor: 'form-select-control-gender'
              }}
              placeholder='Gender'
              search
              searchInput={{ id: 'form-select-control-gender' }}
              onChange={handleChangeGender}
            />
            <Form.Input
              fluid
              required
              icon='user'
              iconPosition='left'
              placeholder='name'
              value={name}
              onChange={handleChangeName}
            />
            <Form.Input
              fluid
              icon='house'
              required
              iconPosition='left'
              placeholder='address'
              value={address}
              onChange={handleChangeAddress}
            />
            <Form.Checkbox
              required
              label='I agree to the Terms and Conditions'
              // error={{
              //   content: 'You must agree to the terms and conditions',
              //   pointing: 'left'
              // }}
              onChange={handleChangeAgreement}
            />
            <Button color='pink' fluid size='large'>
              Registration
            </Button>
          </Segment>
        </Form>
        {/* <Message>
          New to us? <a href='/'>Sign Up</a>
        </Message> */}
      </Grid.Column>
    </Grid>
  )
}

export default RegistrationPage
