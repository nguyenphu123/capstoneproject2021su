import { Header, Button } from 'semantic-ui-react'
import React, { useEffect, useState } from 'react'
// import { useAlert } from 'react-alert'
import 'react-notifications/lib/notifications.css'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import Title from '../Assets/Title'
import Ads from '../components/Ads/AdsSlideShow'
import { useParams, withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PagnationBar from '../Assets/PagnationBar'
import { useDispatch, useSelector } from 'react-redux'

import HorizontalItemList from '../components/Item-List/HorizontalItemList'
import VerticalItemList from '../components/Item-List/VerticalItemList'
import SaleOff from '../components/Sale-Off/SaleOff'
import CategoryList from './CategoryList'
import { Form, Checkbox, Dropdown } from 'semantic-ui-react'

function Wishlist () {
  const { currentPage, userId, viewStyle, sort, sortOption } = useParams()

  const [currentURL, setCurrentURL] = useState(
    '/api/product-management?sort=up&pageIndex=1&pageSize=5000'
  )

  const [category, setCategory] = useState({})
  const [view, setView] = useState(viewStyle)
  const [sortBy, setSortBy] = useState(sort)
  const [currentSortOption, setCurrentSortOption] = useState('asc')

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
  const [sub, setSub] = useState('')
  const options = [
    { key: 1, text: 'Price', value: 'price' },
    { key: 2, text: 'Name', value: 'name' }
  ]

  useEffect(() => {
    if (color !== '') {
      setColor(color => color)

      setCurrentURL('/api/product-management?sort=up&pageIndex=1&pageSize=5000')
    } else {
      setColor('')
    }
  }, [color])
  useEffect(() => {
    if (size !== '') {
      setSize(size => size)

      setCurrentURL('/api/product-management?sort=up&pageIndex=1&pageSize=5000')
    } else {
      setSize('')
    }
  }, [size])
  useEffect(() => {
    if (tag !== '') {
      setSub(tag => tag)

      setCurrentURL('/api/product-management?sort=up&pageIndex=1&pageSize=5000')
    } else {
      setSub('')
    }
  }, [tag])
  useEffect(() => {
    if (sortBy !== '') {
      setSortBy(sortBy => sortBy)

      setCurrentURL('/api/product-management?sort=up&pageIndex=1&pageSize=5000')
    } else {
      setSortBy('')
    }
  }, [sortBy])
  useEffect(() => {
    if (currentSortOption !== '') {
      setCurrentSortOption(currentSortOption => currentSortOption)

      setCurrentURL('/api/product-management?sort=up&pageIndex=1&pageSize=5000')
    } else {
      setCurrentSortOption('')
    }
  }, [currentSortOption])

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
  function resetAll () {
    setColor('')
    setSize('')
    setTag('')
    setSub('')
  }
  function handleChange (colorId, sizeId, tagId, categoryId) {
    setCurrentURL('/api/product-management/1/1/1/1?pageIndex=1&pageSize=1')
  }
  function handleChangeColor (e, { value }) {
    setColor(value)
  }
  function handleChangeSize (e, { value }) {
    setSize(value)
  }
  function handleChangeTag (e, { value }) {
    setTag(value)
  }
  function handleChangeCategory (e, { value }) {
    setSub(value)
  }
  function handleChangeSortBy () {
    setSortBy('price')
    console.log('ok')
    if (currentSortOption === 'asc') {
      setCurrentSortOption('dec')
    } else {
      setCurrentSortOption('asc')
    }
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
                    <div className='sort-by'>
                      <label className='left'>Sort By: </label>
                      <Button
                        icon={
                          currentSortOption === 'asc'
                            ? 'arrow up'
                            : 'arrow down'
                        }
                        content='Price'
                        onClick={handleChangeSortBy}
                      />

                      {/* <Dropdown
                        onChange={handleChangeSortBy}
                        clearable
                        options={options}
                        selection
                        value={sortBy}
                      />

                      <Link
                        className='button-asc left'
                        to={'/AllProduct/1/Grid/' + sortBy + '/asc'}
                        title='Set Descending Direction'
                      >
                        <span className='top_arrow'></span>
                      </Link> */}
                    </div>
                    <div className='pager'></div>
                  </div>

                  <VerticalItemList
                    reset={false}
                    topic={category.Name}
                    apiUrl={currentURL}
                    colorId={color}
                    categoryId={sub}
                    sizeId={size}
                    tagId={tag}
                    sortBy={sortBy}
                    sortOption={currentSortOption}
                    currentLink={'/AllProduct/1'}
                  />

                  <div className='toolbar bottom'>
                    <div className='display-product-option'>
                      {/* <PagnationBar
                        Name={'AllProduct'}
                        apiUrl={currentURL}
                        colorId={color}
                        categoryId={sub}
                        sizeId={size}
                        tagId={tag}
                      /> */}
                      <div className='product-option-right'>
                        <div className='pager'></div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <aside className='col-left sidebar col-sm-3 col-xs-12 col-sm-pull-9 wow bounceInUp animated'>
              {/* <!-- BEGIN SIDE-NAV-CATEGORY --> */}
              <div className='side-nav-categories'>
                <div className='block-title'> All Product </div>

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
                    {/* <dt className='odd'>Price</dt>
                    <dd className='odd'>
                      <ol>
                        <li>
                          <Link to='#'>
                            <span className='price'>50,000VND</span> -
                            <span className='price'>100,000VND</span>
                          </Link>
                        </li>
                        <li>
                          <Link to='#'>
                            <span className='price'>100,000VND</span> and above
                          </Link>
                        </li>
                      </ol>
                    </dd> */}
                    {/* <dt className='even'>Tag</dt>

                    <dd className='even'>
                      <ol>
                        <Form>
                          {taglist.map(({ Name, Id }) => (
                            <li>
                              <Form.Field>
                                <Checkbox
                                  radio
                                  label={Name}
                                  name='checkboxRadioGroup'
                                  value={Id}
                                  checked={tag === Id}
                                  onChange={handleChangeTag}
                                />
                              </Form.Field>
                            </li>
                          ))}
                        </Form>
                      </ol>
                    </dd> */}

                    <dt className='odd'>Color</dt>
                    <dd className='odd'>
                      <ol>
                        <Form>
                          {colorlist.map(({ Name, Id }) => (
                            <li>
                              <Form.Field>
                                <Checkbox
                                  radio
                                  label={Name}
                                  name='checkboxRadioGroup'
                                  value={Id}
                                  checked={color === Id}
                                  onChange={handleChangeColor}
                                />
                              </Form.Field>
                            </li>
                          ))}
                        </Form>
                      </ol>
                    </dd>
                    <dt className='last even'>Size</dt>
                    <dd className='last even'>
                      <ol>
                        <Form>
                          {sizelist.map(({ Name, Id }) => (
                            <li>
                              <Form.Field>
                                <Checkbox
                                  radio
                                  label={Name}
                                  name='checkboxRadioGroup'
                                  value={Id}
                                  checked={size === Id}
                                  onChange={handleChangeSize}
                                />
                              </Form.Field>
                            </li>
                          ))}
                        </Form>
                      </ol>
                    </dd>
                    <dd className='last even'>
                      <ol>
                        <Button content='Reset' onClick={resetAll} primary />
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

export default Wishlist
