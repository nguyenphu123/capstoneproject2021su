import '../../App.css'
import { Link } from 'react-router-dom'
import {
  Container,
  Dropdown,
  Image,
  Menu,
  Search,
  Icon,
  Button,
  List,
  Grid,
  Input,
  Sticky
} from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, logout } from '../../features/User/UserSlice'
const mapDispatch = { logout, loginUser }

const fixedMenuStyle = {
  backgroundColor: '#000000',
  heigth: '20px'
}

const UserDropdown = {
  backgroundColor: '#000000'
}

function NavigationHeader () {
  const dispatch = useDispatch()
  const UserSlice = useSelector(state => state.UserSlice.user)
  const CartSlice = useSelector(state => state.CartSlice.cart)

  const [categorylist, setCategorylist] = useState([])

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/category-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      setCategorylist(res.data)
    })
  }, [])
  var size = 5
  var items = categorylist.slice(0, size).map(({ Id, Name, SubCategories }) => {
    return (
      <Menu.Item as='a'>
        <Dropdown trigger={<Link to={'/Category/' + Id}>{Name}</Link>}>
          <Dropdown.Menu style={UserDropdown}>
            {SubCategories.map(({ Id, Name, SubCategories }) => {
              return (
                <Menu.Item as='a'>
                  <Link to={'/Category/' + Id}>{Name}</Link>
                </Menu.Item>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    )
  })

  console.log(UserSlice)
  function Logout () {
    console.log('hello')
    dispatch(logout())
  }
  return (
    <Sticky>
      <div
        style={{
          backgroundColor: '#000000',
          width: '70.7%',
          marginLeft: '280px'
        }}
      >
        <Menu style={{ backgroundColor: '#000000' }} inverted secondery>
          <Container>
            <Menu.Item header>
              <Link to='/'>
                <Image
                  size='mini'
                  src='https://shop.jaguars.com/content/content/shop.jaguars.com/shop.jaguars.com.svg'
                  style={{ width: '200px', heigth: '50px' }}
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
            <Menu.Item>
              <Input
                style={{ width: '350px' }}
                icon={<Icon name='search' inverted circular link />}
                placeholder='Search...'
              />
            </Menu.Item>
            {UserSlice === null ? (
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
                <Dropdown
                  trigger={
                    <span>
                      <Icon name='user' /> Hello, {UserSlice.UserName}
                    </span>
                  }
                >
                  <Dropdown.Menu style={UserDropdown}>
                    <Dropdown.Item>
                      <Link to='/Profile'>Profile</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to='/OrderHistory'>Orders</Link>
                    </Dropdown.Item>
                    <Dropdown.Item
                      style={{ color: '#ffffff' }}
                      as='a'
                      onClick={() => dispatch(logout())}
                    >
                      <a>Sign out</a>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            )}

            <Menu.Item>
              <Link to='/Cart'>
                <span class='icon_bag_alt'></span>
                <div class='tip'>
                  {CartSlice === null || CartSlice.length === 0
                    ? 0
                    : CartSlice.legth}
                </div>
              </Link>
            </Menu.Item>
          </Container>
        </Menu>
        <Menu inverted style={{ backgroundColor: '#006778' }}>
          <Container>
            {items}
            <Menu.Item>
              <Link to='/Categories'>See more</Link>
            </Menu.Item>
          </Container>
        </Menu>
      </div>
    </Sticky>
  )
}

export default NavigationHeader
