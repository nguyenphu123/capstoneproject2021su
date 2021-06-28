import { Header, Button } from 'semantic-ui-react'
import React, { useEffect, useState } from 'react'
// import { useAlert } from 'react-alert'
import 'react-notifications/lib/notifications.css'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import Title from '../Assets/Title'
import Ads from '../components/Ads/AdsSlideShow'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'
import SeeMoreButton from '../Assets/SeeMoreButton'
import HorizontalItemList from '../components/Item-List/HorizontalItemList'
import VerticalItemList from '../components/Item-List/VerticalItemList'
import SaleOff from '../components/Sale-Off/SaleOff'
import CategoryList from './CategoryList'

function HomePage () {
  const UserSlice = useSelector(state => state.UserSlice.user)
  const [categorylist, setCategorylist] = useState([])
  const [loadComplete, setLoadComplete] = useState(false)

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/category-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      setCategorylist(res.data)
    })

    setLoadComplete(true)
  }, [!loadComplete])

  return (
    <>
      {/* <Title Name='Flash Deal' />

      <SaleOff />
      <Title Name='Categories' /> */}
      <div className='content'>
        {/* <!--Category slider Start--> */}
        <Ads />
        <CategoryList categorylist={categorylist} />
        <div id='top' style={{ marginTop: '10px' }}>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                <Link to={' '} data-scroll-goto='1'>
                  <img
                    src='https://shop.jaguars.com/content/ws/all/b1f77cc0-86b3-4663-957d-56fef63534ee__1600X615.jpg'
                    alt='promotion-banner1'
                  />
                </Link>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                <Link to={' '} data-scroll-goto='2'>
                  <img
                    src='https://shop.jaguars.com/content/ws/all/b1f77cc0-86b3-4663-957d-56fef63534ee__1600X615.jpg'
                    alt='promotion-banner2'
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className=' wow bounceInUp animated'>
        <div className='best-pro slider-items-products container'>
          <div className='new_title'>
            <h2>Best Seller</h2>
            <h4>So you get to know me better</h4>
          </div>
          <VerticalItemList
            topic='New Product'
            apiUrl={'/api/product-management?sort=up&pageIndex=1&pageSize=8'}
          />
        </div>
      </section>

      <SeeMoreButton Url='/' />

      {/*  <VerticalItemList
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
        <NotificationContainer /> */}
    </>
  )
}

export default HomePage
