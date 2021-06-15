import '../../App.css'
// import { Link } from 'react-router-dom'
import { Image, Search, Icon } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, logout } from '../../features/User/UserSlice'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import { Button, Menu, MenuItem, TextField } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Fade from '@material-ui/core/Fade'
import Popover from '@material-ui/core/Popover'
import Drawer from '@material-ui/core/Drawer'

import {
  usePopupState,
  bindHover,
  bindPopover,
  bindMenu
} from 'material-ui-popup-state/hooks'
const mapDispatch = { logout, loginUser }

const ITEM_HEIGHT = 48

function NavigationHeader () {
  const dispatch = useDispatch()
  const UserSlice = useSelector(state => state.UserSlice.user)
  const CartSlice = useSelector(state => state.CartSlice.cart)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorElProfile, setAnchorElProfile] = React.useState(null)

  const [categorylist, setCategorylist] = useState([])
  const open = Boolean(anchorElProfile)
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover'
  })

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
  var size = 8
  const useStyles = makeStyles(theme => ({
    toolbar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: '#ffffff'
    },
    toolbarTop: {
      backgroundColor: '#ffffff',
      height: 5
    },
    toolbarTitle: {
      flex: 0.4
    },
    Search: {
      flex: 1
    },
    fakeflex: {
      flex: 1
    },
    toolbarSecondary: {
      justifyContent: 'space-between',
      overflowX: 'auto',
      backgroundColor: '#ffffff'
    },
    toolbarLink: {
      padding: theme.spacing(1),
      flexShrink: 0,
      fontSize: '50px'
    },
    popover: {
      pointerEvents: 'none'
    },
    paper: {
      padding: theme.spacing(1)
    }
  }))

  const classes = useStyles()

  const handleMouseClickProfile = event => {
    setAnchorElProfile(event.currentTarget)
  }

  const handleCloseProfile = () => {
    setAnchorElProfile(null)
  }
  const handleMouseOver = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  function Logout () {
    console.log('hello')
    dispatch(logout())
  }
  return (
    <div
      style={{
        backgroundColor: '#f53d2d',width: '100%'

      }}
    >
      <React.Fragment>
        <Toolbar className={classes.toolbarTop}>
          {/* <Link to='/'>
          <Image
            size='mini'
            src='https://shop.jaguars.com/content/content/shop.jaguars.com/shop.jaguars.com.svg'
            style={{ width: '200px', heigth: '50px' }}
          />
        </Link> */}
          <Typography
            component='h2'
            variant='h5'
            color='inherit'
            align='center'
            noWrap
            className={classes.toolbarTitle}
          >
            <Link
              color='inherit'
              noWrap
              variant='body2'
              href={'/Login'}
              className={classes.toolbarLink}
            >
              <Button variant='outlined' size='small'>
                About Us
              </Button>
            </Link>
            <Link
              color='inherit'
              noWrap
              variant='body2'
              href={'/ImageUploading'}
              className={classes.toolbarLink}
            >
              <Button variant='outlined' size='small'>
                Search With Image
              </Button>
            </Link>
          </Typography>

          <Typography
            component='h2'
            variant='h5'
            color='inherit'
            align='center'
            noWrap
            className={classes.fakeflex}
          ></Typography>

          {UserSlice === null ? (
            <>
              <Link
                color='inherit'
                noWrap
                variant='body2'
                href={'/Login'}
                className={classes.toolbarLink}
              >
                <Button variant='outlined' size='small'>
                  Sign up
                </Button>
              </Link>
              <Link
                color='inherit'
                noWrap
                variant='body2'
                href={'/Registration'}
                className={classes.toolbarLink}
              >
                <Button variant='outlined' size='small'>
                  Registration
                </Button>
              </Link>
            </>
          ) : (
            <>
              <div>
                <IconButton
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleMouseClickProfile}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorElProfile}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={open}
                  onClose={handleCloseProfile}
                >
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Notification</MenuItem>

                  <MenuItem>My account</MenuItem>
                  <MenuItem onClick={() => dispatch(logout())}>
                    Sign out
                  </MenuItem>
                </Menu>
              </div>
            </>
          )}
        </Toolbar>
        <Toolbar className={classes.toolbar}>
          {/* <Link to='/'>
          <Image
            size='mini'
            src='https://shop.jaguars.com/content/content/shop.jaguars.com/shop.jaguars.com.svg'
            style={{ width: '200px', heigth: '50px' }}
          />
        </Link> */}

          <Typography
            component='h2'
            variant='h5'
            color='inherit'
            align='center'
            noWrap
            className={classes.toolbarTitle}
          >
            <Image
              href={'/'}
              src='https://laz-img-cdn.alicdn.com/images/ims-web/TB1T7K2d8Cw3KVjSZFuXXcAOpXa.png'
              style={{ width: '300px', heigth: '50px' }}
            />
          </Typography>
          <Typography
            component='h2'
            variant='h5'
            color='inherit'
            align='center'
            noWrap
            className={classes.Search}
          >
            <div>
              <TextField
                id='standard-basic'
                label='Search'
                style={{ width: '70%' }}
              />
              <IconButton type='submit' aria-label='search'>
                <SearchIcon />
              </IconButton>
            </div>
          </Typography>
          <Link
            color='inherit'
            noWrap
            variant='body2'
            href={'/Cart'}
            className={classes.toolbarLink}
          >
            <Button variant='outlined' size='small'>
              <span class='icon_bag_alt'></span>
              <div class='tip'>
                {CartSlice === null || CartSlice.length === 0
                  ? 0
                  : CartSlice.legth}
              </div>
            </Button>
          </Link>
        </Toolbar>
        <Toolbar
          component='nav'
          variant='dense'
          className={classes.toolbarSecondary}
        >
          <Button style={{ fontSize: '15px' }} href={'/'} component={Link}>
            Home
          </Button>
          {categorylist.slice(0, size).map(({ Id, Name, SubCategories }) => {
            return (
              <>
                <Button
                  style={{ fontSize: '15px' }}
                  key={Id}
                  href={'/Category/' + Id}
                  component={Link}
                  onMouseOver={handleMouseOver}
                >
                  {Name}
                </Button>
                {/* <Menu
                  className={classes.dropdown}
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                  }}
                >
                  {SubCategories.map(({ Id, Name, SubCategories }) => (
                    <MenuItem>
                      <Button
                        style={{ fontSize: '15px' }}
                        key={Id}
                        href={'/Category/' + Id}
                        component={Link}
                        onClick={handleClose}
                      >
                        {Name}
                      </Button>
                    </MenuItem>
                  ))}
                </Menu> */}
              </>
            )
          })}
          <Button
            component={Link}
            style={{ fontSize: '15px' }}
            color='inherit'
            noWrap
            href={'/Categories'}
          >
            See more
          </Button>
        </Toolbar>
      </React.Fragment>
    </div>

    //   >
    //     <Menu style={{ backgroundColor: '#000000' }} inverted secondery>
    //       <Container>
    //         <Menu.Item header>

    //         </Menu.Item>
    //         <Menu.Item>
    //           <Link to='/'>Home</Link>
    //         </Menu.Item>

    //         <Menu.Item>
    //           <Link to='/'>About Us</Link>
    //         </Menu.Item>
    //         <Menu.Item>
    //           <Link to='/'>Our Store</Link>
    //         </Menu.Item>
    //         <Menu.Item>
    //           <Link to='/ImageUploading'>Search With Image</Link>
    //         </Menu.Item>
    //         <Menu.Item>

    //         </Menu.Item>
    //         {UserSlice === null ? (
    //           <>
    //             <Menu.Item>
    //               <Link to='/Login'>Login</Link>
    //             </Menu.Item>

    //             <Menu.Item>
    //               <Link to='/Registration'>Register</Link>
    //             </Menu.Item>
    //           </>
    //         ) : (
    //           <Menu.Item>
    //             <Dropdown
    //               trigger={
    //                 <span>
    //                   <Icon name='user' /> Hello, {UserSlice.UserName}
    //                 </span>
    //               }
    //             >
    //               <Dropdown.Menu style={UserDropdown}>
    //                 <Dropdown.Item>
    //                   <Link to='/Profile'>Profile</Link>
    //                 </Dropdown.Item>
    //                 <Dropdown.Item>
    //                   <Link to='/OrderHistory'>Orders</Link>
    //                 </Dropdown.Item>
    //                 <Dropdown.Item
    //                   style={{ color: '#ffffff' }}
    //                   as='a'
    //                   onClick={() => dispatch(logout())}
    //                 >
    //                   <a>Sign out</a>
    //                 </Dropdown.Item>
    //               </Dropdown.Menu>
    //             </Dropdown>
    //           </Menu.Item>
    //         )}

    //         <Menu.Item>
    //           <Link to='/Cart'>

    //           </Link>
    //         </Menu.Item>
    //       </Container>
    //     </Menu>
    //     <Menu inverted style={{ backgroundColor: '#006778' }}>
    //       <Container>
    //         {items}
    //         <Menu.Item>
    //           <Link to='/Categories'>See more</Link>
    //         </Menu.Item>
    //       </Container>
    //     </Menu>
    //   </div>
    // </Sticky>
  )
}

export default NavigationHeader
