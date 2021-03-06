import { Button } from 'semantic-ui-react'
import React, { useEffect, useState } from 'react'
// import { useAlert } from 'react-alert'
import { useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'

import axios from 'axios'

import VerticalItemListWish from '../components/Item-List/VerticalItemListWish'

import { Form, Checkbox } from 'semantic-ui-react'

function Wishlist () {
  const { currentPage, userId, viewStyle, sort, sortOption } = useParams()
  const UserSlice = useSelector(state => state.UserSlice.user)

  const [currentURL, setCurrentURL] = useState('/api/whistlist-management')

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
  const [reset, setReset] = useState(false)

  const options = [
    { key: 1, text: 'Price', value: 'price' },
    { key: 2, text: 'Name', value: 'name' }
  ]

  useEffect(() => {
    if (color !== '') {
      setColor(color => color)

      setCurrentURL('/api/whistlist-management')
    } else {
      setColor('')
    }
  }, [color])
  useEffect(() => {
    if (size !== '') {
      setSize(size => size)

      setCurrentURL('/api/whistlist-management')
    } else {
      setSize('')
    }
  }, [size])
  useEffect(() => {
    if (tag !== '') {
      setSub(tag => tag)

      setCurrentURL('/api/whistlist-management')
    } else {
      setSub('')
    }
  }, [tag])
  useEffect(() => {
    if (sortBy !== '') {
      setSortBy(sortBy => sortBy)

      setCurrentURL('/api/whistlist-management')
    } else {
      setSortBy('')
    }
  }, [sortBy])
  useEffect(() => {
    if (currentSortOption !== '') {
      setCurrentSortOption(currentSortOption => currentSortOption)

      setCurrentURL('/api/whistlist-management')
    } else {
      setCurrentSortOption('')
    }
  }, [currentSortOption])
  useEffect(() => {
    setReset(reset => reset)
  }, [reset])

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
    setReset(true)
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
                    </div>
                    <div className='pager'></div>
                  </div>

                  <VerticalItemListWish
                    reset={reset}
                    topic={category.Name}
                    apiUrl={currentURL}
                    colorId={color}
                    categoryId={sub}
                    sizeId={size}
                    tagId={tag}
                    sortBy={sortBy}
                    sortOption={currentSortOption}
                    currentLink={currentURL}
                    UserId={UserSlice.Id}
                  />

                  <div className='toolbar bottom'>
                    <div className='display-product-option'>
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
                <div className='block-title'> Whislist </div>

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
