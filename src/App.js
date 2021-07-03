import 'react-chat-widget/lib/styles.css'

import Fab from '@material-ui/core/Fab'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import NavigationIcon from '@material-ui/icons/Navigation'
import { Widget } from 'react-chat-widget'
import FadeIn from 'react-fade-in'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
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

function App () {
  useEffect(() => {
    window.sliderr()
    // window.commonjs()

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
      <BrowserRouter forceRefresh>
        <NavigationHeader />
        <Ads />

        <Switch>
          <Route path='/Registration'>
            <RegistrationPage />
          </Route>
          <Route
            path='/Category/:categoryId'
            render={() => <CategoryPage topic={'Category1'} />}
          ></Route>
          <Route path='/Categories'>
            <CategoryList />
          </Route>
          <Route path='/ImageUploading'>
            <ImageUploadingPage />
          </Route>
          <Route path='/Product/:productId' exact>
            <ProductDetail />
          </Route>
          <Route path='/Profille/:userId'>
            <Profile />
          </Route>
          <Route path='/OrderHistory'>
            <OrderHistory />
          </Route>
          <Route path='/OrderDetail/:id'>
            <OrderDetail />
          </Route>
          <Route path='/Cart'>
            <ShoppingCart />
          </Route>
          <Route path='/PaymentInfo'>
            <PaymentConfirm />
          </Route>

          <Route path='/' exact>
            <HomePage />
          </Route>
        </Switch>
        <Widget />

        <Footers />
      </BrowserRouter>
    </FadeIn>
  )
}

export default App
