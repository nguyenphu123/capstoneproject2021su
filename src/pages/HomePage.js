import React, { useEffect, useState } from 'react'
// import { useAlert } from 'react-alert'
import 'react-notifications/lib/notifications.css'

import { Link } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import SeeMoreButton from '../Assets/SeeMoreButton'
import HorizontalItemList from '../components/Item-List/HorizontalItemList'

// import CategoryList from './CategoryList'
import { ToastContainer, toast } from 'react-toastify'
import VerticalItemListSlide from '../components/Item-List/VerticalItemListSlide'
import VerticalItemListHome from '../components/Item-List/VerticalItemListHome'
import { removeToast } from '../features/Toast/ToastSlice'
const mapDispatch = { removeToast }

function HomePage () {
  const { Task } = useParams()
  const dispatch = useDispatch()

  const UserSlice = useSelector(state => state.UserSlice.user)
  const ToastSlice = useSelector(state => state.ToastSlice.toast)

  const [banners, setBanners] = useState([])

  const [categorylist, setCategorylist] = useState([])
  const [loadComplete, setLoadComplete] = useState(false)
  console.log(ToastSlice)
  toast.success(ToastSlice)
  dispatch(removeToast())

  useEffect(() => {
    console.log(ToastSlice)
  }, [])

  useEffect(() => {
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
          {/* <CategoryList categorylist={categorylist} /> */}
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
              <h2>Popular products</h2>
              <h4>Catch the current trend</h4>
            </div>
            <VerticalItemListSlide
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
          {/* <div className='container'>
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
                      <div className='item-content'></div>
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
          </div> */}
          <div class='container'>
            <div class='row our-features-box'>
              <ul>
                <li>
                  <div class='feature-box'>
                    <div class='icon-truck'></div>
                    <div class='content'>FREE SHIPPING on order over 10,000,000VND</div>
                  </div>
                </li>
                <li>
                  <div class='feature-box'>
                    <div class='icon-support'></div>
                    <div class='content'>
                      Have a question?
                      <br />
                      +84 906950002
                    </div>
                  </div>
                </li>
                <li>
                  <div class='feature-box'>
                    <div class='icon-money'></div>
                    <div class='content'>100% Money Back Guarantee</div>
                  </div>
                </li>
                <li>
                  <div class='feature-box'>
                    <div class='icon-return'></div>
                    <div class='content'>30 days return Service</div>
                  </div>
                </li>
                <li class='last'>
                  <div class='feature-box'>
                    <a href='#'>
                      <i class='fa fa-apple'></i> download
                    </a>
                    <a href='#'>
                      <i class='fa fa-android'></i> download
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <ToastContainer autoClose={5000} />
        </div>
      </>
    )
  }
}

export default HomePage
