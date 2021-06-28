
import 'react-image-gallery/styles/css/image-gallery.css'

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
  const [images, setImages] = useState([])

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

      setImages(
        res.data.ImageStorages.map(({ ImageUrl }) => ({
          original: `${ImageUrl}`,
          thumbnail: `${ImageUrl}`
        }))
      )
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
    return (
      <div style={{ marginTop: '200px', width: '1300px', marginLeft: '30px' }}>
        <Grid>
          <Grid.Row style={{ backgroundColor: '#ffffff' }}>
            <Grid.Column width={5}>
              <ImageGallery items={images} />
            </Grid.Column>

            <Grid.Column width={11}>
              <Grid>
                <Grid.Row>
                  <Header as='h1'>
                    {product.Name}
                    <IconButton
                      onClick={e => e.preventDefault()}
                      className={classes.LikeButton}
                      aria-label='add to favorites'
                    >
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton
                      onClick={e => e.preventDefault()}
                      className={classes.ShareButton}
                      aria-label='share'
                    >
                      <ShareIcon />
                    </IconButton>
                    <IconButton
                      onClick={e => e.preventDefault()}
                      className={classes.AddToWishlistButton}
                      aria-label='Add to watch list'
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </Header>
                </Grid.Row>
                <Grid.Row>
                  <Grid padded='horizontally'>
                    <Grid.Column>
                      <Rating maxRating={5} defaultRating={3} icon='star' />
                      <a href=''>1848 đánh giá </a>|
                      <a href=''> 22 câu hỏi đã trả lời</a>
                    </Grid.Column>
                  </Grid>
                </Grid.Row>
                <Grid.Row>
                  <Header as='h3' color='red'>
                    {product.CurrentPrice},000 vnd
                  </Header>
                </Grid.Row>
                <Grid.Row>
                  {product.CurrentPrice === product.Price ? null : (
                    <>
                      <span
                        style={{
                          textDecoration: 'line-through',
                          opacity: '0.7'
                        }}
                      >
                        {product.Price},000 vnd
                      </span>
                      <span>
                        -{(product.CurrentPrice / product.Price) * 100}%
                      </span>
                    </>
                  )}
                </Grid.Row>

                <Grid.Row>
                  <Table definition>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell width={2}>Size</Table.Cell>
                        <Table.Cell>
                          {product &&
                            product.Sizes.map(({ Name, Id }) => (
                              <Button
                                label={{
                                  color: Name,
                                  empty: true,
                                  circular: true
                                }}
                                toggle
                                text={Name}
                                value={Id}
                              />
                            ))}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Weight</Table.Cell>
                        <Table.Cell>6 ounces</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Color</Table.Cell>
                        <Table.Cell>
                          {product &&
                            product.Colors.map(({ Name, Id }) => (
                              <Button
                                label={{
                                  color: Name,
                                  empty: true,
                                  circular: true
                                }}
                                toggle
                                text={Name}
                                value={Id}
                              />
                            ))}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Brand</Table.Cell>
                        <Table.Cell>No Brand</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Voucher</Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Grid.Row>
                <Grid.Row>
                  <Header as='h1' color='black'>
                    quantity:
                  </Header>

                  <InputSpinner
                    type={'real'}
                    min={0}
                    step={1}
                    value={quantity}
                    onChange={num => setQuantity(num)}
                    variant={'dark'}
                    size='lg'
                  />
                </Grid.Row>
                <Grid.Row>
                  <div className={classes.root}>
                    <Button
                      onClick={addToCart}
                      variant='outlined'
                      color='primary'
                      size='medium'
                      endIcon={<AddShoppingCartIcon />}
                      style={{ width: '45%' }}
                    >
                      Add to cart
                    </Button>
                    <Button
                      onClick={addToCart}
                      variant='outlined'
                      color='secondary'
                      size='medium'
                      endIcon={<ShoppingBasketIcon />}
                      style={{ width: '45%' }}
                    >
                      Buy now
                    </Button>
                  </div>
                </Grid.Row>
                <Grid.Row></Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>

          <Grid.Column centered width={16}>
            <Tab panes={panes} />
          </Grid.Column>
          <Grid.Column width={16}>
            <VerticalItemList
              topic='Relative products'
              apiUrl={'/api/product-management?sort=up&pageIndex=1&pageSize=8'}
            />
            <SeeMoreButton Url='/' />

            <VerticalItemList
              topic='You may like'
              apiUrl={'/api/product-management?sort=up&pageIndex=1&pageSize=8'}
            />
            <SeeMoreButton Url='/' />
          </Grid.Column>
        </Grid>
        <NotificationContainer />
      </div>
    )
  }
  return <></>
}
export default ProductInformation
