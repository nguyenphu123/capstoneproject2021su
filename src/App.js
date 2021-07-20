import 'react-chat-widget/lib/styles.css'

import Fab from '@material-ui/core/Fab'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import NavigationIcon from '@material-ui/icons/Navigation'
import { Widget } from 'react-chat-widget'
import FadeIn from 'react-fade-in'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AddIcon from '@material-ui/icons/Add'

import Ads from './components/Ads/AdsSlideShow'
import Footers from './components/Footer/Footers'
import NavigationHeader from './components/Navigation-Menu/NavigationHeader'
import CategoryList from './pages/CategoryList'
import CategoryPage from './pages/CategoryPage'
import HomePage from './pages/HomePage'
import ImageUploadingPage from './pages/ImageUploadingPage'
import LoginPage from './pages/LoginPage'
import OrderDetail from './pages/OrderDetail'
import OrderHistory from './pages/OrderHistory'
import PaymentConfirm from './pages/PaymentConfirm'
import ProductDetail from './pages/ProductDetail'
import Profile from './pages/Profile'
import RegistrationPage from './pages/RegistrationPage'
import ShoppingCart from './pages/ShoppingCart'
import GetAllProduct from './pages/GetAllProduct'
import SearchResultPage from './pages/SearchResultPage'
import Blog from './pages/Blog'

var randomstring = require('randomstring')
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}))

function App () {
  const classes = useStyles()

  useEffect(() => {
    window.sliderr()
    window.commonjs()

    // if (UserSlice !== null) {
    //   NotificationManager.success(
    //     'Success message',
    //     'Wellcome ' + UserSlice.UserName
    //   )
    // }
    // alert.success('Wellcome ' + UserSlice.UserName)
  }, [])

  return (
    <FadeIn>
      <div className={classes.root}>
        <BrowserRouter>
          <Switch>
            <Route path='/Registration'>
              <NavigationHeader />
              <Ads />
              <RegistrationPage />
            </Route>
            <Route
              // key={randomstring.generate(7)}
              path='/Category/:categoryId/:currentPage'
              render={() => (
                <>
                  <NavigationHeader />
                  <Ads />
                  <CategoryPage
                    // key={randomstring.generate(7)}
                    topic={'Category1'}
                  />
                </>
              )}
            ></Route>
            <Route
              // key={randomstring.generate(7)}
              path='/Search/:keyword/:currentPage'
              render={() => (
                <>
                  <NavigationHeader />
                  <Ads />
                  <SearchResultPage
                    // key={randomstring.generate(7)}
                    topic={'Category1'}
                  />
                </>
              )}
            ></Route>

            <Route path='/AllProduct/:currentPage/:viewStyle/:sort?/:sortOption?'>
              <NavigationHeader />
              <Ads />
              <GetAllProduct />
            </Route>

            {/* <Route path='/Categories/:currentPage'>
            <NavigationHeader />
            <Ads />
            <CategoryList />
          </Route> */}
            <Route path='/ImageUploading'>
              <NavigationHeader />
              {/* <Ads /> */}
              <ImageUploadingPage />
            </Route>
            <Route path='/Product/:productId' exact>
              <NavigationHeader />

              <ProductDetail />
            </Route>
            <Route path='/Profille/:userId'>
              <NavigationHeader />

              <Profile />
            </Route>
            <Route path='/OrderHistory'>
              <NavigationHeader />

              <OrderHistory />
            </Route>
            {/* <Route path='/OrderDetail/:id'>
            <OrderDetail />
          </Route> */}
            <Route path='/Cart'>
              <NavigationHeader />

              <ShoppingCart />
            </Route>
            <Route path='/Blog'>
              <NavigationHeader />

              <Blog />
            </Route>

            <Route path='/PaymentInfo/:IsPay?'>
              <PaymentConfirm />
            </Route>

            <Route path='/' exact>
              <NavigationHeader />
              <Ads />
              <HomePage />
            </Route>
          </Switch>
          {/* <Widget /> */}

          <Footers />
        </BrowserRouter>
        {/* <Fab color='primary' aria-label='add'>
          <AddIcon />
        </Fab> */}
      </div>
    </FadeIn>
  )
}

export default App
