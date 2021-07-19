import 'react-chat-widget/lib/styles.css'

import Fab from '@material-ui/core/Fab'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import NavigationIcon from '@material-ui/icons/Navigation'
import { Widget } from 'react-chat-widget'
import FadeIn from 'react-fade-in'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
var randomstring = require('randomstring')

function App () {
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
      <Router>
        <Switch>
          <Route key='Registration' path='/Registration'>
            <NavigationHeader />
            <Ads />
            <RegistrationPage />
          </Route>
          <Route
            key={randomstring.generate(7)}
            path='/Category/:categoryId/:currentPage'
            render={() => (
              <>
                <NavigationHeader />
                <Ads />
                <CategoryPage
                  key={randomstring.generate(7)}
                  topic={'Category1'}
                />
              </>
            )}
          ></Route>
          <Route
            key={randomstring.generate(7)}
            path='/AllProduct/:currentPage/:viewStyle/:sort?/:sortOption?'
          >
            <NavigationHeader />
            <Ads />
            <GetAllProduct />
          </Route>

          {/* <Route path='/Categories/:currentPage'>
            <NavigationHeader />
            <Ads />
            <CategoryList />
          </Route> */}
          <Route key={'ImageUploading'} path='/ImageUploading'>
            <NavigationHeader />
            {/* <Ads /> */}
            <ImageUploadingPage />
          </Route>
          <Route
            key={randomstring.generate(7)}
            path='/Product/:productId'
            exact
          >
            <NavigationHeader />

            <ProductDetail />
          </Route>
          <Route key={randomstring.generate(7)} path='/Profille/:userId'>
            <NavigationHeader />

            <Profile />
          </Route>
          <Route key={'OrderHistory'} path='/OrderHistory'>
            <NavigationHeader />

            <OrderHistory />
          </Route>
          {/* <Route path='/OrderDetail/:id'>
            <OrderDetail />
          </Route> */}
          <Route key={'Cart'} path='/Cart'>
            <NavigationHeader />

            <ShoppingCart />
          </Route>
          <Route key={'PaymentInfo'} path='/PaymentInfo/:IsPay?'>
            <PaymentConfirm />
          </Route>

          <Route path='/' exact>
            <NavigationHeader />
            <Ads />
            <HomePage />
          </Route>
        </Switch>
        <Widget />

        <Footers />
      </Router>
    </FadeIn>
  )
}

export default App
