import PropTypes from 'prop-types'
import clsx from 'clsx'
import { lighten, makeStyles } from '@material-ui/core/styles'
// import Table from '@material-ui/core/Table'

import Modal from 'react-awesome-modal'
import OrderDetail from './OrderDetail'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Dropdown, Tab, Header } from 'semantic-ui-react'
import Table from '../Assets/table/Table'
import NumberFormat from 'react-number-format'

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
      'Date',
      'Number of products',
      'address',
      'Total',
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
              renderText={(value, props) => (
                <div {...props}>{value},000VND</div>
              )}
            />
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

    const Options = [
      { key: '0', value: 'All', text: 'All orders' },
      { key: '1', value: '5', text: '5 latest orders' },
      { key: '2', value: '10', text: '10 latest orders' },
      { key: '3', value: '30', text: '30 latest orders' }
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
          </Tab.Pane>
        )
      },
      {
        menuItem: 'on delivery',
        render: () => (
          <Tab.Pane attached={false}>
            <Dropdown
              placeholder='Select period'
              fluid
              search
              selection
              options={Options}
            />

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
          </Tab.Pane>
        )
      }
    ]

    return (
      <div className='table-history'>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </div>
    )
  }
}
export default OrderHistory
