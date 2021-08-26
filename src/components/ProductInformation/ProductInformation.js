import 'react-image-gallery/styles/css/image-gallery.css'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
// import Button from '@material-ui/core/Button'
// import VerticalItemListImageSearch from '../../components/Item-List/VerticalItemListImageSearch'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

import SeeMoreButton from '../../Assets/SeeMoreButton'

import ProductQuestionAndAnswer from './ProductQuestionAndAnswer'
import ProductDescription from './ProductDescription'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { comparator } from '../../features/Comparator/ComparatorSlice'

import MyImageGalery from './MyImageGalery'
import {
  cart,
  emptyCart,
  deleteItem,
  updateItemQuantity,
  updateItemColor,
  updateItemSize
} from '../../features/Cart/CartSlice'

import VerticalItemListHome from '../Item-List/VerticalItemListHome'
import { ToastContainer, toast } from 'react-toastify'
import { Tab, Button, Rating } from 'semantic-ui-react'

const mapDispatch = {
  cart,
  emptyCart,
  deleteItem,
  updateItemQuantity,
  updateItemColor,
  updateItemSize,
  comparator
}

function ProductInformation () {
  const { productId } = useParams()
  const UserSlice = useSelector(state => state.UserSlice.user)
  const [results, setResults] = React.useState([])

  //filter review
  const [reviewlist, setReviewlist] = useState([])
  const [review, setReview] = useState('')
  const [product, setProduct] = useState({})
  const [colors, setColors] = useState([])
  const [currentColor, setCurrentColor] = useState('')
  const [sizes, setSizes] = useState([])
  const [currentSize, setCurrentSize] = useState('')
  const [maxQuantity, setMaxQuantity] = useState(0)
  const [visibilityEmail, setVisibilityEmail] = useState(false)
  const [comments, setComments] = useState([])
  const [currentState, setCurrentState] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const [images, setImages] = useState({})
  const [galleries, setGalleries] = useState([])
  const [elements, setElements] = useState([])
  const dispatch = useDispatch()
  const CartSlice = useSelector(state => state.CartSlice.cart)
  const [shopCart, setShopCart] = useState(CartSlice)
  const ComparatorSlice = useSelector(state => state.ComparatorSlice.comparator)
  const [comparators, setComparators] = useState([])
  function addtoWhisList (e) {
    e.preventDefault()
    if (UserSlice === null) {
    } else {
      const wish = {
        ProductId: Id,
        UserId: UserSlice.Id
      }
      axios({
        method: 'POST',
        url: '/api/whistlist-management',
        data: wish
      }).then(res => {})
    }
  }
  useEffect(() => {
    setResults(results => results)
  }, [results])

  useEffect(() => {
    if (comparators !== null) {
      if (comparators.length !== 0) {
        dispatch(comparator(comparators))
      }
    } else {
      setComparators([])
    }
  }, [comparators])
  useEffect(() => {
    if (ComparatorSlice !== null) {
      if (ComparatorSlice.length !== 0) {
        console.log(ComparatorSlice)
        setComparators(ComparatorSlice)
      }
    } else {
      setComparators([])
    }
  }, [ComparatorSlice])
  useEffect(() => {
    axios({
      method: 'get',
      url: '/review-management',
      headers: {}
    }).then(res => {
      console.log(res.data)
      let result = res.data.filter(x => x.ProductId === productId)
      console.log(result)
      for (let index = 0; index < result.length; index++) {
        const element = result[index]
        comments.push(element)
      }
      console.log(comments)
    })
  }, [productId])

  function addToComparator (e) {
    e.preventDefault()
    console.log(comparators)
    const item = {
      ProductId: productId,
      CurrentPrice: product.CurrentPrice,
      img: product.ImageStorages[0].ImageUrl,
      Name: product.Name,
      Elements: product.Elements
    }
    if (ComparatorSlice !== null && ComparatorSlice.length !== 0) {
      console.log(ComparatorSlice)

      const check_index = ComparatorSlice.findIndex(
        item => item.ProductId === productId
      )
      if (check_index !== -1) {
        console.log(ComparatorSlice)
      } else {
        setComparators(comparators => [...comparators, item])
      }
    } else {
      setComparators(comparators => [...comparators, item])
    }
  }

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

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/product-management/productId?productId=' + productId,
      headers: {}
    }).then(res => {
      console.log(res.data)
      setProduct(res.data)
      console.log(res.data.ImageStorages)

      if (res.data.Elements.length > 0) {
        for (let index = 0; index < res.data.Elements.length; index++) {
          const element = res.data.Elements[index]
          const check_index_color = colors.findIndex(
            item => item.Id === element.Color.Id
          )
          if (check_index_color !== -1) {
          } else {
            colors.push(element.Color)
          }
          const check_index_size = sizes.findIndex(
            item => item.Id === element.Size.Id
          )
          if (check_index_size !== -1) {
          } else {
            sizes.push(element.Size)
          }
        }
        setElements(res.data.Elements)
        console.log(sizes)
        console.log(colors)

        console.log(images)
        setCurrentColor(colors[0].Id)
        setCurrentSize(sizes[0].Id)
        const check_index = res.data.Elements.findIndex(
          item => item.Color === colors[0].Id && item.Size === sizes[0].Id
        )
        if (check_index !== -1) {
          setMaxQuantity(res.data.Elements[check_index].Quantity)
        } else {
        }
      } else {
        setMaxQuantity(0)
      }

      setGalleries(
        res.data.ImageStorages.map(({ ImageUrl }) =>
          ImageUrl.includes('http')
            ? {
                original: `${ImageUrl}`,
                thumbnail: `${ImageUrl}`
              }
            : {
                original: `${'http://54.151.255.155:5000/' + ImageUrl}`,
                thumbnail: `${'http://54.151.255.155:5000/' + ImageUrl}`
              }
        )
      )

      if (CartSlice !== null) {
        setShopCart(CartSlice)
        console.log(CartSlice)

        const check_index = shopCart.findIndex(
          item =>
            item.ProductId === productId &&
            item.Color === res.data.Elements[0].Color.Id &&
            item.Size === res.data.Elements[0].Size.Id
        )
        if (check_index !== -1) {
          setQuantity(shopCart[check_index].Quantity)
          setMaxQuantity(res.data.Elements[0].Quantity)
        } else {
        }
      } else {
        setShopCart([])
      }

      setCurrentState(true)
    })
  }, [productId])

  useEffect(() => {
    if (currentColor !== '') {
      console.log(currentColor)
      setCurrentColor(currentColor => currentColor)
      const check_index = product.Elements.findIndex(
        item => item.Color === currentColor && item.Size === currentSize
      )

      if (check_index !== -1) {
        setMaxQuantity(product.Elements[check_index].Quantity)
      } else {
        setMaxQuantity(0)
      }
      if (CartSlice !== null) {
        const check_indexQuantity = CartSlice.findIndex(
          item =>
            item.ProductId === productId &&
            item.Color === currentColor &&
            item.Size === currentSize
        )
        if (check_indexQuantity !== -1) {
          setQuantity(CartSlice[check_indexQuantity].Quantity)
        } else {
          setQuantity(0)
        }
      } else {
      }
    } else {
    }
  }, [currentColor])
  useEffect(() => {
    if (currentSize !== '') {
      console.log(currentSize)
      setCurrentSize(currentSize => currentSize)
      const check_index = product.Elements.findIndex(
        item => item.Color === currentColor && item.Size === currentSize
      )
      if (check_index !== -1) {
        setMaxQuantity(product.Elements[check_index].Quantity)
      } else {
        setMaxQuantity(0)
      }
      if (CartSlice !== null) {
        console.log(CartSlice)
        const check_indexQuantity = CartSlice.findIndex(
          item =>
            item.ProductId === productId &&
            item.Size === currentSize &&
            item.Color === currentColor
        )
        console.log(check_indexQuantity)
        console.log(CartSlice)

        if (check_indexQuantity !== -1) {
          setQuantity(CartSlice[check_indexQuantity].Quantity)
        } else {
          setQuantity(0)
        }
      } else {
      }
    } else {
    }
  }, [currentSize])

  function addToCart () {
    if (product.Elements.length === 0 || product.Status === false) {
      toast.error('Sorry product not availble for buying')
    } else {
      if (quantity === 0) {
        toast.error('please input quantity')
      } else {
        const check_index = shopCart.findIndex(
          item =>
            item.ProductId === productId &&
            item.Color === currentColor &&
            item.Size === currentSize
        )
        console.log(check_index)
        if (check_index !== -1) {
          dispatch(
            updateItemQuantity(productId, quantity, currentColor, currentSize)
          )

          toast.success('Cart has been updated')
        } else {
          const check_index = elements.findIndex(
            item =>
              item.Color.Id === currentColor && item.Size.Id === currentSize
          )
          console.log(elements[check_index])
          console.log(elements)

          if (check_index !== -1) {
            setMaxQuantity(elements[check_index].Quantity)
            const cartItem = {
              ProductId: productId,
              CurrentPrice: product.CurrentPrice,
              Quantity: quantity,
              TotalLine: product.CurrentPrice * quantity,
              img: product.ImageStorages[0].ImageUrl,
              Name: product.Name,
              Color: currentColor,
              Size: currentSize,
              SizeList: sizes,
              ColorList: colors,
              Description: JSON.stringify({
                Color: currentColor,
                Size: currentSize,
                img: product.ImageStorages[0].ImageUrl
              }),
              MaxQuantity: elements[check_index].Quantity,
              Elements: elements
            }

            setShopCart(shopCart => [...shopCart, cartItem])
            console.log(shopCart)

            toast.success('Item has been added')
            // setCurrentColor(shopCart[check_index].Color)
            // setCurrentSize(shopCart[check_index].Size)
          } else {
            toast.warn("Sorry we don't have this combo yet")
          }
        }
      }
    }
  }
  function onIncrease () {
    setQuantity(quantity => quantity + 1)
  }
  function onDecrease () {
    if (quantity === 0) {
    } else {
      setQuantity(quantity => quantity - 1)
    }
  }
  useEffect(() => {
    setElements(elements => elements)

    console.log(elements)
  }, [elements])

  useEffect(() => {
    setMaxQuantity(maxQuantity => maxQuantity)

    console.log(maxQuantity)
  }, [maxQuantity])

  useEffect(() => {
    setQuantity(quantity => quantity)
  }, [quantity])
  useEffect(() => {
    if (shopCart !== null) {
      if (shopCart.length !== 0) {
        dispatch(cart(shopCart))
      }
    }
  }, [shopCart])

  function updateNumberPicker (e) {
    setQuantity(e.target.value + '')
  }

  const responsive = {
    0: { items: 1 }
  }
  const panes = [
    {
      menuItem: 'Description',
      render: () => <ProductDescription Description={product.Description} />
    },

    {
      menuItem: 'Rating and Reviews',
      render: () => (
        <ProductQuestionAndAnswer product={product} comments={comments} />
      )
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
                    {product.CurrentPrice === product.Price ? null : (
                      <div class='sale-label sale-top-left'>
                        <span>
                          -
                          {Math.round(
                            ((product.Price - product.CurrentPrice) * 100) /
                              product.Price
                          )}
                          %
                        </span>
                      </div>
                    )}

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
                      {product.Star === 'NaN' ? (
                        <Rating
                          maxRating={5}
                          defaultRating={0}
                          icon='star'
                          size='mini'
                        />
                      ) : (
                        <Rating
                          maxRating={5}
                          defaultRating={product.Star}
                          icon='star'
                          size='mini'
                        />
                      )}
                    </div>
                    <div class='price-block'>
                      <div class='price-box'>
                        {product.Elements.length === 0 ||
                        product.Status === false ? (
                          <p class='availability out-stock'>
                            <span>Not Available </span>
                          </p>
                        ) : (
                          <p class='availability in-stock'>
                            <span>In Stock</span>
                          </p>
                        )}

                        <p class='special-price'>
                          <span class='price-label'>Special Price</span>
                          <span id='product-price-48' class='price'>
                            <NumberFormat
                              value={product.CurrentPrice}
                              className='foo'
                              displayType={'text'}
                              thousandSeparator={true}
                              prefix={''}
                              renderText={(value, props) => (
                                <div {...props}>{value}VND</div>
                              )}
                            />
                          </span>
                        </p>
                        <div>
                          <div>
                            <Button.Group>
                              {colors.map(({ Name, Id }) =>
                                currentColor === Id ? (
                                  <Button color={Name} toggle active={true}>
                                    {Name}
                                  </Button>
                                ) : (
                                  <Button
                                    color={Name}
                                    onClick={value => setCurrentColor(Id)}
                                    toggle
                                    active={false}
                                  >
                                    {Name}
                                  </Button>
                                )
                              )}
                            </Button.Group>
                          </div>
                          <div>
                            <br />

                            <Button.Group>
                              {sizes.map(({ Name, Id }) =>
                                currentSize === Id ? (
                                  <Button toggle active={true}>
                                    {Name}
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={value => setCurrentSize(Id)}
                                    toggle
                                    active={false}
                                  >
                                    {Name}
                                  </Button>
                                )
                              )}
                            </Button.Group>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class='add-to-box'>
                      <div class='add-to-cart'>
                        <div class='pull-left'>
                          <div class='custom pull-left'>
                            <button
                              onClick={() => (quantity > 0 ? onDecrease : null)}
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
                              onChange={e => setQuantity(e.target.value)}
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
                      <p>{product.Description}</p>
                    </div>
                    <div class='email-addto-box'>
                      <ul class='add-to-links'>
                        <li>
                          <Link class='link-wishlist' onClick={addtoWhisList}>
                            <span>Add to Wishlist</span>
                          </Link>
                        </li>
                        <li>
                          <span class='separator'>|</span>
                          <Link class='link-compare' onClick={addToComparator}>
                            <span>Add to Compare</span>
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <ul class='shipping-pro'>
                      <li>Free in city Shipping</li>
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
                <Tab
                  menu={{
                    color: 'green',
                    attached: false,
                    tabular: false,
                    secondary: true,
                    pointing: true
                  }}
                  panes={panes}
                />
              </div>
              <section className=' wow bounceInUp animated'>
                <div className='best-pro slider-items-products container'>
                  <div className='new_title'>
                    <h2>You may also like</h2>
                  </div>
                  <VerticalItemListHome
                    topic='Super deals'
                    apiUrl={'/api/recommend-management/' + product.CategoryId}
                  />
                  <SeeMoreButton
                    Url={'/Category/' + product.CategoryId + '/1'}
                  />
                </div>
              </section>
              <section className=' wow bounceInUp animated'>
                <div className='best-pro slider-items-products container'>
                  {/* <div className='new_title'>
                    <h2>Similar pproducts</h2>
                  </div> */}
                  {/* <VerticalItemListHome
                    topic='Super deals'
                    apiUrl={
                      '/api/product-management?sort=up&pageIndex=1&pageSize=8'
                    }
                  /> */}
                  {/* <VerticalItemListImageSearch
                    topic='Super deals'
                    ImageList={results}
                    apiUrl={
                      '/api/product-management?sort=up&pageIndex=1&pageSize=500'
                    }
                  />

                  <SeeMoreButton Url='/AllProduct/1/Grid' /> */}
                </div>
              </section>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={5000} />
      </div>
    )
  }
  return <></>
}
export default ProductInformation
