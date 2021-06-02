import '../../App.css'
import { NavLink } from 'react-router-dom'
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
            <NavLink to='/'>
              <Image
                size='mini'
                src='assets/img/logo.png'
                style={{ marginRight: '1.5em', width: '100px' }}
              />
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to='/'>Home</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to='/'>About Us</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to='/'>Our Store</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to='/ImageUploading'>Search With Image</NavLink>
          </Menu.Item>

          <Dropdown text='Shopping' item simple>
            <Dropdown.Menu style={DropdownTheme}>
              <Dropdown.Item>
                <NavLink to='/Category/categoryId'>Category1</NavLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavLink to='/Category/categoryId'>Category2</NavLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavLink to='/'>Home</NavLink>
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
          {UserSlice === null ? (
            <>
              <Menu.Item>
                <NavLink to='/Login'>Login</NavLink>
              </Menu.Item>

              <Menu.Item>
                <NavLink to='/Registration'>Register</NavLink>
              </Menu.Item>
            </>
          ) : (
            <Menu.Item>
              <Dropdown
                trigger={
                  <span>
                    <Icon name='user' /> Hello, {UserSlice.UserName}
                  </span>
                }
              >
                <Dropdown.Menu style={UserDropdown}>
                  <Dropdown.Item disabled>
                    <span>
                      Signed in as <strong>{UserSlice.Name}</strong>
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <NavLink to='/Profile'>Profile</NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <NavLink to='/OrderHistory'>Orders</NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item onclick={dispatch(logout())}>
                    Sign out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          )}

          <Menu.Item>
            <NavLink to='/'>
              <span class='icon_heart_alt'></span>
              <div class='tip'>2</div>
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to='/Cart'>
              <span class='icon_bag_alt'></span>
              <div class='tip'>2</div>
            </NavLink>
          </Menu.Item>
        </Container>
      </Menu>
    </>
  )
}

export default NavigationHeader
