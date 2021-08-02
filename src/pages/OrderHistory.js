// import Table from '@material-ui/core/Table'

import Modal from 'react-awesome-modal'
import OrderDetail from './OrderDetail'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Header } from 'semantic-ui-react'
import Table from '../Assets/table/Table'
import NumberFormat from 'react-number-format'
import OrderShipping from './OrderShipping'

function OrderHistory (props) {
  const UserSlice = useSelector(state => state.UserSlice.user)

  const [historylist, setHistorylist] = useState([])
  const [visibility, setVisibility] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // const [order, setOrder] = useState('asc')
  // const [orderBy, setOrderBy] = useState('Date')
  const [selected, setSelected] = useState([])
  // const [page, setPage] = useState(0)

  // const [rowsPerPage, setRowsPerPage] = useState(5)
  // const getHistories = async () => {}

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/order-management/users/' + UserSlice.Id + '/orders'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      setHistorylist(res.data)
      console.log(historylist)
      setIsLoading(false)
    })
  }, [isLoading])
  if (isLoading) {
    return <></>
  } else {
    console.log(historylist)

    const elements = [
      'Id',
      'Date',
      'Number of products',
      'address',
      'Total',
      'Shipping status',
      'Paid status'
    ]

    const renderBodyElements = (item, index) => (
      <>
        <Modal
          visible={visibility}
          width='1400'
          height='800'
          effect='fadeInUp'
          onClickAway={() => setVisibility(!visibility)}
        >
          <div>
            <a
              href='javascript:void(0);'
              onClick={() => setVisibility(!visibility)}
            >
              Close
            </a>

            <h1>Order Detail</h1>
            <OrderDetail Orderdetails={item.Orderdetails} />
          </div>
        </Modal>

        <tr
          key={index}
          className='order'
          onClick={() => setVisibility(!visibility)}
        >
          <td>{item.Id}</td>

          <td>{item.Date}</td>
          <td>{item.Orderdetails.length}</td>
          <td>{item.AddressShipping}</td>
          <td>
            <NumberFormat
              value={item.TotalPrice}
              className='foo'
              displayType={'text'}
              thousandSeparator={true}
              prefix={''}
              renderText={(value, props) => <div {...props}>{value}VND</div>}
            />
          </td>
          <td>
            <OrderShipping props={item.Id} />
          </td>

          <td>
            {item.Status ? (
              <Header as='h4' color='green'>
                Paid
              </Header>
            ) : (
              <Header as='h4' color='red'>
                Not paid
              </Header>
            )}
          </td>
        </tr>
      </>
    )
    const renderHead = (item, index) => <th key={index}>{item}</th>

    return (
      <div className='table-history'>
        <div>
          <div className='row'>
            <div className='col-12'>
              <div className='card'>
                <div className='card__body'>
                  <Table
                    limit='1000'
                    headData={elements}
                    renderHead={(item, index) => renderHead(item, index)}
                    bodyData={historylist}
                    renderBody={(item, index) =>
                      renderBodyElements(item, index)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default OrderHistory
