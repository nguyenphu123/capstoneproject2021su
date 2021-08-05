import React from 'react'

// import { Steps } from 'rsuite'
// import { Image, Item, Segment } from 'semantic-ui-react'
import Table from 'antd/lib/table'
import 'antd/lib/table/style/css'

import NumberFormat from 'react-number-format'
import Name from '../Assets/return/Name'
import Color from '../Assets/return/Color'
import Size from '../Assets/return/Size'
import { Link } from 'react-router-dom'
function OrderDetail ({ Orderdetails }) {
  console.log(Orderdetails)
  const tableColumns = [
    {
      title: 'ProductId',
      dataIndex: 'ProductId',
      key: 'ProductId'
    },

    {
      title: 'Name',
      render: (text, record) => (
        <Link to={'/Product/' + record.ProductId}>
          <Name Id={record.ProductId} />
        </Link>
      ),

      key: 'Name'
    },
    {
      title: 'Color',
      render: (text, record) => (
        <Color
          Id={record.ProductId}
          Color={JSON.parse(record.Description).Color}
        />
      ),
      key: 'Color'
    },
    {
      title: 'Size',
      render: (text, record) => (
        <Size
          Id={record.ProductId}
          Size={JSON.parse(record.Description).Size}
        />
      ),
      key: 'Size'
    },

    {
      title: 'Price',
      render: (text, record) => (
        <NumberFormat
          value={record.CurrentPrice}
          className='foo'
          displayType={'text'}
          thousandSeparator={true}
          prefix={''}
          renderText={(value, props) => <div {...props}>{value}VND</div>}
        />
      ),
      key: 'Price'
    },
    {
      title: 'Quantity',
      key: 'Quantity',
      dataIndex: 'Quantity'
    }
  ]

  return (
    <div>
      {Orderdetails === undefined ? null : (
        <Table dataSource={Orderdetails} columns={tableColumns} />
      )}
    </div>
  )
}

export default OrderDetail
