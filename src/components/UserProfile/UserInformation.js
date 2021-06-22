import React from 'react'
import {
  Button,
  Form,
  Input,
  Select,
  Grid,
  Segment,
  Divider
} from 'semantic-ui-react'
// import { makeStyles } from '@material-ui/core/styles'
// import Avatar from '@material-ui/core/Avatar'
import AvatarImageCropper from 'react-avatar-image-cropper'

import Title from '../../Assets/Title'
function UserInformation ({ UserInformation }) {
  const genderOptions = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' }
  ]
  // const useStyles = makeStyles(theme => ({
  //   root: {
  //     display: 'flex',
  //     '& > *': {
  //       margin: theme.spacing(2)
  //     }
  //   },
  //   large: {
  //     width: theme.spacing(7),
  //     height: theme.spacing(7)
  //   }
  // }))
  // const classes = useStyles()
  function apply (file) {
    // handle the blob file you want
    // such as get the image src
    var src = window.URL.createObjectURL(file)
  }

  return (
    <>
      <Segment placeholder>
        <Title Name='User information' />
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
            <Form>
              <Form.Input
                id='form-input-control-first-name'
                label='First name'
                placeholder='First name'
              />
              <Form.Input
                id='form-input-control-last-name'
                label='Last name'
                placeholder='Last name'
              />
              <Form.Field
                control={Select}
                options={genderOptions}
                label={{
                  children: 'Gender',
                  htmlFor: 'form-select-control-gender'
                }}
                placeholder='Gender'
                search
                searchInput={{ id: 'form-select-control-gender' }}
              />

              <Form.Input
                id='form-input-control-error-email'
                control={Input}
                label='Email'
                placeholder='email'
              />
              <Form.Input
                id='form-input-control-first-name'
                label='Phone number'
                placeholder='Phone number'
              />

              <Button color='pink' size='large'>
                Confirm
              </Button>
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign='middle'>
            <div
              style={{
                width: '250px',
                height: '250px',
                margin: 'auto',
                border: '1px solid black'
              }}
            >
              <AvatarImageCropper apply={apply} />
            </div>
          </Grid.Column>
        </Grid>

        <Divider vertical></Divider>
      </Segment>
    </>
  )
}

export default UserInformation
