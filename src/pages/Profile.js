import '../App.css'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Tab } from 'semantic-ui-react'

import UserNewPassword from '../components/UserProfile/UserNewPassword'
import UserInformation from '../components/UserProfile/UserInformation'
import UserAddress from '../components/UserProfile/UserAddress'

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
    {
      menuItem: 'Addresses',
      render: () => (
        <Tab.Pane>
          <UserAddress />
        </Tab.Pane>
      )
    },
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
    <div style={{ marginTop: '200px' }}>
      <Tab
        menu={{ fluid: true, vertical: true, tabular: true }}
        panes={panes}
      />
    </div>
  )
}

export default Profile
