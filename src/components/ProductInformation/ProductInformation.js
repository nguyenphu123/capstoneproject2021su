import '../../App.css'
import {
  Grid,
  Image,
  Button,
  Icon,
  Divider,
  Segment,
  Table,
  Comment,
  Form,
  Header,
  Rating,
  Statistic,
  Message,
  Tab,
  List
} from 'semantic-ui-react'
import VerticalItemList from '../Item-List/VerticalItemList'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cart } from '../../features/Cart/CartSlice'
import 'react-image-gallery/styles/css/image-gallery.css'
import ImageGallery from 'react-image-gallery'
import InputSpinner from 'react-bootstrap-input-spinner'
import axios from 'axios'
import _ from 'lodash'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'
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

  function addToCart () {
    const cartItem = {
      ProductId: productId,
      CurrentPrice: product.CurrentPrice,
      Quantity: quantity,
      TotalLine: 0,
      img: product.ImageStorages[0].ImageUrl,
      Name: product.Name
    }
    shopCart.push(cartItem)
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
      render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>
    },
    {
      menuItem: 'Comments and Reviews',
      render: () => (
        <Tab.Pane>
          
            <Grid.Column >
              <Comment.Group>
                <Header as='h3' dividing>
                  Comments
                </Header>

                <Comment>
                  <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                  <Comment.Content>
                    <Comment.Author as='a'>Matt</Comment.Author>
                    <Comment.Metadata>
                      <div>Today at 5:42PM</div>
                    </Comment.Metadata>
                    <Comment.Text>How artistic!</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>

                <Comment>
                  <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                  <Comment.Content>
                    <Comment.Author as='a'>Elliot Fu</Comment.Author>
                    <Comment.Metadata>
                      <div>Yesterday at 12:30AM</div>
                    </Comment.Metadata>
                    <Comment.Text>
                      <p>
                        This has been very useful for my research. Thanks as
                        well!
                      </p>
                    </Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                  <Comment.Group>
                    <Comment>
                      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                      <Comment.Content>
                        <Comment.Author as='a'>Jenny Hess</Comment.Author>
                        <Comment.Metadata>
                          <div>Just now</div>
                        </Comment.Metadata>
                        <Comment.Text>
                          Elliot you are always so right :)
                        </Comment.Text>
                        <Comment.Actions>
                          <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                      </Comment.Content>
                    </Comment>
                  </Comment.Group>
                </Comment>

                <Comment>
                  <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                  <Comment.Content>
                    <Comment.Author as='a'>Joe Henderson</Comment.Author>
                    <Comment.Metadata>
                      <div>5 days ago</div>
                    </Comment.Metadata>
                    <Comment.Text>
                      Dude, this is awesome. Thanks so much
                    </Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>

                <Form reply>
                  <Form.TextArea />
                  <Button
                    content='Add Reply'
                    labelPosition='left'
                    icon='edit'
                    primary
                  />
                </Form>
              </Comment.Group>
            </Grid.Column>
            <Grid.Column centered width={11}>
              Comment rules
            </Grid.Column>
         
        </Tab.Pane>
      )
    },

    { menuItem: 'Q and A', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }
  ]

  if (currentState) {
    return (
      <div style={{ marginTop: '100px', width: '1500px' }}>
        <Grid>
          <Grid.Row style={{ backgroundColor: '#ffffff' }}>
            <Grid.Column width={5}>
              {/* <AliceCarousel
                responsive={responsive}
                autoPlayInterval={2000}
                autoPlayDirection='rtl'
                mouseTracking='true'
                controlsStrategy='alternate'
              >
                {product &&
                  product.ImageStorages.map(({ ImageUrl }) => (
                    <img className='sliderimg' src={ImageUrl} />
                  ))}
              </AliceCarousel> */}
              <ImageGallery items={images} />
            </Grid.Column>

            <Grid.Column width={11}>
              <Grid>
                <Grid.Row>
                  <Header as='h1'>{product.Name}</Header>
                  <Grid.Column width={5} float='right'>
                    <Button color='red' icon='heart' />
                    <Button basic color='blue' icon='fork' />
                  </Grid.Column>
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
                  <div>
                    <Button
                      size='medium'
                      basic
                      color='green'
                      onClick={addToCart}
                      animated
                    >
                      <Button.Content visible>Add to cart</Button.Content>
                      <Button.Content hidden>
                        <Icon name='shop' />
                      </Button.Content>
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
          <Grid.Column width={11}>
            <VerticalItemList
              topic='Relative products'
              apiUrl={'/api/product-management?sort=up&pageIndex=1&pageSize=8'}
            />

            <VerticalItemList
              topic='You may like'
              apiUrl={'/api/product-management?sort=up&pageIndex=1&pageSize=8'}
            />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
  return <></>
}
export default ProductInformation
