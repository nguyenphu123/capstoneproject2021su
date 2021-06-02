import '../../App.css'
import { Link } from 'react-router-dom'
import {
  Container,
  Dropdown,
  Image,
  Menu,
  Search,
  Icon
} from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, logout } from '../../features/User/UserSlice'
const mapDispatch = { logout }

const fixedMenuStyle = {
  backgroundColor: '#eeb6a2'
}
const DropdownTheme = {
  backgroundColor: '#eeb6a2'
}
const UserDropdown = {
  backgroundColor: '#eeb6a2'
}

function NavigationHeader () {
  const dispatch = useDispatch()
  const UserSlice = useSelector(state => state.UserSlice.user)

  const [categorylist, setCategorylist] = useState([])
  const trigger = (
    <span>
      <Icon name='user' /> Hello, {UserSlice.UserName}
    </span>
  )

  const options = [
    {
      key: 'user',
      text: (
        <span>
          Signed in as <strong>{UserSlice.Name}</strong>
        </span>
      ),
      disabled: true
    },
    { key: 'profile', text: 'Your Profile' },
    // { key: 'stars', text: 'Your Stars' },
    // { key: 'explore', text: 'Explore' },
    // { key: 'integrations', text: 'Integrations' },
    // { key: 'help', text: 'Help' },
    // { key: 'settings', text: 'Settings' },
    { key: 'sign-out', text: 'Sign Out' }
  ]
  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/category-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
    })
  }, [])

  return (
    <>
      <Menu fixed='top' style={fixedMenuStyle} inverted>
        <Container>
          <Menu.Item header>
            <Link to='/'>
              <Image
                size='mini'
                src='assets/img/logo.png'
                style={{ marginRight: '1.5em', width: '100px' }}
              />
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/'>About Us</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/'>Our Store</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/ImageUploading'>Search With Image</Link>
          </Menu.Item>

          <Dropdown text='Shopping' item simple>
            <Dropdown.Menu style={DropdownTheme}>
              <Dropdown.Item>
                <Link to='/Category/categoryId'>Category1</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to='/Category/categoryId'>Category2</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to='/'>Home</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item>
            <Search
            // loading={loading}
            // onResultSelect={(e, data) =>
            //   dispatch({
            //     type: 'UPDATE_SELECTION',
            //     selection: data.result.title
            //   })
            // }
            // onSearchChange={handleSearchChange}
            // results={results}
            // value={value}
            />
          </Menu.Item>
          {UserSlice === undefined ? (
            <>
              <Menu.Item>
                <Link to='/Login'>Login</Link>
              </Menu.Item>

              <Menu.Item>
                <Link to='/Registration'>Register</Link>
              </Menu.Item>
            </>
          ) : (
            <Menu.Item>
              <Dropdown trigger={trigger}>
                <Dropdown.Menu style={UserDropdown}>
                  <Dropdown.Item>
                    <span>
                      Signed in as <strong>{UserSlice.Name}</strong>
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to='/Profile'>Profile</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to='/OrderHistory'>Orders</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to='/'>Sign out</Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          )}

          <Menu.Item>
            <Link to='/'>
              <span class='icon_heart_alt'></span>
              <div class='tip'>2</div>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/Cart'>
              <span class='icon_bag_alt'></span>
              <div class='tip'>2</div>
            </Link>
          </Menu.Item>
        </Container>
      </Menu>
    </>
  )
}

export default NavigationHeader
