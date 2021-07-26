import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import {
  Divider,
  Grid,
  Image,
  Header,
  Label,
  Icon,
  Segment,
  Tab,
  Input,
  Dropdown,
  Button
} from 'semantic-ui-react'
import '../../App.css'

// import { makeStyles } from '@material-ui/core/styles'
// import Avatar from '@material-ui/core/Avatar'

import 'semantic-ui-css/semantic.min.css'
import { useDispatch } from 'react-redux'
import { updateUserInformation } from '../../features/User/UserSlice'
import axios from 'axios'

const mapDispatch = { updateUserInformation }

function UserInformation ({ UserInformation }) {
  const dispatch = useDispatch()

  const genderOptions = [
    { key: 'm', text: 'Male', value: true },
    { key: 'f', text: 'Female', value: false }
  ]
  const [edit, setEdit] = useState(false)
  const [gender, setGender] = useState(UserInformation.Gender)
  const [email, setEmail] = useState(UserInformation.Email)
  const [phone, setPhone] = useState(UserInformation.Phone)
  const [name, setName] = useState(UserInformation.Name)

  useEffect(() => {
    setEdit(edit => edit)
  }, [edit])

  useEffect(() => {
    setGender(gender => gender)
  }, [gender])
  useEffect(() => {
    setEmail(email => email)
  }, [email])
  useEffect(() => {
    setPhone(phone => phone)
  }, [phone])
  useEffect(() => {
    setName(name => name)
  }, [name])

  const handleChangeGender = (e, { value }) => setGender(value)
  const handleChangePhone = (e, { value }) => setPhone(value)
  const handleChangeEmail = (e, { value }) => setEmail(value)
  const handleChangeName = (e, { value }) => setName(value)
  function onSubmitChange () {
    if (email === '') {
      toast.warn('Sorry email are empty')
    } else {
      if (phone === '') {
        toast.warn('Sorry phone are empty')
      } else {
        if (name === '') {
          toast.warn('Sorry name are empty')
        } else {
          var reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

          var test = reg.test(email)
          if (test) {
            const authData = {
              Id: UserInformation.Id,
              UserName: UserInformation.UserName,
              PassWord: UserInformation.PassWord,
              RankId: UserInformation.RankId,
              RoleId: UserInformation.RoleId,
              Name: name,
              Phone: phone,
              Address: UserInformation.Address,
              Gender: gender,
              Point: UserInformation.Point,
              Email: email,
              Rank: null,
              Role: null,
              Orders: null
            }

            axios({
              method: 'put',
              url: '/api/user-management/users',
              headers: {},
              data: authData
            })
              .then(res => {
                dispatch(updateUserInformation(authData))

                toast.success('Change information successful')
              })
              .catch(function (error) {
                console.log('Show error notification!')
                return Promise.reject(error)
              })
          } else {
            toast.warn('email must include @mail.com')
          }
        }
      }
    }
  }

  const panes = [
    {
      menuItem: { key: 'about', icon: 'info circle', content: 'About' },
      render: () => (
        <Tab.Pane attached={false}>
          <Header floated='right' as='h6' icon>
            <Icon name='settings' onClick={() => setEdit(!edit)} />
          </Header>
          <Header as='h4' color='grey'>
            Basic Information
          </Header>
          <div style={{ width: '300px' }}>
            <Segment style={{ border: '0px' }} clearing>
              <Header as='h4' floated='left' color='black'>
                Name:
              </Header>
              <Header as='h4' floated='right' color='grey'>
                <Input
                  onChange={handleChangeName}
                  placeholder='Phone'
                  disabled={!edit}
                  value={name}
                />
              </Header>
            </Segment>
          </div>
          <div style={{ width: '300px' }}>
            <Segment style={{ border: '0px' }} clearing>
              <Header as='h4' floated='left' color='black'>
                Gender:
              </Header>
              <Header as='h4' floated='right' color='grey'>
                <Dropdown
                  onChange={handleChangeGender}
                  options={genderOptions}
                  placeholder='Choose an option'
                  selection
                  disabled={!edit}
                  value={gender}
                />
              </Header>
            </Segment>
          </div>
          {/* <div style={{ width: '300px' }}>
            <Segment style={{ border: '0px' }} clearing>
              <Header as='h5' floated='left' color='black'>
                Birthday:
              </Header>
              <Header as='h5' floated='right' color='grey'>
                1/1/1990
              </Header>
            </Segment>
          </div> */}
          <Header as='h4' color='grey'>
            Contact Information
          </Header>
          <div style={{ width: '300px' }}>
            <Segment style={{ border: '0px' }} clearing>
              <Header as='h4' floated='left' color='black'>
                Phone :
              </Header>
              <Header as='h4' floated='right' color='grey'>
                <Input
                  onChange={handleChangePhone}
                  placeholder='Phone'
                  disabled={!edit}
                  value={phone}
                />
              </Header>
            </Segment>
          </div>
          <div style={{ width: '300px' }}>
            <Segment style={{ border: '0px' }} clearing>
              <Header as='h4' floated='left' color='black'>
                Email:
              </Header>
              <Header as='h4' floated='right' color='grey'>
                <Input
                  onChange={handleChangeEmail}
                  placeholder='Email'
                  disabled={!edit}
                  value={email}
                />
              </Header>
            </Segment>
          </div>
          <div style={{ width: '300px' }}>
            <Segment style={{ border: '0px' }} clearing>
              <Header as='h4' floated='left' color='black'>
                Address:
              </Header>
              <Header as='h4' floated='right' color='grey'>
                {UserInformation.Address}
              </Header>
            </Segment>
          </div>
          {edit ? (
            <Button size='big' onClick={onSubmitChange} primary>
              Save
            </Button>
          ) : null}
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
            <Header as='h1'>{name}</Header>
            <Header as='h4'>
              <Segment style={{ border: '0px' }}>
                <Grid columns={2}>
                  <Grid.Column>
                    <Icon name=' user outline' />
                    <Header as='h1'>{UserInformation.UserName}</Header>
                  </Grid.Column>
                  <Grid.Column>
                    <Icon name=' map marker alternate' />
                    <Header as='h1'>{UserInformation.Address}</Header>
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
      <ToastContainer autoClose={5000} />
    </>
  )
}

export default UserInformation
