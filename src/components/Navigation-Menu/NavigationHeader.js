import { Link } from 'react-router-dom'
import axios from 'axios'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from 'semantic-ui-react'
// import FilterResults from 'react-filter-search'
import Search from '../Search/Search'
import { loginUser, logout } from '../../features/User/UserSlice'
import Modal from 'react-awesome-modal'
import LoginPage from '../../pages/LoginPage'
import { emptyCart } from '../../features/Cart/CartSlice'

const mapDispatch = { logout, loginUser, emptyCart }

function NavigationHeader () {
  const dispatch = useDispatch()
  const UserSlice = useSelector(state => state.UserSlice.user)
  const CartSlice = useSelector(state => state.CartSlice.cart)
  const [anchorEl, setAnchorEl] = useState(null)
  const [categorylist, setCategorylist] = useState([])
  const [loadComplete, setLoadComplete] = useState(false)
  const [visibility, setVisibility] = useState(false)
  const [currentCart, setCurrentCart] = useState([])
  const [search, setSearch] = useState('')
  const [searchFilter, setSearchFilter] = useState([])
  const [searchId, setSearchId] = useState('')

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/category-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      // const size = 2
      // const items = res.data.slice(0, size)

      setCategorylist(res.data)
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
    setVisibility(!visibility)
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
          <LoginPage />
          <a href='javascript:void(0);' onClick={SetLoginForm}>
            Close
          </a>
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
                        Special Offers! - Get <span>50%</span> off on Sweater
                      </p>
                      <p>
                        sale <span>40%</span> of on bulk shopping!
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
                  <img
                    href={'/'}
                    src='https://laz-img-cdn.alicdn.com/images/ims-web/TB1T7K2d8Cw3KVjSZFuXXcAOpXa.png'
                  />
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
                                            to={'/Category/' + Id}
                                          >
                                            <span>{Name}</span>
                                          </Link>
                                          <ul className='level1'>
                                            {SubCategories.map(
                                              ({ Id, Name }) => (
                                                <li className='level2 nav-6-1-1'>
                                                  <Link to={'/Category/' + Id}>
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
                      <li className='fl-custom-tabmenulink mega-menu'>
                        <Link to={'/'} className='level-top'>
                          <span>Deals</span>
                        </Link>
                        <div className='level0-wrapper fl-custom-tabmenu'>
                          <div className='container'>
                            <div className='header-nav-dropdown-wrapper clearer'>
                              <div className='grid12-3'>
                                <div>
                                  <img
                                    src='https://shop.jaguars.com/content/ws/all/b1f77cc0-86b3-4663-957d-56fef63534ee__1600X615.jpg'
                                    alt='custom-imag'
                                  />
                                </div>
                                <h4 className='heading'>Up to 70% Off</h4>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit.
                                </p>
                              </div>
                              <div className='grid12-3'>
                                <div>
                                  <img
                                    src='https://shop.jaguars.com/content/ws/all/b1f77cc0-86b3-4663-957d-56fef63534ee__1600X615.jpg'
                                    alt='custom-imag'
                                  />
                                </div>
                                <h4 className='heading'>
                                  Big Sale - Get 50% oFF
                                </h4>
                                <p>
                                  Sed et quam lacus. Fusce condimentum eleifend
                                  enim a feugiat.
                                </p>
                              </div>
                              <div className='grid12-3'>
                                <div>
                                  <img
                                    src='https://shop.jaguars.com/content/ws/all/b1f77cc0-86b3-4663-957d-56fef63534ee__1600X615.jpg'
                                    alt='custom-imag'
                                  />
                                </div>
                                <h4 className='heading'>SALE UP TO 40% OFF</h4>
                                <p>
                                  Sed et quam lacus. Fusce condimentum eleifend
                                  enim a feugiat.
                                </p>
                              </div>
                              <div className='grid12-3'>
                                <div>
                                  <img
                                    src='https://shop.jaguars.com/content/ws/all/b1f77cc0-86b3-4663-957d-56fef63534ee__1600X615.jpg'
                                    alt='custom-imag'
                                  />
                                </div>
                                <h4 className='heading'>
                                  Summer Sale! limited time
                                </h4>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit.
                                </p>
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
                  <div className='no-js'>
                    <Link title='Company' className='clicker'></Link>
                    <div className='fl-nav-links'>
                      <div className='language-currency'>
                        <div className='fl-language'>
                          <ul className='lang'>
                            <li>
                              <Link to={' '}>
                                <img src='images/english.png' alt='English' />
                                <span>English</span>
                              </Link>
                            </li>
                            <li>
                              <Link to={' '}>
                                <img src='images/francais.png' alt='French' />
                                <span>French</span>
                              </Link>
                            </li>
                            <li>
                              <Link to={' '}>
                                <img src='images/german.png' alt='German' />
                                <span>German</span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <ul className='links'>
                        {UserSlice !== null ? (
                          <li>
                            <Link
                              to={'/Profille/' + UserSlice.Id}
                              title='My Account'
                            >
                              Profile
                            </Link>
                          </li>
                        ) : null}
                        <li>
                          <Link to={'/OrderHistory'} title='History'>
                            Order History
                          </Link>
                        </li>

                        <li>
                          <Link to={'/wishlist'} title='Wishlist'>
                            Wishlist
                          </Link>
                        </li>
                        <li>
                          <Link to={'/checkout'} title='Checkout'>
                            Checkout
                          </Link>
                        </li>
                        <li>
                          <Link to={'/blog'} title='Blog'>
                            <span>Blog</span>
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
                      {currentCart === null || currentCart.length === 0 ? (
                        <Link to={'/Cart'}>
                          <span> 0 </span>
                        </Link>
                      ) : (
                        <Link to={'/Cart'}>
                          <span> {currentCart.length} </span>
                        </Link>
                      )}
                    </div>
                    {currentCart === null || currentCart.length === 0 ? (
                      <>
                        <div className='fl-mini-cart-content'>
                          <div className='block-subtitle'>
                            <div className='top-subtotal'>
                              0,
                              <span className='price'>0</span>
                            </div>
                          </div>
                          <ul className='mini-products-list' id='cart-sidebar'>
                            <div>Let buy some clothes</div>
                          </ul>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className='fl-mini-cart-content'>
                          <div className='block-subtitle'>
                            <div className='top-subtotal'>
                              {currentCart.length},
                              <span className='price'>
                                {currentCart.reduce(
                                  (accumulator, currentValue) =>
                                    accumulator +
                                    currentValue.CurrentPrice *
                                      currentValue.Quantity,
                                  0
                                )}
                                ,000 VND
                              </span>
                            </div>
                          </div>

                          <ul className='mini-products-list' id='cart-sidebar'>
                            {currentCart.map(
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
                                      <img
                                        alt='timi &amp; leslie Sophia Diaper Bag, Lemon Yellow/Shadow White'
                                        src={img}
                                      />
                                    </Link>
                                    <div className='product-details'>
                                      <span className='price'>
                                        {CurrentPrice},000 VND
                                      </span>
                                      <p className='product-name'>
                                        <Link to={'/product-details'}>
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
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Search'
                        value={search}
                        onChange={handleSearch}
                      />
                      <span className='input-group-btn'>
                        <button
                          type='submit'
                          onClick={handleSearchResult}
                          className='search-btn'
                        >
                          <span className='glyphicon glyphicon-search'>
                            <span className='sr-only'>Search</span>
                          </span>
                        </button>
                      </span>
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

export default NavigationHeader
