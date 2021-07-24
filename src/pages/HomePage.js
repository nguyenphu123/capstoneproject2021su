import { Header, Button } from 'semantic-ui-react'
import React, { useEffect, useState } from 'react'
// import { useAlert } from 'react-alert'
import 'react-notifications/lib/notifications.css'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import Title from '../Assets/Title'
import Ads from '../components/Ads/AdsSlideShow'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SeeMoreButton from '../Assets/SeeMoreButton'
import HorizontalItemList from '../components/Item-List/HorizontalItemList'
import VerticalItemList from '../components/Item-List/VerticalItemList'
import SaleOff from '../components/Sale-Off/SaleOff'
import CategoryList from './CategoryList'
import { ToastContainer, toast } from 'react-toastify'

import VerticalItemListHome from '../components/Item-List/VerticalItemListHome'

function HomePage () {
  const { Task } = useParams()

  const UserSlice = useSelector(state => state.UserSlice.user)
  const [banners, setBanners] = useState([])

  const [categorylist, setCategorylist] = useState([])
  const [loadComplete, setLoadComplete] = useState(false)
  useEffect(() => {
    if (Task !== null || Task !== undefined || typeof Task !== undefined) {
      if (Task === 'LoginSuccess') {
        // toast.success('Welcome')
      } else if (Task === 'ResetPassword') {
        toast.success('Change password successful')
      } else if (Task === 'FinishPayment') {
        toast.success('Thank you for shopping at our website')
      } else {
      }
    }
  }, [Task])

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/category-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      setCategorylist(res.data)
      axios({
        method: 'GET',
        url: '/api/banner-management'
      }).then(res => {
        console.log(res)
        console.log(res.data)
        let result = res.data.slice(1, 3)
        setBanners(result)
        setLoadComplete(true)
      })
    })
  }, [!loadComplete])

  if (!loadComplete) {
    return (
      <img
        src={'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'}
        alt='promotion-banner1'
      />
    )
  } else {
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
                {banners.map(({ Id, Name, ImageBannerStorages }) => (
                  <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                    <Link
                      to={'/Category/12345678-1234-1243-1234-123856089012/1'}
                      data-scroll-goto='1'
                    >
                      <img
                        src={ImageBannerStorages[0].ImageUrl}
                        alt='promotion-banner1'
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <section className=' wow bounceInUp animated'>
          <div className='best-pro slider-items-products container'>
            <div className='new_title'>
              <h2>Super deals</h2>
              <h4>Highest discount</h4>
            </div>
            <VerticalItemListHome
              reset={true}
              topic='Super deals'
              apiUrl={
                '/api/product-management?sort=up&pageIndex=1&pageSize=500'
              }
            />
            <SeeMoreButton Url='/AllProduct/1/Grid' />
          </div>
        </section>
        <section className=' wow bounceInUp animated'>
          <div className='best-pro slider-items-products container'>
            <div className='new_title'>
              <h2>New arrival</h2>
              <h4>New products</h4>
            </div>
            <VerticalItemListHome
              reset={true}
              topic='New arrival'
              apiUrl={
                '/api/product-management?sort=up&pageIndex=1&pageSize=500'
              }
            />
            <SeeMoreButton Url='/AllProduct/1/Grid' />
          </div>
        </section>
        <section class='trend spad'>
          <div class='container'>
            <div class='row'>
              <div class='col-lg-4 col-md-4 col-sm-6'>
                <div className='new_title'>
                  <h2>Top luxury</h2>
                </div>

                <HorizontalItemList
                  topic='Top luxury'
                  apiUrl={
                    '/api/product-management?sort=up&pageIndex=1&pageSize=500'
                  }
                />
                <SeeMoreButton Url='/AllProduct/1/Grid' />
              </div>
              <div class='col-lg-4 col-md-4 col-sm-6'>
                <div className='new_title'>
                  <h2>Top recommend</h2>
                </div>

                <HorizontalItemList
                  topic='Top'
                  apiUrl={'/api/recommend-management'}
                />
                <SeeMoreButton Url='/AllProduct/1/Grid' />
              </div>
              <div class='col-lg-4 col-md-4 col-sm-6'>
                <div className='new_title'>
                  <h2>Top cheapest</h2>
                </div>

                <HorizontalItemList
                  topic='Top cheapest'
                  apiUrl={
                    '/api/product-management?sort=up&pageIndex=1&pageSize=500'
                  }
                />
                <SeeMoreButton Url='/AllProduct/1/Grid' />
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
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy habitant morbi.
                  </p>
                </div>
                <div className='block2'>
                  <strong>100% cottons</strong>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy habitant morbi.
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
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy habitant morbi.
                  </p>
                </div>
                <div className='block4'>
                  <strong>Safe From Injury</strong>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy habitant morbi.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer autoClose={5000} />
        </div>
      </>
    )
  }
}

export default HomePage
