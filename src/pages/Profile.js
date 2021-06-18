import '../App.css'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Tab } from 'semantic-ui-react'

import { UserInformation, UserNewPassword } from '../components/UserProfile'

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
