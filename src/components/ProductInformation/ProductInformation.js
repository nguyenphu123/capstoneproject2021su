import 'react-image-gallery/styles/css/image-gallery.css'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'react-notifications/lib/notifications.css'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import SeeMoreButton from '../../Assets/SeeMoreButton'
import ProductQuestionAndAnswer from './ProductQuestionAndAnswer'
import ProductDescription from './ProductDescription'
import ProductReview from './ProductReview'
import InputSpinner from 'react-bootstrap-input-spinner'
import ImageGallery from 'react-image-gallery'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Comment, Grid, Header, Rating, Tab, Table } from 'semantic-ui-react'
import MyImageGalery from './MyImageGalery'
import { cart } from '../../features/Cart/CartSlice'
import VerticalItemList from '../Item-List/VerticalItemList'

const mapDispatch = { cart }

function ProductInformation () {
  const { productId } = useParams()
  //filter review
  const [reviewlist, setReviewlist] = useState([])
  const [review, setReview] = useState('')
  const [product, setProduct] = useState({})
  const [shopCart, setShopCart] = useState([])
  const [currentState, setCurrentState] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const [images, setImages] = useState({})
  const [galleries, setGalleries] = useState([])

  const dispatch = useDispatch()
  const CartSlice = useSelector(state => state.CartSlice.cart)
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        '& > *': {
          margin: theme.spacing(2)
        },
        width: '100%'
      },
      LikeButton: {
        '&:hover': {
          color: 'red'
        }
      },
      ShareButton: {
        '&:hover': {
          color: 'green'
        }
      },
      AddToWishlistButton: {
        '&:hover': {
          color: 'blue'
        }
      }
    })
  )

  const classes = useStyles()

  useEffect(() => {
    console.log(productId)
    axios({
      method: 'get',
      url: '/api/product-management/productId?productId=' + productId,
      headers: {}
    }).then(res => {
      setProduct(res.data)
      console.log(res.data.ImageStorages)
      setCurrentState(true)
      setGalleries(
        res.data.ImageStorages.map(({ ImageUrl }) => ({
          original: `${ImageUrl}`,
          thumbnail: `${ImageUrl}`
        }))
      )

      console.log(images)
    })
  }, [productId])
  function filterByID (item) {
    if (productId === item.Id) {
      return true
    }
    return false
  }

  function addToCart () {
    const check_index = shopCart.findIndex(item => item.Id === productId)
    if (check_index !== -1) {
      shopCart[check_index].Quantity = shopCart[check_index].Quantity + quantity
      NotificationManager.success(
        'Success message',
        'Product in cart has been increase'
      )
    } else {
      const cartItem = {
        ProductId: productId,
        CurrentPrice: product.CurrentPrice,
        Quantity: quantity,
        TotalLine: 0,
        img: product.ImageStorages[0].ImageUrl,
        Name: product.Name
      }

      shopCart.push(cartItem)
      NotificationManager.success('Success message', 'Product added to cart')
    }

    dispatch(cart(shopCart))
  }
  function onIncrease () {
    setQuantity(quantity + 1)
    console.log(quantity)
  }
  function onDecrease () {
    if (quantity === 0) {
    } else {
      setQuantity(quantity - 1)
      console.log(quantity)
    }
  }

  function updateNumberPicker (e) {
    setQuantity(e.value + '')
  }

  const responsive = {
    0: { items: 1 }
  }
  const panes = [
    {
      menuItem: 'Description',
      render: () => <ProductDescription Description={''} />
    },
    {
      menuItem: 'Comments and Reviews',
      render: () => <ProductReview Comments={[]} />
    },

    {
      menuItem: 'Q and A',
      render: () => <ProductQuestionAndAnswer QuestionList={[]} />
    }
  ]

  if (currentState) {
    const properties = {
      // thumbnailPosition: 'left',
      useBrowserFullscreen: false,
      showPlayButton: false,
      // renderItem: myRenderItem(),
      items: galleries
    }

    return (
      <div class='main-container col1-layout wow bounceInUp animated'>
        <div class='main'>
          <div class='col-main'>
            {/* <!-- Endif Next Previous Product --> */}

            <div
              class='product-view wow bounceInUp animated'
              itemscope=''
              itemtype='http://schema.org/Product'
              itemid='#product_base'
            >
              <div id='messages_product_view'></div>

              <div class='product-essential container'>
                <div class='row'>
                  {/* <form action='#' method='post' id='product_addtocart_form'> */}
                  <div class='product-img-box col-lg-5 col-sm-5 col-xs-12'>
                    <div class='new-label new-top-left'>Hot</div>
                    <div class='sale-label sale-top-left'>
                      {product.CurrentPrice === product.Price ? null : (
                        <>
                          <span>-{-product.CurrentPrice + product.Price}%</span>
                        </>
                      )}
                    </div>
                    <MyImageGalery items={galleries} />

                    {/* <!-- end: more-images --> */}
                  </div>
                  {/* <!--End For version 1,2,6--> */}
                  {/* <!-- For version 3 --> */}
                  <div class='product-shop col-lg- col-sm-7 col-xs-12'>
                    <div class='product-name'>
                      <h1>{product.Name}</h1>
                    </div>
                    <div class='ratings'>
                      <div class='rating-box'>
                        <div style={{ width: '60%' }} class='rating'></div>
                      </div>
                      <p class='rating-links'>
                        <Link to=''>1 Review</Link>
                        <span class='separator'>|</span>
                        <Link to=''>Add Your Review</Link>
                      </p>
                    </div>
                    <div class='price-block'>
                      <div class='price-box'>
                        <p class='availability in-stock'>
                          <span>In Stock</span>
                        </p>
                        <p class='special-price'>
                          <span class='price-label'>Special Price</span>
                          <span id='product-price-48' class='price'>
                            {product.CurrentPrice},000 vnd
                          </span>
                        </p>
                      </div>
                    </div>
                    <div class='add-to-box'>
                      <div class='add-to-cart'>
                        <div class='pull-left'>
                          <div class='custom pull-left'>
                            <button
                              onClick={onDecrease}
                              class='reduced items-count'
                              type='button'
                            >
                              <i class='fa fa-minus'>&nbsp;</i>
                            </button>
                            <input
                              type='text'
                              class='input-text qty'
                              title='Qty'
                              value={quantity}
                              maxlength='12'
                              id='qty'
                              name='qty'
                            />
                            <button
                              onClick={onIncrease}
                              class='increase items-count'
                              type='button'
                            >
                              <i class='fa fa-plus'>&nbsp;</i>
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={addToCart}
                          class='button btn-cart'
                          title='Add to Cart'
                          type='button'
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                    <div class='short-description'>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nam fringilla augue nec est tristique auctor. Donec non
                        est at libero vulputate rutrum. Morbi ornare lectus quis
                        justo gravida semper. Nulla tellus mi, vulputate
                        adipiscing cursus eu, suscipit id nulla. Donec a neque
                        libero.
                      </p>
                    </div>
                    <div class='email-addto-box'>
                      <ul class='add-to-links'>
                        <li>
                          <Link class='link-wishlist' to={'/'}>
                            <span>Add to Wishlist</span>
                          </Link>
                        </li>
                        <li>
                          <span class='separator'>|</span>
                          <Link class='link-compare' to={'/'}>
                            <span>Add to Compare</span>
                          </Link>
                        </li>
                      </ul>
                      <p class='email-friend'>
                        <Link to='' class=''>
                          <span>Email to a Friend</span>
                        </Link>
                      </p>
                    </div>
                    <div class='social'>
                      <ul class='link'>
                        <li class='fb'>
                          <Link to=''></Link>
                        </li>
                        <li class='tw'>
                          <Link to=''></Link>
                        </li>
                        <li class='googleplus'>
                          <Link to=''></Link>
                        </li>
                        <li class='rss'>
                          <Link to=''></Link>
                        </li>
                        <li class='pintrest'>
                          <Link to=''></Link>
                        </li>
                        <li class='linkedin'>
                          <Link to=''></Link>
                        </li>
                        <li class='youtube'>
                          <Link to=''></Link>
                        </li>
                      </ul>
                    </div>

                    <ul class='shipping-pro'>
                      <li>Free Wordwide Shipping</li>
                      <li>30 Days Return</li>
                      <li>Member Discount</li>
                    </ul>
                  </div>
                  {/* <!--product-shop--> */}
                  {/* <!--Detail page static block for version 3--> */}
                  {/* </form> */}
                </div>
              </div>
              {/* <!--product-essential--> */}
              <div class='product-collateral container'>
                <ul id='product-detail-tab' class='nav nav-tabs product-tabs'>
                  <li class='active'>
                    <Link href='#product_tabs_description' data-toggle='tab'>
                      Product Description
                    </Link>
                  </li>
                  <li>
                    <Link href='#product_tabs_tags' data-toggle='tab'>
                      Tags
                    </Link>
                  </li>
                  <li>
                    <Link href='#reviews_tabs' data-toggle='tab'>
                      Reviews
                    </Link>
                  </li>
                  <li>
                    <Link href='#product_tabs_custom' data-toggle='tab'>
                      Custom Tab
                    </Link>
                  </li>
                  <li>
                    <Link href='#product_tabs_custom1' data-toggle='tab'>
                      Custom Tab1
                    </Link>
                  </li>
                </ul>
                <ProductReview Comments={[]} />
              </div>
              <section className=' wow bounceInUp animated'>
                <div className='best-pro slider-items-products container'>
                  <div className='new_title'>
                    <h2>You may also like</h2>
                  </div>
                  <VerticalItemList
                    topic='New Product'
                    apiUrl={
                      '/api/product-management?sort=up&pageIndex=1&pageSize=8'
                    }
                  />
                  <SeeMoreButton Url='/' />
                </div>
              </section>
              <section className=' wow bounceInUp animated'>
                <div className='best-pro slider-items-products container'>
                  <div className='new_title'>
                    <h2>Similar pproducts</h2>
                  </div>
                  <VerticalItemList
                    topic='New Product'
                    apiUrl={
                      '/api/product-management?sort=up&pageIndex=1&pageSize=8'
                    }
                  />
                  <SeeMoreButton Url='/' />
                </div>
              </section>
            </div>
          </div>
        </div>
        <NotificationContainer />
      </div>
    )
  }
  return <></>
}
export default ProductInformation
