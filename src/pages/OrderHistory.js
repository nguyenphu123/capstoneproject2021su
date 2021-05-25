import React from 'react'
import {
  Tab,
  Form,
  Grid,
  Header,
  Image,
  Dropdown,
  Segment
} from 'semantic-ui-react'
import OrderItem from '../components/Order/OrderItem'
const Options = [
  { key: '0', value: '1',  text: '1 month' },
  { key: '1', value: '3',  text: '1 quarter' },
  { key: '2', value: '6',  text: 'half year' },
  { key: '3', value: '12',  text: 'a year' }
 
]

const panes = [
  {
    menuItem: 'Tab 1',
    render: () => (
      <Tab.Pane attached={false}>
        <Dropdown
          placeholder='Select Country'
          fluid
          search
          selection
          options={Options}
        />

        <Item.Group link>
          <OrderItem />
          <OrderItem />
        </Item.Group>
      </Tab.Pane>
    )
  },
  {
    menuItem: 'Tab 2',
    render: () => (
      <Tab.Pane attached={false}>
        <Dropdown
          placeholder='Select Country'
          fluid
          search
          selection
          options={Options}
        />

        <Item.Group link>
          <OrderItem />
          <OrderItem />
        </Item.Group>
      </Tab.Pane>
    )
  },
  {
    menuItem: 'Tab 3',
    render: () => (
      <Tab.Pane attached={false}>
        <Dropdown
          placeholder='Period'
          fluid
          search
          selection
          options={Options}
        />

        <Item.Group link>
          <OrderItem />
          <OrderItem />
        </Item.Group>
      </Tab.Pane>
    )
  }
]

function LoginPage () {
  return <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
}

export default LoginPage
