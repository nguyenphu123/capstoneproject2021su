import '../../App.css'
import 'react-image-gallery/styles/css/image-gallery.css'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Title from '../../Assets/Title'

import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// import InputSpinner from 'react-bootstrap-input-spinner'
// import ImageGallery from 'react-image-gallery'
// import { useDispatch, useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'
import {
  Comment,
  Grid,
  Header,
  Rating,
  Tab,
  List,
  Form
} from 'semantic-ui-react'

function ProductReview ({ Comments }) {
  return (
    <Tab.Pane>
      <Grid.Column>
        <List>
          <List.Item>
            <Title Name='Rating' />
          </List.Item>
          <List.Item>
            <Rating icon='star' defaultRating={5} maxRating={5} disabled />
          </List.Item>
          <List.Item>
            <Rating icon='star' defaultRating={4} maxRating={5} disabled />
          </List.Item>
          <List.Item>
            <Rating icon='star' defaultRating={3} maxRating={5} disabled />
          </List.Item>
          <List.Item>
            <Rating icon='star' defaultRating={2} maxRating={5} disabled />
          </List.Item>
          <List.Item>
            <Rating icon='star' defaultRating={1} maxRating={5} disabled />
          </List.Item>
        </List>

        <Comment.Group>
          <Title Name='Comments' />

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
                  This has been very useful for my research. Thanks as well!
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
                  <Comment.Text>Elliot you are always so right :)</Comment.Text>
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
              <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        </Comment.Group>
        <Form reply>
          <Form.TextArea />
          <Button variant='outlined' color='primary' size='medium'>
            Add Comment
          </Button>
        </Form>
      </Grid.Column>
    </Tab.Pane>
  )
}
export default ProductReview
