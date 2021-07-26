import React from 'react'

// import { Steps } from 'rsuite'
// import { Image, Item, Segment } from 'semantic-ui-react'
import Table from '../Assets/table/Table'
import NumberFormat from 'react-number-format'
import Name from '../Assets/return/Name'
import Color from '../Assets/return/Color'
import Size from '../Assets/return/Size'
import { Link } from 'react-router-dom'
function OrderDetail ({ Orderdetails }) {
  const elements = ['Id', 'Name', 'Color', 'Size', 'Price', 'Quantity']

  const renderBodyElements = (item, index) => (
    <tr key={index} className='order'>
      <td>
        <Link to={'/Product/' + item.ProductId}>{item.ProductId}</Link>
      </td>
      <td>
        <Name Id={item.ProductId} />
      </td>
      <td>
        <Color Id={item.ProductId} Color={JSON.parse(item.Description).Color} />
      </td>
      <td>
        <Size Id={item.ProductId} Size={JSON.parse(item.Description).Size} />
      </td>

      <td>
        <NumberFormat
          value={item.CurrentPrice}
          className='foo'
          displayType={'text'}
          thousandSeparator={true}
          prefix={''}
          renderText={(value, props) => <div {...props}>{value}VND</div>}
        />
      </td>
      <td>{item.Quantity}</td>
    </tr>
  )
  const renderHead = (item, index) => <th key={index}>{item}</th>

  return (
    <div className='row' style={{ marginLeft: '20px' }}>
      <div className='col-12'>
        <div className='card'>
          <div className='card__body'>
            <Table
              limit='1000'
              headData={elements}
              renderHead={(item, index) => renderHead(item, index)}
              bodyData={Orderdetails}
              renderBody={(item, index) => renderBodyElements(item, index)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
