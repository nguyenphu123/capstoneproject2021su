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

function GetAllProduct () {
  const [currentURL, setCurrentURL] = useState(
    '/api/product-management?sort=up&pageIndex=1&pageSize=1000'
  )
  console.log(currentURL)
  const [category, setCategory] = useState({})

  //filter màu
  const [colorlist, setColorlist] = useState([])
  const [color, setColor] = useState('')
  //filter rank
  // const [ranklist, setRanklist] = useState([])
  // const [rank, setRank] = useState('')

  //filter size
  const [sizelist, setSizelist] = useState([])
  const [size, setSize] = useState('')
  //tag
  const [taglist, setTaglist] = useState([])
  const [tag, setTag] = useState('')
  const [subList, setSubList] = useState([])

  useEffect(() => {
    // axios({
    //   method: 'GET',
    //   url: '/api/category-management/' + categoryId
    // }).then(res => {
    //   console.log(res)
    //   console.log(res.data)
    //   setCategory(res.data)
    // })
    // window.location.reload()
    // setSubList(category.SubCategories)
  }, [])

  useEffect(() => {
    // console.log(categoryId)

    // window.commonjs()

    axios({
      method: 'GET',
      url: '/api/color-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      setColorlist(res.data)
    })
    axios({
      method: 'GET',
      url: '/api/size-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      setSizelist(res.data)
    })
    axios({
      method: 'GET',
      url: '/api/tag-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      setTaglist(res.data)
    })
  }, [])

  function handleChange (colorId, sizeId, tagId, categoryId) {
    setCurrentURL('/api/product-management/1/1/1/1?pageIndex=1&pageSize=1')
  }

  return (
    <>
      <section className='main-container col2-left-layout bounceInUp animated'>
        <div className='container'>
          <div className='row'>
            <div className='col-main col-sm-9 col-sm-push-3 product-list'>
              <div className='pro-coloumn'>
                <article>
                  <div className='toolbar'>
                    <div className='sorter'>
                      <div className='view-mode'>
                        <Link
                          to={'/grid'}
                          title='Grid'
                          className='button button-grid'
                        >
                          &nbsp;
                        </Link>
                        &nbsp;
                        <span
                          title='List'
                          className='button button-active button-list'
                        >
                          &nbsp;
                        </span>
                        &nbsp;
                      </div>
                    </div>
                    <div className='sort-by'>
                      <label className='left'>Sort By: </label>
                      <ul>
                        <li>
                          <Link to='#'>
                            Position<span className='right-arrow'></span>
                          </Link>
                          <ul>
                            <li>
                              <Link to='#'>Name</Link>
                            </li>
                            <li>
                              <Link to='#'>Price</Link>
                            </li>
                            <li>
                              <Link to='#'>Position</Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <Link
                        className='button-asc left'
                        to='#'
                        title='Set Descending Direction'
                      >
                        <span className='top_arrow'></span>
                      </Link>
                    </div>
                    <div className='pager'>
                      <div className='limiter'>
                        <label>View: </label>
                        <ul>
                          <li>
                            <Link to='#'>
                              15<span className='right-arrow'></span>
                            </Link>
                            <ul>
                              <li>
                                <Link to='#'>20</Link>
                              </li>
                              <li>
                                <Link to='#'>30</Link>
                              </li>
                              <li>
                                <Link to='#'>35</Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                      <div className='pages'>
                        <label>Page:</label>
                        <ul className='pagination'>
                          <li>
                            <Link to='#'>&laquo;</Link>
                          </li>
                          <li className='active'>
                            <Link to='#'>1</Link>
                          </li>
                          <li>
                            <Link to='#'>2</Link>
                          </li>
                          <li>
                            <Link to='#'>3</Link>
                          </li>
                          <li>
                            <Link to='#'>4</Link>
                          </li>
                          <li>
                            <Link to='#'>5</Link>
                          </li>
                          <li>
                            <Link to='#'>&raquo;</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <VerticalItemList topic={category.Name} apiUrl={currentURL} />

                  <div className='toolbar bottom'>
                    <div className='display-product-option'>
                      <div className='pages'>
                        <label>Page:</label>
                        <ul className='pagination'>
                          <li>
                            <Link to='#'>«</Link>
                          </li>
                          <li className='active'>
                            <Link to='#'>1</Link>
                          </li>
                          <li>
                            <Link to='#'>2</Link>
                          </li>
                          <li>
                            <Link to='#'>3</Link>
                          </li>
                          <li>
                            <Link to='#'>»</Link>
                          </li>
                        </ul>
                      </div>
                      <div className='product-option-right'>
                        <div className='sort-by'>
                          <label className='left'>Sort By: </label>
                          <ul>
                            <li>
                              <Link to='#'>
                                Position<span className='right-arrow'></span>
                              </Link>
                              <ul>
                                <li>
                                  <Link to='#'>Name</Link>
                                </li>
                                <li>
                                  <Link to='#'>Price</Link>
                                </li>
                                <li>
                                  <Link to='#'>Position</Link>
                                </li>
                              </ul>
                            </li>
                          </ul>
                          <Link
                            className='button-asc left'
                            to='#'
                            title='Set Descending Direction'
                          >
                            <span className='top_arrow'></span>
                          </Link>
                        </div>
                        <div className='pager'>
                          <div className='limiter'>
                            <label>View: </label>
                            <ul>
                              <li>
                                <Link to='#'>
                                  15<span className='right-arrow'></span>
                                </Link>
                                <ul>
                                  <li>
                                    <Link to='#'>20</Link>
                                  </li>
                                  <li>
                                    <Link to='#'>30</Link>
                                  </li>
                                  <li>
                                    <Link to='#'>35</Link>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <aside className='col-left sidebar col-sm-3 col-xs-12 col-sm-pull-9 wow bounceInUp animated'>
              {/* <!-- BEGIN SIDE-NAV-CATEGORY --> */}
              <div className='side-nav-categories'>
                <div className='block-title'> Categories </div>

                {/* <!--block-title--> */}

                {/* <!-- BEGIN BOX-CATEGORY --> */}
                <div className='box-content box-category'>
                  <ul></ul>
                </div>

                {/* <!--box-content box-category--> */}
              </div>

              {/* <!--side-nav-categories--> */}
              <div className='block block-layered-nav'>
                <div className='block-title'> Shop By </div>
                <div className='block-content'>
                  <p className='block-subtitle'>Shopping Options</p>
                  <dl id='narrow-by-list'>
                    <dt className='odd'>Price</dt>
                    <dd className='odd'>
                      <ol>
                        <li>
                          <Link to='#'>
                            <span className='price'>$0.00</span> -
                            <span className='price'>$99.99</span>
                          </Link>
                          (6)
                        </li>
                        <li>
                          <Link to='#'>
                            <span className='price'>$100.00</span> and above
                          </Link>
                          (6)
                        </li>
                      </ol>
                    </dd>
                    <dt className='even'>Tag</dt>

                    <dd className='even'>
                      <ol>
                        {taglist.map(({ Name, Id }) => (
                          <li>
                            <Link to='/'>{Name}</Link>
                          </li>
                        ))}
                      </ol>
                    </dd>
                    <dt className='even'>Sub categories</dt>

                    <dd className='even'>
                      <ol>
                        {subList.map(({ Name, Id }) => (
                          <li>
                            <Link to='/'>{Name}</Link>
                          </li>
                        ))}
                      </ol>
                    </dd>
                    <dt className='odd'>Color</dt>
                    <dd className='odd'>
                      <ol>
                        {colorlist.map(({ Name, Id }) => (
                          <li>
                            <Link to='/'>{Name}</Link>
                          </li>
                        ))}
                      </ol>
                    </dd>
                    <dt className='last even'>Size</dt>
                    <dd className='last even'>
                      <ol>
                        {sizelist.map(({ Name, Id }) => (
                          <li>
                            <Link to='/'>{Name}</Link>
                          </li>
                        ))}
                      </ol>
                    </dd>
                  </dl>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

export default GetAllProduct
