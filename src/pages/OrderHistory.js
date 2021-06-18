import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import DeleteIcon from '@material-ui/icons/Delete'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Dropdown, Tab } from 'semantic-ui-react'

// import FilterListIcon from '@material-ui/icons/FilterList'
// import { AutoSizer, Column, Table } from 'react-virtualized'

// function descendingComparator (a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1
//   }
//   return 0
// }

// function getComparator (order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy)
// }

// function stableSort (array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index])
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0])
//     if (order !== 0) return order
//     return a[1] - b[1]
//   })
//   return stabilizedThis.map(el => el[0])
// }

function OrderHistory (props) {
  const [historylist, setHistorylist] = useState([])
  const UserSlice = useSelector(state => state.UserSlice.user)
  const useStyles = makeStyles({
    table: {
      minWidth: 650
    }
  })
  const classes = useStyles()

  // const {
  //   classes,
  //   onSelectAllClick,
  //   order,
  //   orderBy,
  //   numSelected,
  //   rowCount,
  //   onRequestSort
  // } = props
  // const createSortHandler = property => event => {
  //   onRequestSort(event, property)
  // }
  const headCells = [
    {
      id: 'TotalPrice',
      numeric: false,
      disablePadding: true,
      label: 'Total Price'
    },
    { id: 'Date', numeric: true, disablePadding: false, label: 'Date' },
    {
      id: 'Orderdetails.length',
      numeric: true,
      disablePadding: false,
      label: 'Number of products'
    },
    {
      id: 'AddressShipping',
      numeric: true,
      disablePadding: false,
      label: 'Address Shipping'
    },
    { id: 'Status', numeric: true, disablePadding: false, label: 'Status' }
  ]

  // const styles = theme => ({
  //   flexContainer: {
  //     display: 'flex',
  //     alignItems: 'center',
  //     boxSizing: 'border-box'
  //   },
  //   table: {
  //     // temporary right-to-left patch, waiting for
  //     // https://github.com/bvaughn/react-virtualized/issues/454
  //     '& .ReactVirtualized__Table__headerRow': {
  //       flip: false,
  //       paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined
  //     }
  //   },
  //   tableRow: {
  //     cursor: 'pointer'
  //   },
  //   tableRowHover: {
  //     '&:hover': {
  //       backgroundColor: theme.palette.grey[200]
  //     }
  //   },
  //   tableCell: {
  //     flex: 1
  //   },
  //   noClick: {
  //     cursor: 'initial'
  //   }
  // })

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/order-management/users/' + UserSlice.Id + '/orders'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      setHistorylist(res.data)
    })
  }, [UserSlice])
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
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>

                  <TableCell align='right'>Date&nbsp;</TableCell>
                  <TableCell align='right'>Number of products&nbsp;</TableCell>
                  <TableCell align='right'>Address Shipping&nbsp;</TableCell>
                  <TableCell align='right'>Total Price</TableCell>

                  <TableCell align='right'>Status &nbsp;</TableCell>
                  <TableCell align='right'>Action &nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historylist.map(row => (
                  <TableRow key={row.name}>
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell align='right'>{row.Date}</TableCell>
                    <TableCell align='right'>
                      {row.Orderdetails.length}
                    </TableCell>
                    <TableCell align='right'>{row.AddressShipping}</TableCell>
                    <TableCell align='right'>{row.TotalPrice}</TableCell>
                    <TableCell align='right'>{row.Status}</TableCell>
                    <TableCell align='right'>
                      <DeleteIcon />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* <Item.Group link>
            {historylist.map(({ TotalPrice, Date, Orderdetails, Status }) => (
              <OrderItem
                TotalPrice={TotalPrice}
                // Date={Date}
                Orderdetails={Orderdetails}
                Status={Status}
              />
            ))}
          </Item.Group> */}
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
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>

                  <TableCell align='right'>Date&nbsp;</TableCell>
                  <TableCell align='right'>Number of products&nbsp;</TableCell>
                  <TableCell align='right'>Address Shipping&nbsp;</TableCell>
                  <TableCell align='right'>Total Price</TableCell>

                  <TableCell align='right'>Status &nbsp;</TableCell>
                  <TableCell align='right'>Action &nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historylist.map(row => (
                  <TableRow key={row.name}>
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell align='right'>{row.Date}</TableCell>
                    <TableCell align='right'>
                      {row.Orderdetails.length}
                    </TableCell>
                    <TableCell align='right'>{row.AddressShipping}</TableCell>
                    <TableCell align='right'>{row.TotalPrice}</TableCell>
                    <TableCell align='right'>{row.Status}</TableCell>
                    <TableCell align='right'>
                      <DeleteIcon />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* <Item.Group link>
            {historylist.map(({ TotalPrice, Date, Orderdetails, Status }) => (
              <OrderItem
                TotalPrice={TotalPrice}
                // Date={Date}
                Orderdetails={Orderdetails}
                Status={Status}
              />
            ))}
          </Item.Group> */}
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
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>

                  <TableCell align='right'>Date&nbsp;</TableCell>
                  <TableCell align='right'>Number of products&nbsp;</TableCell>
                  <TableCell align='right'>Address Shipping&nbsp;</TableCell>
                  <TableCell align='right'>Total Price</TableCell>

                  <TableCell align='right'>Status &nbsp;</TableCell>
                  <TableCell align='right'>Action &nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historylist.map(row => (
                  <TableRow key={row.name}>
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell align='right'>{row.Date}</TableCell>
                    <TableCell align='right'>
                      {row.Orderdetails.length}
                    </TableCell>
                    <TableCell align='right'>{row.AddressShipping}</TableCell>
                    <TableCell align='right'>{row.TotalPrice}</TableCell>
                    <TableCell align='right'>{row.Status}</TableCell>
                    <TableCell align='right'>
                      <DeleteIcon />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* <Item.Group link>
            {historylist.map(({ TotalPrice, Date, Orderdetails, Status }) => (
              <OrderItem
                TotalPrice={TotalPrice}
                // Date={Date}
                Orderdetails={Orderdetails}
                Status={Status}
              />
            ))}
          </Item.Group> */}
        </Tab.Pane>
      )
    }
  ]

  return (
    <div style={{ marginTop: '200px' }}>
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    </div>
  )
}

export default OrderHistory
