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
  Message
} from 'semantic-ui-react'
import VerticalItemList from '../Item-List/VerticalItemList'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cart } from '../../features/Cart/CartSlice'

import axios from 'axios'
import _ from 'lodash'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'

function ProductInformation () {
  const { productId } = useParams()
  //filter review
  const [reviewlist, setReviewlist] = useState([])
  const [review, setReview] = useState('')
  const [product, setProduct] = useState({})
  const [shopCart, setShopCart] = useState([])
  const [currentState, setCurrentState] = useState(false)
  const [quantity, setQuantity] = useState(0)

  const dispatch = useDispatch()
  const CartSlice = useSelector(state => state.CartSlice.cart)

  useEffect(() => {
    console.log(productId)
    axios({
      method: 'get',
      url: '/api/product-management/productId?productId=' + productId,
      headers: {}
    }).then(res => {
      console.log(res)
      console.log(res.data)

      setProduct(res.data)
      console.log(product)
      setCurrentState(true)
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
  console.log(product)
  if (currentState) {
    return (
      <div style={{ marginLeft: '200px', marginTop: '100px', width: '1500px' }}>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image src={product.ImageStorages[0].ImageUrl} />
            </Grid.Column>
            <Grid.Column width={11}>
              <Grid celled>
                <Grid.Row>[ORDER]{product.Name}</Grid.Row>

                <Grid.Row>
                  <Segment>
                    Chưa Có Đánh Giá <Divider vertical></Divider> 1 Đã Bán{' '}
                  </Segment>
                </Grid.Row>
                <Grid.Row>{product.CurrentPrice}</Grid.Row>
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
                                text={Name}
                                value={Id}
                              />
                            ))}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Odor</Table.Cell>
                        <Table.Cell>Not Much Usually</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Grid.Row>
                <Grid.Row>
                  <div>
                    <Button
                      color='red'
                      content='Like'
                      icon='heart'
                      label={{
                        basic: true,
                        color: 'red',
                        pointing: 'left',
                        content: '2,048'
                      }}
                    />
                    <Button
                      basic
                      color='blue'
                      content='Fork'
                      icon='fork'
                      label={{
                        as: 'a',
                        basic: true,
                        color: 'blue',
                        pointing: 'left',
                        content: '2,048'
                      }}
                    />
                  </div>
                </Grid.Row>
                <Grid.Row>
                  <div>
                    {/* <Button animated>
                      <Button.Content visible>Next</Button.Content>
                      <Button.Content hidden>
                        <Icon name='arrow right' />
                      </Button.Content>
                    </Button> */}
                    <Button onClick={addToCart} animated>
                      <Button.Content visible>Shop</Button.Content>
                      <Button.Content hidden>
                        <Icon name='shop' />
                      </Button.Content>
                    </Button>
                  </div>
                </Grid.Row>
                <Grid.Row>
                  quantity
                  <Button.Group>
                    <Button
                      icon='minus'
                      onClick={() =>
                        quantity === 0 ? (
                          <Message
                            error
                            header='There was some errors with your submission'
                            list={[
                              'You must include both a upper and lower case letters in your password.',
                              'You need to select your home country.'
                            ]}
                          />
                        ) : (
                          setQuantity(quantity - 1)
                        )
                      }
                    />

                    <Button
                      icon='plus'
                      onClick={() => setQuantity(quantity + 1)}
                    />
                  </Button.Group>
                  <Statistic size='mini'>
                    <Statistic.Value>{quantity}</Statistic.Value>
                  </Statistic>
                </Grid.Row>
                <Grid.Row>
                  <Rating maxRating={5} defaultRating={3} icon='star' />
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid>
              {product &&
                product.ImageStorages.map(({ ImageUrl }) => (
                  <Grid.Column>
                    <Image size='tiny' src={ImageUrl} />
                  </Grid.Column>
                ))}
            </Grid>
          </Grid.Row>
          <Grid.Column centered width={11}>
            <Grid.Row centered>
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
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={11}>
            <VerticalItemList
              topic='Relative products'
              apiUrl={'/api/product-management?sort=up&pageIndex=1&pageSize=1'}
            />

            <VerticalItemList
              topic='You may like'
              apiUrl={'/api/product-management?sort=up&pageIndex=1&pageSize=1'}
            />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
  return <></>
}
export default ProductInformation
