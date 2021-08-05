// import Table from '@material-ui/core/Table'

import Modal from 'react-awesome-modal'
import OrderDetail from './OrderDetail'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Header } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import NumberFormat from 'react-number-format'
// import OrderShipping from './OrderShipping'
import Table from 'antd/lib/table'
import 'antd/lib/table/style/css'
// import { Input } from 'antd'

// const Search = Input.Search
function OrderHistory (props) {
  const UserSlice = useSelector(state => state.UserSlice.user)

  const [historylist, setHistorylist] = useState([])
  const [visibility, setVisibility] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // const [order, setOrder] = useState('asc')
  // const [orderBy, setOrderBy] = useState('Date')
  const [selected, setSelected] = useState([])
  // const [page, setPage] = useState(0)
  const [item, setItem] = useState({})
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
  const onView = item => {
    setVisibility(!visibility)
    setItem(item)
  }
  if (isLoading) {
    return <></>
  } else {
    const tableColumns = [
      {
        title: 'Id',
        dataIndex: 'Id',
        key: 'Id'
      },
      {
        title: 'Date',
        dataIndex: 'Date',
        key: 'Date'
      },
      {
        title: 'Total',
        render: (text, record) => (
          <NumberFormat
            value={record.TotalPrice}
            className='foo'
            displayType={'text'}
            thousandSeparator={true}
            prefix={''}
            renderText={(value, props) => <div {...props}>{value}VND</div>}
          />
        ),

        key: 'Total',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.Total - b.Total
      },
      {
        title: 'Number of products',
        render: (text, record) => <h4>{record.Orderdetails.length}</h4>,
        key: 'Number of products'
      },
      {
        title: 'address',
        dataIndex: 'AddressShipping',
        key: 'address'
      },
      {
        title: 'Paid status',
        render: (text, record) =>
          record.Status ? (
            <Header as='h4' color='green'>
              Paid
            </Header>
          ) : (
            <Header as='h4' color='red'>
              Not paid
            </Header>
          ),

        key: 'Paid status'
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Button type='primary' onClick={() => onView(record)}>
            View details
          </Button>
        )
      }
    ]

    // const handleSearch = searchText => {
    //   const filteredEvents = historylist.filter(({ AddressShipping }) => {
    //     AddressShipping = AddressShipping.toLowerCase()
    //     return AddressShipping.includes(searchText.toLowerCase())
    //   })

    //   this.setState({
    //     Orders: filteredEvents
    //   })
    // }

    return (
      <div className='table-history'>
        <Modal
          visible={visibility}
          width='1600'
          height='500'
          effect='fadeInUp'
          onClickAway={onView}
        >
          <div>
            <a href='javascript:void(0);' onClick={onView}>
              Close
            </a>

            <OrderDetail Orderdetails={item.Orderdetails} />
          </div>
        </Modal>

        <div>
          <Table dataSource={historylist} columns={tableColumns} />
        </div>
      </div>
    )
  }
}
export default OrderHistory
