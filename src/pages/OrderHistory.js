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
import Moment from 'moment'
import { DatePicker } from 'antd'
const dateFormat = 'DD/MM/YYYY'

// const Search = Input.Search
function OrderHistory (props) {
  const UserSlice = useSelector(state => state.UserSlice.user)

  const [historylist, setHistorylist] = useState([])
  const [visibility, setVisibility] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [shippingOrders, setShippingOrders] = useState([])

  // const [order, setOrder] = useState('asc')
  // const [orderBy, setOrderBy] = useState('Date')
  const [selected, setSelected] = useState([])
  // const [page, setPage] = useState(0)
  const [item, setItem] = useState({})
  // const [rowsPerPage, setRowsPerPage] = useState(5)
  // const getHistories = async () => {}
  Moment.locale('en')

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/order-management/users/' + UserSlice.Id + '/orders'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      setHistorylist(res.data)
      console.log(historylist)
      axios({
        method: 'GET',
        url: '/api/ship-management'
      }).then(res => {
        console.log(res)
        console.log(res.data)
        setShippingOrders(res.data)
        setIsLoading(false)
      })
    })
  }, [isLoading])
  const onView = item => {
    setVisibility(!visibility)
    setItem(item)
  }
  const onCancel = item => {
    setIsLoading(true)
    if (
      item.Ship[0].ShipStatus === 'Completed' ||
      item.Ship[0].ShipStatus === 'Cancel'
    ) {
    } else {
      const ship = {
        Id: item.Ship[0].Id,
        OrderId: item.Id,
        CompanyName: 'FPT',
        ShipStatus: 'Cancel'
      }
      axios({
        method: 'put',
        url: '/api/ship-management',
        data: ship
      }).then(res => {
        console.log(res)
        axios({
          method: 'GET',
          url: '/api/order-management/users/' + UserSlice.Id + '/orders'
        }).then(res => {
          console.log(res)
          console.log(res.data)
          setHistorylist(res.data)
          console.log(historylist)
          axios({
            method: 'GET',
            url: '/api/ship-management'
          }).then(res => {
            console.log(res)
            console.log(res.data)
            setShippingOrders(res.data)
            setIsLoading(false)
          })
        })
      })
    }
  }
  const handleDatePickerChange = (date, dateString, id) => {
    console.log(dateString)

    if (dateString === '') {
      setIsLoading(true)

      axios({
        method: 'GET',
        url: '/api/order-management/users/' + UserSlice.Id + '/orders'
      }).then(res => {
        console.log(res)
        console.log(res.data)
        setHistorylist(res.data)
        console.log(historylist)
        axios({
          method: 'GET',
          url: '/api/ship-management'
        }).then(res => {
          console.log(res)
          console.log(res.data)
          setShippingOrders(res.data)
          setIsLoading(false)
        })
      })
    } else {
      setIsLoading(true)
      axios({
        method: 'GET',
        url: '/api/order-management/users/' + UserSlice.Id + '/orders'
      }).then(res => {
        console.log(res)
        console.log(res.data)
        setHistorylist(res.data)
        let sorting = res.data.filter(
          item => Moment(item.Date).format('DD/MM/YYYY') === dateString
        )

        setHistorylist(sorting)

        axios({
          method: 'GET',
          url: '/api/ship-management'
        }).then(res => {
          console.log(res)
          console.log(res.data)
          setShippingOrders(res.data)
          setIsLoading(false)
        })
      })

      setIsLoading(false)
    }
  }
  useEffect(() => {
    setHistorylist(historylist => historylist)
  }, [historylist])

  const returnShipId = Id => {
    const check_index = shippingOrders.findIndex(item => item.OrderId === Id)
    if (check_index !== -1) {
      return <>{shippingOrders[check_index].ShipStatus}</>
    }
  }

  if (isLoading) {
    return (
      <img
        src={'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'}
        alt='promotion-banner1'
      />
    )
  } else {
    const tableColumns = [
      {
        title: 'Id',
        dataIndex: 'Id',
        key: 'Id'
      },
      {
        title: 'Date',
        key: 'Date',
        defaultSortOrder: 'descend',
        sorter: (a, b) =>
          new Date(
            Moment(a.Date)
              .format('DD/MM/YYYY')
              .split('/')
              .reverse()
          ) -
          new Date(
            Moment(b.Date)
              .format('DD/MM/YYYY')
              .split('/')
              .reverse()
          ),

        render: (text, record) => (
          <>{Moment(record.Date).format('DD/MM/YYYY')}</>
        )
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
        title: 'Ship Status',
        key: 'action',
        render: (text, record) => returnShipId(record.Id)
      },
      {
        title: 'View details',
        key: 'Viewdetails',
        render: (text, record) => (
          <Button type='primary' onClick={() => onView(record)}>
            View details
          </Button>
        )
      },
      {
        title: 'Cancel',
        key: 'cancel',
        render: (text, record) => (
          <Button type='primary' onClick={() => onCancel(record)}>
            Cancel order
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
          <div className='Modal'>
            <a href='javascript:void(0);' onClick={onView}>
              Close
            </a>

            <OrderDetail Orderdetails={item.Orderdetails} />
          </div>
        </Modal>

        <div>
          <section className=' wow bounceInUp animated'>
            <div className='best-pro slider-items-products container'>
              <div className='new_title'>
                <h2> your orders</h2>
                <h4>
                  Total Paid:
                  <NumberFormat
                    value={historylist
                      .filter(item => item.Ship[0].ShipStatus === 'Completed')
                      .reduce((a, v) => (a = a + v.TotalPrice), 0)}
                    className='foo'
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={''}
                    renderText={(value, props) => (
                      <div {...props}>{value}VND</div>
                    )}
                  />
                </h4>
              </div>
              <DatePicker
                onChange={(date, dateString) =>
                  handleDatePickerChange(date, dateString, 1)
                }
                format={dateFormat}
              />

              <Table dataSource={historylist} columns={tableColumns} />
            </div>
          </section>
        </div>
      </div>
    )
  }
}
export default OrderHistory
