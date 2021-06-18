import '../App.css'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Steps } from 'rsuite'
import { Image, Item, Segment } from 'semantic-ui-react'

function OrderDetail () {
  const { orderId } = useParams()
  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/category-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
    })
  }, [orderId])

  return (
    <>
      <Segment vertical>
        <Steps current={1}>
          <Steps.Item title='Finished' description='Checking.' />
          <Steps.Item title='In Progress' description='Wrapping.' />
          <Steps.Item title='Waiting' description='Delivery.' />
          <Steps.Item title='Waiting' description='Finishing.' />
        </Steps>
      </Segment>
      <Segment vertical>
        <div>
          <Item>
            <Item.Image
              size='tiny'
              src='https://react.semantic-ui.com/images/wireframe/image.png'
            />

            <Item.Content>
              <Item.Header as='a'>Header</Item.Header>
              <Item.Meta>Description</Item.Meta>
              <Item.Description>
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
              </Item.Description>
              <Item.Extra>Additional Details</Item.Extra>
            </Item.Content>
          </Item>
        </div>
      </Segment>
    </>
  )
}

export default OrderDetail
