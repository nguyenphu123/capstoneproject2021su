import Title from '../../Assets/Title'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Grid, Rating, Tab, Form, Button, Item } from 'semantic-ui-react'
import Modal from 'react-awesome-modal'

function ProductQuestionAndAnswer ({ product, comments }) {
  const UserSlice = useSelector(state => state.UserSlice.user)
  const [visibility, setVisibility] = useState(false)
  const [loadComplete, setLoadComplete] = useState(false)

  const [productAvgStar, setProductAvgStar] = useState(product.Star)
  const [star, setStar] = useState(0)
  const [reviewcomments, setReviewComments] = useState(comments)
  const [comment, setComment] = useState('')
  useEffect(() => {
    setLoadComplete(loadComplete => loadComplete)
  }, [loadComplete])
  useEffect(() => {
    setReviewComments(reviewcomments => reviewcomments)
    setLoadComplete(true)
  }, [reviewcomments])

  const handleRate = (e, { rating, maxRating }) => {
    setStar(rating)

    e.stopPropagation()
    e.preventDefault()
    setVisibility(!visibility)
  }

  useEffect(() => {
    setStar(star => star)
  }, [star])
  useEffect(() => {
    setProductAvgStar(productAvgStar => productAvgStar)
  }, [productAvgStar])
  useEffect(() => {
    setComment(comment => comment)
  }, [comment])

  function openComment (e) {
    e.stopPropagation()
    e.preventDefault()
    setVisibility(!visibility)
  }
  function submitComment () {
    let myComment = {
      ProductId: product.Id,
      Star: star,
      UserName: UserSlice.UserName,
      Comment: comment
    }
    axios({
      method: 'post',
      url: '/review-management',
      headers: {},
      data: myComment
    }).then(res => {
      comments.push(myComment)
      if (productAvgStar === 'NaN') {
        setProductAvgStar(star)
      } else {
        setProductAvgStar((productAvgStar + star) / 2)
      }
    })
  }
  function commentChange (e, { name, value }) {
    setComment(value)
  }
  if (!loadComplete) {
    return <Tab.Pane>Loading please wait a moment</Tab.Pane>
  } else {
    console.log(comments)

    if (UserSlice === null) {
      return (
        <Tab.Pane>
          <div id='productTabContent' class='tab-content'>
            <div class='tab-pane fade in active' id='product_tabs_description'>
              <div>
                Average Rating:
                {productAvgStar === 'NaN' ? (
                  <Rating
                    maxRating={5}
                    defaultRating={0}
                    icon='star'
                    size='mini'
                  />
                ) : (
                  <Rating
                    maxRating={5}
                    defaultRating={productAvgStar}
                    icon='star'
                    size='massive'
                  />
                )}
                <br />
                <br />
                Please login to rate and comment
                <br />
                <br />
              </div>
            </div>
          </div>

          <Grid.Column>
            <Item.Group>
              <Title Name='Comment' />

              {comments.map(({ UserName, Comment, Star }) => (
                <Item>
                  <Item.Image
                    size='tiny'
                    src='https://react.semantic-ui.com/images/wireframe/image.png'
                  />

                  <Item.Content>
                    <Item.Header as='a'>{UserName}</Item.Header>
                    <Item.Meta>
                      <Rating
                        maxRating={5}
                        defaultRating={Star}
                        icon='star'
                        size='mini'
                      />
                    </Item.Meta>
                    <Item.Description>{Comment}</Item.Description>
                  </Item.Content>
                </Item>
              ))}
            </Item.Group>
          </Grid.Column>
        </Tab.Pane>
      )
    } else {
      console.log(comments)

      return (
        <Tab.Pane>
          <div id='productTabContent' class='tab-content'>
            <div class='tab-pane fade in active' id='product_tabs_description'>
              <div>
                Average Rating:
                {productAvgStar === 'NaN' ? (
                  <Rating
                    maxRating={5}
                    defaultRating={0}
                    icon='star'
                    size='mini'
                  />
                ) : (
                  <Rating
                    maxRating={5}
                    defaultRating={productAvgStar}
                    icon='star'
                    size='massive'
                  />
                )}
                <br />
                <br />
                Rate this product:
                <Rating
                  maxRating={5}
                  defaultRating={star}
                  onRate={handleRate}
                  icon='star'
                  size='massive'
                />
                <br />
                <br />
              </div>
            </div>
          </div>
          <Modal
            visible={visibility}
            width='1400'
            height='500'
            effect='fadeInUp'
            onClickAway={openComment}
          >
            <a href='javascript:void(0);' onClick={openComment}>
              Close
            </a>

            <div className='Modal'>
              <Form reply onSubmit={submitComment}>
                <Form.TextArea
                  placeholder='comment'
                  name='comment'
                  value={comment}
                  onChange={commentChange}
                />
                <Button variant='outlined' color='primary' size='medium'>
                  Submit
                </Button>
              </Form>
            </div>
          </Modal>
          <Grid.Column>
            <Item.Group>
              <Title Name='Comment' />

              {comments.map(({ UserName, Comment, Star }) => (
                <Item>
                  <Item.Image
                    size='tiny'
                    src='https://react.semantic-ui.com/images/wireframe/image.png'
                  />

                  <Item.Content>
                    <Item.Header as='a'>{UserName}</Item.Header>
                    <Item.Meta>
                      <Rating
                        maxRating={5}
                        defaultRating={Star}
                        icon='star'
                        size='mini'
                      />
                    </Item.Meta>
                    <Item.Description>{Comment}</Item.Description>
                  </Item.Content>
                </Item>
              ))}
            </Item.Group>
          </Grid.Column>
        </Tab.Pane>
      )
    }
  }
}
export default ProductQuestionAndAnswer
