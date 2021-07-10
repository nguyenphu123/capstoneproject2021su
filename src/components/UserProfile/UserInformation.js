import React from 'react'
import {
  Divider,
  Grid,
  Image,
  Header,
  Label,
  Icon,
  Segment,
  Tab
} from 'semantic-ui-react'

// import { makeStyles } from '@material-ui/core/styles'
// import Avatar from '@material-ui/core/Avatar'
import AvatarImageCropper from 'react-avatar-image-cropper'
import 'semantic-ui-css/semantic.min.css'

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
  const panes = [
    {
      menuItem: { key: 'about', icon: 'info circle', content: 'About' },
      render: () => (
        <Tab.Pane attached={false}>
          <Header floated='right' as='h6' icon>
            <Icon name='settings' />
          </Header>

          <Header as='h4' color='grey'>
            Basic Information
          </Header>
          <div style={{ width: '300px' }}>
            <Segment style={{ border: '0px' }} clearing>
              <Header as='h5' floated='left' color='black'>
                Gender:
              </Header>
              <Header as='h5' floated='right' color='grey'>
                {UserInformation.Gender ? <> Male</> : <>Female</>}
              </Header>
            </Segment>
          </div>
          <div style={{ width: '300px' }}>
            <Segment style={{ border: '0px' }} clearing>
              <Header as='h5' floated='left' color='black'>
                Birthday:
              </Header>
              <Header as='h5' floated='right' color='grey'>
                1/1/1990
              </Header>
            </Segment>
          </div>
          <div style={{ width: '300px' }}>
            <Segment style={{ border: '0px' }} clearing>
              <Header as='h5' floated='left' color='black'>
                Identity card:
              </Header>
              <Header as='h5' floated='right' color='grey'>
                123456789
              </Header>
            </Segment>
          </div>

          <Header as='h4' color='grey'>
            Contact Information
          </Header>
          <div style={{ width: '300px' }}>
            <Segment style={{ border: '0px' }} clearing>
              <Header as='h5' floated='left' color='black'>
                Phone number:
              </Header>
              <Header as='h5' floated='right' color='grey'>
                {UserInformation.Phone}
              </Header>
            </Segment>
          </div>
          <div style={{ width: '300px' }}>
            <Segment style={{ border: '0px' }} clearing>
              <Header as='h5' floated='left' color='black'>
                Emali:
              </Header>
              <Header as='h5' floated='right' color='grey'>
                {UserInformation.Email}
              </Header>
            </Segment>
          </div>
          <div style={{ width: '300px' }}>
            <Segment style={{ border: '0px' }} clearing>
              <Header as='h5' floated='left' color='black'>
                Address:
              </Header>
              <Header as='h5' floated='right' color='grey'>
                {UserInformation.Address}
              </Header>
            </Segment>
          </div>
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: 'timeline', icon: 'eye', content: 'Timeline' },
      render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>
    }
  ]

  return (
    <>
      <div style={{ marginLeft: '10px', marginTop: '10px' }}>
        <Grid>
          <Grid.Column width={3}>
            <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
          </Grid.Column>
          <Grid.Column width={11}>
            <Header as='h1'>{UserInformation.Name}</Header>
            <Header as='h5'>
              <Segment style={{ border: '0px' }}>
                <Grid columns={2}>
                  <Grid.Column>
                    <Icon name=' user outline' />
                    {UserInformation.UserName}
                  </Grid.Column>
                  <Grid.Column>
                    <Icon name=' map marker alternate' />
                    {UserInformation.Address}
                  </Grid.Column>
                </Grid>

                <Divider vertical></Divider>
              </Segment>
            </Header>
            <Tab
              menu={{
                color: 'green',
                attached: false,
                tabular: false,
                secondary: true,
                pointing: true
              }}
              panes={panes}
            />
          </Grid.Column>
          <Grid.Column width={2}>
            <Label color={'green'} key={'green'}>
              Active
            </Label>
          </Grid.Column>
        </Grid>
      </div>
    </>
  )
}

export default UserInformation
