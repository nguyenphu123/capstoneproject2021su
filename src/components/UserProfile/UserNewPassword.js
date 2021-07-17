import React from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'
import Title from '../../Assets/Title'
import 'semantic-ui-css/semantic.min.css'


function UserNewPassword ({ password }) {
  const genderOptions = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' }
  ]

  return (
    <>
      <Title Name='Reset Password ?' />

      <Form size='large'>
        <Form.Input
          fluid
          icon='lock'
          iconPosition='left'
          placeholder='Password'
          type='password'
          value={password}
          label='Current password'

          // onChange={handleChangePassword}
        />

        <Form.Input
          fluid
          icon='lock'
          iconPosition='left'
          placeholder='New Password'
          type='password'
          value={password}
          label='New Password'

          // onChange={handleChangePassword}
        />

        <Form.Input
          fluid
          icon='lock'
          iconPosition='left'
          placeholder='Reapet new Password'
          type='password'
          value={password}
          label='Re enter new password'

          // onChange={handleChangePassword}
        />
        <Button color='pink' size='large'>
          Change
        </Button>
      </Form>
    </>
  )
}

export default UserNewPassword
