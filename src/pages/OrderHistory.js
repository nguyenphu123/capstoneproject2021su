import { Tab, Dropdown, Item } from 'semantic-ui-react'
import OrderItem from '../components/Order/OrderItem'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

function OrderHistory () {
  const [historylist, setHistorylist] = useState([])

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/order-management/users/1/orders'
    }).then(res => {
      console.log(res)
      console.log(res.data)
    })
  }, [])
  const Options = [
    { key: '0', value: '1', text: '1 month' },
    { key: '1', value: '3', text: '1 quarter' },
    { key: '2', value: '6', text: 'half year' },
    { key: '3', value: '12', text: 'a year' }
  ]

  const panes = [
    {
      menuItem: 'prepared',
      render: () => (
        <Tab.Pane attached={false}>
          <Dropdown
            placeholder='Select period'
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
      menuItem: 'on delivery',
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
      menuItem: 'finised',
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

  return <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
}

export default OrderHistory
