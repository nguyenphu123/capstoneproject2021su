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
import CartButton from '../Cart/CartButton'

const mapDispatch = { logout, loginUser }

const ITEM_HEIGHT = 48

function NavigationHeader () {
  const dispatch = useDispatch()
  const UserSlice = useSelector(state => state.UserSlice.user)
  const CartSlice = useSelector(state => state.CartSlice.cart)
  const [anchorEl, setAnchorEl] = useState(null)

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
    toolbarCart: {
      padding: theme.spacing(2.5),
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        backgroundColor: '#ffffff',
        width: '100%',
        position: 'fixed',
        top: 0,

        zIndex: 1100
      }}
    >
      <div
        style={{
          marginLeft: '250px',
          width: '70%'
        }}
      >
        <React.Fragment>
          <Toolbar className={classes.toolbarTop}>
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
                <IconButton
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleClick}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id='simple-menu'
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Notification</MenuItem>

                  <MenuItem>Order history</MenuItem>
                  <MenuItem onClick={() => dispatch(logout())}>
                    Sign out
                  </MenuItem>
                </Menu>
              </>
            )}
          </Toolbar>
          <Toolbar className={classes.toolbar}>
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
              className={classes.toolbarCart}
            >
              <div class='tip'>
                {CartSlice === null || CartSlice.length === 0 ? (
                  <CartButton count={0} />
                ) : (
                  <CartButton count={CartSlice.length} />
                )}
              </div>
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
            <Button style={{ fontSize: '15px' }} href={'/'} component={Link}>
              Get Voucher
            </Button>
            <Button style={{ fontSize: '15px' }} href={'/'} component={Link}>
              Special discount
            </Button>
            <Button style={{ fontSize: '15px' }} href={'/'} component={Link}>
              Deal for you
            </Button>
          </Toolbar>
        </React.Fragment>
      </div>
    </div>
  )
}

export default NavigationHeader
