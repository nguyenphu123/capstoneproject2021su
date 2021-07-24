import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Tab, Header } from 'semantic-ui-react'

import UserNewPassword from '../components/UserProfile/UserNewPassword'
import UserInformation from '../components/UserProfile/UserInformation'
import UserAddress from '../components/UserProfile/UserAddress'
import 'semantic-ui-css/semantic.min.css'

function Profile () {
  const UserSlice = useSelector(state => state.UserSlice.user)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (UserSlice) {
      setIsLoading(false)
    } else {
    }
  }, [UserSlice])
  if (isLoading) {
    return <div style={{ marginTop: '200px' }}>...Is Loading please wait</div>
  } else {
    const panes = [
      {
        menuItem: {
          key: 'users',
          icon: 'users',
          content: <Header as='h3'>Information</Header>
        },
        render: () => (
          <Tab.Pane>
            <UserInformation UserInformation={UserSlice} />
          </Tab.Pane>
        )
      },
      {
        menuItem: {
          key: 'address',
          icon: 'home',
          content: <Header as='h3'>Address</Header>
        },
        render: () => (
          <Tab.Pane>
            <UserAddress UserInformation={UserSlice} />
          </Tab.Pane>
        )
      },
      // {
      //   menuItem: 'Payment Account',
      //   render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>
      // },
      {
        menuItem: {
          key: 'pass',
          icon: 'lock',
          content: <Header as='h3'>Password</Header>
        },
        render: () => (
          <Tab.Pane>
            <UserNewPassword UserInformation={UserSlice} />
          </Tab.Pane>
        )
      }
    ]

    return (
      <div style={{ marginTop: '30px' }}>
        <Tab
          menu={{ fluid: true, vertical: true, tabular: true }}
          panes={panes}
        />
      </div>
    )
  }
}

export default Profile
