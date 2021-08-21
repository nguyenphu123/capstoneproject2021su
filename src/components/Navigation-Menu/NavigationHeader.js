import { Link } from 'react-router-dom'
import axios from 'axios'

import NumberFormat from 'react-number-format'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SearchBar from './SearchBar'
import { loginUser, logout } from '../../features/User/UserSlice'
import Modal from 'react-awesome-modal'
import LoginPage from '../../pages/LoginPage'
import { emptyCart } from '../../features/Cart/CartSlice'
import { Header } from 'semantic-ui-react'
import Comparator from '../Comparator/Comparator'
const mapDispatch = { logout, loginUser, emptyCart }

function NavigationHeader () {
  const dispatch = useDispatch()
  const UserSlice = useSelector(state => state.UserSlice.user)
  const CartSlice = useSelector(state => state.CartSlice.cart)
  const [anchorEl, setAnchorEl] = useState(null)
  const [categorylist, setCategorylist] = useState([])
  const [loadComplete, setLoadComplete] = useState(false)
  const [visibility, setVisibility] = useState(false)
  const [currentCart, setCurrentCart] = useState(CartSlice)
  const [search, setSearch] = useState('')
  const [searchFilter, setSearchFilter] = useState([])
  const [searchId, setSearchId] = useState('')
  const [searchList, setSearchList] = useState([])
  const [openComparator, setOpenComaparator] = useState(false)

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/category-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      // const size = 2
      // const items = res.data.slice(0, size)

      setCategorylist(res.data.filter(item => item.Status === true))
      setSearchList(res.data)
      for (let index = 0; index < res.data.length; index++) {
        const element = res.data[index].SubCategories
        searchList.push({ Name: element })
      }
    })
    setLoadComplete(true)
  }, [!loadComplete])
  useEffect(() => {
    setVisibility(false)
  }, [UserSlice])
  useEffect(() => {
    if (CartSlice === null || CartSlice.length === 0) {
    } else {
      setCurrentCart(CartSlice)
    }
  }, [CartSlice])
  console.log(CartSlice)
  function Logout (e) {
    e.stopPropagation()
    dispatch(logout())
  }
  function SetLoginForm (e) {
    e.stopPropagation()
    e.preventDefault()
    setVisibility(!visibility)
  }
  function comparator (e) {
    e.stopPropagation()
    e.preventDefault()
    setOpenComaparator(!openComparator)
  }

  function handleSearch (e) {
    setSearch(e.target.value)
  }
  function handleSearchResult (e) {
    for (let index = 0; index < categorylist.length; index++) {
      if (categorylist[index].Name === search) {
        setSearchId(categorylist[index].Id)
        break
      } else {
        for (
          let jindex = 0;
          jindex < categorylist[index].SubCategories.length;
          jindex++
        ) {
          if (categorylist[index].SubCategories[jindex].Name === search) {
            setSearchId(categorylist[index].SubCategories[jindex].Id)
            break
          }
        }
      }
    }
  }

  if (!loadComplete) {
    return <>...Loading pleas wait</>
  } else {
    return (
      <>
        <Modal
          visible={visibility}
          width='1000'
          height='500'
          effect='fadeInUp'
          onClickAway={SetLoginForm}
        >
          <div>
            <a href='javascript:void(0);' onClick={SetLoginForm}>
              Close
            </a>

            <LoginPage />
          </div>
        </Modal>
        <Modal
          visible={openComparator}
          width='1400'
          height='500'
          effect='fadeInUp'
          onClickAway={comparator}
        >
          <a href='javascript:void(0);' onClick={comparator}>
            Close
          </a>

          <div className='Modal'>
            <Comparator />
          </div>
        </Modal>

        <header>
          <div className='container'>
            <div className='row'>
              <div className='container'>
                <div className='row'>
                  <div className='header-banner'>
                    <div className='assetBlock'>
                      <div id='slideshow'>
                        <p>
                          <Link
                            className='level-top'
                            to={
                              '/Category/6517bd6f-ffd4-4e1a-897a-cf82f5f52c03/1'
                            }
                          >
                            Special Offers! - Get <span>10%</span> off on Shooes
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id='header'>
            <div className='container'>
              <div className='header-container row'>
                <div className='logo'>
                  <div>
                    <Link className='level-top' to={'/'}>
                      <img
                        src='https://t4.ftcdn.net/jpg/03/34/53/51/360_F_334535136_vvbWaKEpsHIMS4dpJUxgXZL6clQX7VGs.jpg'
                        style={{
                          width: '250px',
                          height: '100px',
                          objectFit: 'contain'
                        }}
                      />
                    </Link>
                  </div>
                </div>
                <div className='fl-nav-menu'>
                  <nav>
                    <div className='mm-toggle-wrap'>
                      <div className='mm-toggle'>
                        <i className='icon-align-justify'></i>
                        <span className='mm-label'>Menu</span>
                      </div>
                    </div>
                    <div className='nav-inner'>
                      {/* <!-- BEGIN NAV --> */}
                      <ul id='nav' className='hidden-xs'>
                        <li>
                          <Link className='level-top' to={'/'}>
                            <span>Home</span>
                          </Link>
                        </li>

                        <li>
                          <Link className='level-top' to={'/ImageUploading'}>
                            <span>Search With Image</span>
                          </Link>
                        </li>
                        <li className='mega-menu'>
                          <Link className='level-top' to={'/'}>
                            <span>Categories</span>
                          </Link>
                          <div className='level0-wrapper dropdown-6col'>
                            <div className='container'>
                              <div className='level0-wrapper2'>
                                <div className='col-1'>
                                  <div className='nav-block nav-block-center'>
                                    <ul className='level0'>
                                      {categorylist.map(
                                        ({ Id, Name, SubCategories }) => (
                                          <li className='level3 nav-6-1 parent item'>
                                            <Link
                                              className='level-top'
                                              to={{
                                                pathname:
                                                  '/Category/' + Id + '/1'
                                              }}
                                            >
                                              <span>{Name}</span>
                                            </Link>
                                            <ul className='level1'>
                                              {SubCategories.map(
                                                ({ Id, Name }) => (
                                                  <li className='level2 nav-6-1-1'>
                                                    <Link
                                                      to={{
                                                        pathname:
                                                          '/Category/' +
                                                          Id +
                                                          '/1'
                                                      }}
                                                    >
                                                      <span>{Name}</span>
                                                    </Link>
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>

                <div className='fl-header-right'>
                  <div className='fl-links'>
                    <div className='no-js welcome-user'>
                      <Header as='h4' textAlign='center'>
                        {UserSlice !== null ? (
                          <>
                            {/* <Image
                              circular
                              src='https://react.semantic-ui.com/images/avatar/large/patrick.png'
                            /> */}
                            {UserSlice.Name}
                          </>
                        ) : (
                          <>customer</>
                        )}
                      </Header>

                      <div className='fl-nav-links'>
                        <ul className='links'>
                          {UserSlice !== null ? (
                            <>
                              <li>
                                <Link
                                  to={'/Profille/' + UserSlice.Id}
                                  title='My Account'
                                >
                                  Profile
                                </Link>
                              </li>
                              <li>
                                <Link to={'/OrderHistory'} title='History'>
                                  Order History
                                </Link>
                              </li>

                              <li>
                                <Link
                                  to={'/wishlist/' + UserSlice.Id}
                                  title='Wishlist'
                                >
                                  Wishlist
                                </Link>
                              </li>
                            </>
                          ) : null}
                          {/* <li>
                            <Link to={'/Blog'} title='Blog'>
                              <span>Blog</span>
                            </Link>
                          </li> */}
                          <li>
                            <Link onClick={comparator} title='Comparator'>
                              <span>Comparator</span>
                            </Link>
                          </li>
                          <li className='last'>
                            {UserSlice === null ? (
                              <Link onClick={SetLoginForm} title='Login'>
                                <span>Login</span>
                              </Link>
                            ) : (
                              <Link
                                onClick={() => dispatch(logout())}
                                to={'/'}
                                title='Login'
                              >
                                <span>Sign out</span>
                              </Link>
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className='fl-cart-contain'>
                    <div className='mini-cart'>
                      <div className='basket'>
                        {CartSlice === null || CartSlice.length === 0 ? (
                          <Link to={'/Cart'}>
                            <span> 0 </span>
                          </Link>
                        ) : (
                          <Link to={'/Cart'}>
                            <span> {CartSlice.length} </span>
                          </Link>
                        )}
                      </div>
                      {CartSlice === null || CartSlice.length === 0 ? (
                        <>
                          <div className='fl-mini-cart-content'>
                            <div className='block-subtitle'>
                              <div className='top-subtotal'>
                                0,
                                <span className='price'>0</span>
                              </div>
                            </div>
                            <ul
                              className='mini-products-list'
                              id='cart-sidebar'
                            >
                              <div>Let buy some clothes</div>
                            </ul>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className='fl-mini-cart-content'>
                            <div className='block-subtitle'>
                              <div className='top-subtotal'>
                                {CartSlice.length},
                                <span className='price'>
                                  <NumberFormat
                                    value={CartSlice.reduce(
                                      (accumulator, currentValue) =>
                                        accumulator +
                                        currentValue.CurrentPrice *
                                          currentValue.Quantity,
                                      0
                                    )}
                                    className='foo'
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={''}
                                    renderText={(value, props) => (
                                      <div {...props}>{value}VND</div>
                                    )}
                                  />
                                </span>
                              </div>
                            </div>

                            <ul
                              className='mini-products-list'
                              id='cart-sidebar'
                            >
                              {CartSlice.map(
                                ({
                                  ProductId,
                                  Name,
                                  Quantity,
                                  CurrentPrice,
                                  img
                                }) => (
                                  <li className='item first'>
                                    <div className='item-inner'>
                                      <Link
                                        className='product-image'
                                        title='timi &amp; leslie Sophia Diaper Bag, Lemon Yellow/Shadow White'
                                        to='#l'
                                      >
                                        {img.includes('http') ? (
                                          <img
                                            src={img}
                                            alt='Fresh Organic Mustard Leaves '
                                          />
                                        ) : (
                                          <img
                                            src={
                                              'http://52.74.123.162:5000/' + img
                                            }
                                            alt='Fresh Organic Mustard Leaves '
                                          />
                                        )}
                                      </Link>
                                      <div className='product-details'>
                                        <span className='price'>
                                          <NumberFormat
                                            value={CurrentPrice}
                                            className='foo'
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={''}
                                            renderText={(value, props) => (
                                              <div {...props}>{value}VND</div>
                                            )}
                                          />
                                        </span>
                                        <p className='product-name'>
                                          <Link to={'/Product/' + ProductId}>
                                            {Name}
                                          </Link>
                                        </p>
                                      </div>
                                    </div>
                                  </li>
                                )
                              )}
                            </ul>
                            <div className='actions'>
                              <Link
                                to={'/Cart'}
                                className='btn-checkout'
                                title='Checkout'
                                type='button'
                              >
                                <span>Checkout</span>
                              </Link>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className='collapse navbar-collapse'>
                    <form className='navbar-form' role='search'>
                      <div className='input-group'>
                        <SearchBar categories={searchList} />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  }
}
export default NavigationHeader
