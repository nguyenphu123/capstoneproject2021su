import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, withRouter } from 'react-router-dom'
import { Form, Checkbox, Button, Dropdown } from 'semantic-ui-react'

import { Link } from 'react-router-dom'

import VerticalItemList from '../components/Item-List/VerticalItemList'
import PagnationBar from '../Assets/PagnationBar'

function CategoryPage () {
  //id của category
  const { currentPage, categoryId, viewStyle, sort, sortOption } = useParams()

  //component dùng url động
  const [currentURL, setCurrentURL] = useState(
    '/api/product-management/' + categoryId
  )

  const [category, setCategory] = useState({})
  const [view, setView] = useState(viewStyle)
  const [sortBy, setSortBy] = useState(sort)
  const [currentSortOption, setCurrentSortOption] = useState(sortOption)

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
  const [isUpdate, setIsUpdate] = useState(true)

  const options = [
    { key: 1, text: 'Price', value: 'price' },
    { key: 2, text: 'Name', value: 'name' }
  ]

  useEffect(() => {
    console.log(categoryId)

    axios({
      method: 'GET',
      url: '/api/category-management/' + categoryId
    }).then(res => {
      console.log(res)
      console.log(res.data)
      setCategory(res.data)
    })
    setCurrentURL('/api/product-management/' + categoryId)
    setIsUpdate(false)

    // window.location.reload()

    // setSubList(category.SubCategories)
  }, [categoryId, currentPage, isUpdate])
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
      setColor(tag => tag)

      setCurrentURL('/api/product-management?sort=up&pageIndex=1&pageSize=5000')
    } else {
      setSub('')
    }
  }, [tag])
  function resetAll () {
    setColor('')
    setSize('')
    setTag('')
    setSub('')
  }

  useEffect(() => {
    setCurrentURL('/api/product-management/' + categoryId)

    console.log(categoryId)

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
  function handleChangeSortOption (e, { value }) {
    setColor(value)
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
                    currentLink={'/Category/' + categoryId + '/1'}
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
                    {/* <dt className='odd'>Price</dt>
                    <dd className='odd'>
                      <ol>
                        <li>
                          <Link to='#'>
                            <span className='price'>$0.00</span> -
                            <span className='price'>$99.99</span>
                          </Link>
                        </li>
                        <li>
                          <Link to='#'>
                            <span className='price'>$100.00</span> and above
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
                    {/* <dt className='even'>Sub categories</dt>

                    <dd className='even'>
                      <ol>
                        <Form>
                          {subList.map(({ Name, Id }) => (
                            <li>
                              <Form.Field>
                                <Checkbox
                                  radio
                                  label={Name}
                                  name='checkboxRadioGroup'
                                  value={Id}
                                  checked={sub === Id}
                                  onChange={handleChangeCategory}
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

export default withRouter(CategoryPage)
