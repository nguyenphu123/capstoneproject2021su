import '../App.css'

import { Header, Button } from 'semantic-ui-react'
import React, { useEffect, useState } from 'react'
// import { useAlert } from 'react-alert'
import 'react-notifications/lib/notifications.css'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import Title from '../Assets/Title'

import { useDispatch, useSelector } from 'react-redux'
import SeeMoreButton from '../Assets/SeeMoreButton'
import HorizontalItemList from '../components/Item-List/HorizontalItemList'
import VerticalItemList from '../components/Item-List/VerticalItemList'
import SaleOff from '../components/Sale-Off/SaleOff'
import CategoryList from './CategoryList'

function HomePage () {
  const UserSlice = useSelector(state => state.UserSlice.user)
  useEffect(() => {
    // if (UserSlice !== null) {
    //   NotificationManager.success(
    //     'Success message',
    //     'Wellcome ' + UserSlice.UserName
    //   )
    // }
    // alert.success('Wellcome ' + UserSlice.UserName)
  }, [UserSlice])

  return (
    <div>
      <Title Name='Flash Deal' />

      <SaleOff />
      <Title Name='Categories' />

      <CategoryList />
      <VerticalItemList
        topic='New Product'
        apiUrl={'/api/product-management?sort=up&pageIndex=1&pageSize=8'}
      />
      <SeeMoreButton Url='/' />

      <VerticalItemList
        topic='You may like'
        apiUrl={'/api/product-management?sort=up&pageIndex=1&pageSize=8'}
      />
      <SeeMoreButton Url='/' />

      <section class='trend spad'>
        <div class='container'>
          <div class='row'>
            <div class='col-lg-4 col-md-4 col-sm-6'>
              <HorizontalItemList
                topic='Best Seller'
                apiUrl={
                  '/api/product-management?sort=up&pageIndex=1&pageSize=3'
                }
              />
              <SeeMoreButton Url='/' />
            </div>
            <div class='col-lg-4 col-md-4 col-sm-6'>
              <HorizontalItemList
                topic='Top'
                apiUrl={
                  '/api/product-management?sort=up&pageIndex=1&pageSize=3'
                }
              />
              <SeeMoreButton Url='/' />
            </div>
            <div class='col-lg-4 col-md-4 col-sm-6'>
              <HorizontalItemList
                topic='Feature'
                apiUrl={
                  '/api/product-management?sort=up&pageIndex=1&pageSize=3'
                }
              />
              <SeeMoreButton Url='/' />
            </div>
          </div>
        </div>
      </section>
      <NotificationContainer />
    </div>
  )
}

export default HomePage
