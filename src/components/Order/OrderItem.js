import logo from '../../logo.svg'
import '../../App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Item, Image } from 'semantic-ui-react'

function OrderItem () {
  return (
    <div style={{ height: '200px' }}>
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
  )
}

export default OrderItem
