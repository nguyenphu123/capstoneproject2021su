import '../App.css'
import {
  Item,
  Header,
  Button,
  Divider,
  Tab,
  Segment,
  Icon
} from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { UserInformation, UserNewPassword } from '../components/UserProfile'
import { Visa, Mastercard, Paypal, AtmMomo, GrabPay } from 'react-pay-icons'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

function Profile () {
  const UserSlice = useSelector(state => state.UserSlice.user)
  useEffect(() => {}, [UserSlice])

  const panes = [
    {
      menuItem: 'Information',
      render: () => (
        <Tab.Pane>
          <UserInformation />
        </Tab.Pane>
      )
    },
    { menuItem: 'Addresses', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    {
      menuItem: 'Paymant Account',
      render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>
    },
    {
      menuItem: 'Change Password',
      render: () => (
        <Tab.Pane>
          <UserNewPassword />
        </Tab.Pane>
      )
    }
  ]

  return (
    <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
  )
}

export default Profile
