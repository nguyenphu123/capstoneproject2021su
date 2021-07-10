import PropTypes from 'prop-types'
import clsx from 'clsx'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Steps } from 'rsuite'
import { Image, Item, Segment } from 'semantic-ui-react'
import Table from '../Assets/table/Table'

function OrderDetail ({ ProductDetail }) {
  const elements = ['Id', 'Price', 'Quantity']

  const renderBodyElements = (item, index) => (
    <tr key={index}>
      <td>{item.ProductId}</td>
      <td>{item.CurrentPrice}</td>
      <td>{item.Quantity}</td>
    </tr>
  )
  const renderHead = (item, index) => <th key={index}>{item}</th>

  return (
    <div className='row'>
      <div className='col-12'>
        <div className='card'>
          <div className='card__body'>
            <Table
              limit='1000'
              headData={elements}
              renderHead={(item, index) => renderHead(item, index)}
              bodyData={ProductDetail}
              renderBody={(item, index) => renderBody(item, index)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
