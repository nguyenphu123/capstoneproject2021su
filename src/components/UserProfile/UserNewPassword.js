import React from 'react'
import { Button, Form } from 'semantic-ui-react'

function UserNewPassword () {
  const genderOptions = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' }
  ]

  return (
    <Form>
      <Form.Group widths='equal'>
        <Form.Input
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
          icon='lock'
          iconPosition='left'
          placeholder='Password'
          type='password'
          value={password}
          onChange={handleChangePassword}
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
          Change
        </Button>
      </Form.Group>
    </Form>
  )
}

export default UserNewPassword
