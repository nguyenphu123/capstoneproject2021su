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
import '../App.css'

function HomePage () {
  const UserSlice = useSelector(state => state.UserSlice.user)
  const [categorylist, setCategorylist] = useState([])
  const [loadComplete, setLoadComplete] = useState(false)
  useEffect(() => {
    if (UserSlice !== null) {
      NotificationManager.success(
        'Success message',
        'Wellcome ' + UserSlice.UserName
      )
    }

    // alert.success('Wellcome ' + UserSlice.UserName)
  }, [UserSlice])

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
        {/* <Ads /> */}
        <CategoryList categorylist={categorylist} />
        <div id='top' style={{ marginTop: '10px' }}>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                <Link
                  to={'/Category/12345678-1234-1243-1234-123856089012/1'}
                  data-scroll-goto='1'
                >
                  <img
                    src='https://shop.jaguars.com/content/ws/all/b1f77cc0-86b3-4663-957d-56fef63534ee__1600X615.jpg'
                    alt='promotion-banner1'
                  />
                </Link>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                <Link
                  to={'/Category/12345678-1234-1243-1234-123856089012/1'}
                  data-scroll-goto='2'
                >
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
            reset={true}
            apiUrl={'/api/product-management?sort=up&pageIndex=1&pageSize=8'}
          />
          <SeeMoreButton Url='/AllProduct/1' />
        </div>
      </section>
      <section className=' wow bounceInUp animated'>
        <div className='best-pro slider-items-products container'>
          <div className='new_title'>
            <h2>Trending</h2>
            <h4>Current trend</h4>
          </div>
          <VerticalItemList
            reset={true}
            apiUrl={'/api/product-management?sort=up&pageIndex=1&pageSize=8'}
          />
          <SeeMoreButton Url='/AllProduct/1' />
        </div>
      </section>
      <section class='trend spad'>
        <div class='container'>
          <div class='row'>
            <div class='col-lg-4 col-md-4 col-sm-6'>
              <div className='new_title'>
                <h2>Top view</h2>
              </div>

              <HorizontalItemList
                topic='Best Seller'
                apiUrl={
                  '/api/product-management?sort=up&pageIndex=1&pageSize=3'
                }
              />
              <SeeMoreButton Url='/AllProduct/1' />
            </div>
            <div class='col-lg-4 col-md-4 col-sm-6'>
              <div className='new_title'>
                <h2>Top like</h2>
              </div>

              <HorizontalItemList
                topic='Top'
                apiUrl={
                  '/api/product-management?sort=up&pageIndex=1&pageSize=3'
                }
              />
              <SeeMoreButton Url='/AllProduct/1' />
            </div>
            <div class='col-lg-4 col-md-4 col-sm-6'>
              <div className='new_title'>
                <h2>Top wishlist</h2>
              </div>

              <HorizontalItemList
                topic='Feature'
                apiUrl={
                  '/api/product-management?sort=up&pageIndex=1&pageSize=3'
                }
              />
              <SeeMoreButton Url='/AllProduct/1' />
            </div>
          </div>
        </div>
      </section>
      <div className='mid-section'>
        <div className='container'>
          <div className='row'>
            <h3></h3>
            <h2>Special Product</h2>
          </div>
          <div className='row'>
            <div className='col-lg-4 col-md-4 col-sm-4 col-xs-12'>
              <div className='block1'>
                <strong>Popular</strong>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy habitant morbi.
                </p>
              </div>
              <div className='block2'>
                <strong>100% cottons</strong>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy habitant morbi.
                </p>
              </div>
            </div>
            <div className='col-lg-4 col-md-4 col-sm-4 col-xs-12'>
              <div className='spl-pro'>
                <Link to={'/'} title='Fresh Organic Mustard Leaves '>
                  <img
                    src='https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/zww68xpjqf1jmluv3rol/air-jordan-1-mid-fearless-blue-the-great-release-date.jpg'
                    alt='Fresh Organic Mustard Leaves '
                  />
                </Link>
                <div className='item-info'>
                  <div className='info-inner'>
                    <div className='item-title'>
                      <Link
                        to={'/Product/12341234-1234-1234-1234-123412331234'}
                        title='Fresh Organic Mustard Leaves '
                      >
                        AIR JORDAN 1
                      </Link>
                    </div>
                    <div className='item-content'>
                      <div className='rating'>
                        <div className='ratings'>
                          <div className='rating-box'>
                            <div className='rating'></div>
                          </div>
                          <p className='rating-links'>
                            <Link to={'/'}>1 Review(s)</Link>
                            <span className='separator'>|</span>
                            <Link to={'/'}>Add Review</Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-md-4 col-sm-4 col-xs-12'>
              <div className='block3'>
                <strong>Good </strong>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy habitant morbi.
                </p>
              </div>
              <div className='block4'>
                <strong>Safe From Injury</strong>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy habitant morbi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <NotificationContainer /> */}
    </>
  )
}

export default HomePage
