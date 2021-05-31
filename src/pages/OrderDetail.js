import '../App.css'
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Item, Image, Segment } from 'semantic-ui-react'
import { Steps } from 'rsuite'

function OrderDetail () {
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
