import '../../App.css'

import { Button, Menu, MenuItem, TextField } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import SearchIcon from '@material-ui/icons/Search'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image, Search } from 'semantic-ui-react'
// import FilterResults from 'react-filter-search'
import Search from '../Search/Search'
import { loginUser, logout } from '../../features/User/UserSlice'
import CartButton from '../../Assets/CartButton'

// import { Link } from 'react-router-dom'
const mapDispatch = { logout, loginUser }

function NavigationHeader () {
  const dispatch = useDispatch()
  const UserSlice = useSelector(state => state.UserSlice.user)
  const CartSlice = useSelector(state => state.CartSlice.cart)
  const [anchorEl, setAnchorEl] = useState(null)

  const useStyles = makeStyles(theme => ({
    toolbar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: '#ffffff'
    },
    toolbarTop: {
      backgroundColor: '#ffffff',
      height: 4
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
      fontSize: '30px'
    },
    toolbarCart: {
      padding: theme.spacing(2.5),
      flexShrink: 0,
      fontSize: '30px'
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
                  size='medium'
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
                  <MenuItem component='a' href={'/Profille/' + UserSlice.Id}>
                    Profile
                  </MenuItem>
                  <MenuItem component='a' href={'/'}>
                    Notification
                  </MenuItem>

                  <MenuItem component='a' href={'/OrderHistory'}>
                    Order history
                  </MenuItem>
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
                style={{ width: '250px', heigth: '20px' }}
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
                <Search />
                {/* <TextField
                  id='standard-basic'
                  label='Search'
                  style={{ width: '70%' }}
                />
                <IconButton type='submit' aria-label='search'>
                  <SearchIcon />
                </IconButton> */}
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
            <Button style={{ fontSize: '14px' }} href={'/'} component={Link}>
              Home
            </Button>
            <Button style={{ fontSize: '14px' }} href={'/'} component={Link}>
              Get Voucher
            </Button>
            <Button style={{ fontSize: '14px' }} href={'/'} component={Link}>
              Special discount
            </Button>
            <Button style={{ fontSize: '14px' }} href={'/'} component={Link}>
              Deal for you
            </Button>
          </Toolbar>
        </React.Fragment>
      </div>
    </div>
  )
}

export default NavigationHeader
