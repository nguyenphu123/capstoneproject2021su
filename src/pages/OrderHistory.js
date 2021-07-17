import PropTypes from 'prop-types'
import clsx from 'clsx'
import { lighten, makeStyles } from '@material-ui/core/styles'
// import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import Modal from 'react-awesome-modal'
import OrderDetail from './OrderDetail'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Dropdown, Tab } from 'semantic-ui-react'
import Table from '../Assets/table/Table'
import NumberFormat from 'react-number-format'
import '../App.css'

function OrderHistory (props) {
  const UserSlice = useSelector(state => state.UserSlice.user)

  const [historylist, setHistorylist] = useState([])
  const [visibility, setVisibility] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%'
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2)
    },
    table: {
      minWidth: 750
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1
    }
  }))
  const classes = useStyles()

  // const [order, setOrder] = useState('asc')
  // const [orderBy, setOrderBy] = useState('Date')
  // const [selected, setSelected] = useState([])
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

    // const headCells = [
    //   { id: 'Date', numeric: true, disablePadding: false, label: 'Date' },
    //   {
    //     id: 'Orderdetails.length',
    //     numeric: true,
    //     disablePadding: false,
    //     label: 'Number of products'
    //   },
    //   {
    //     id: 'AddressShipping',
    //     numeric: true,
    //     disablePadding: false,
    //     label: 'Address Shipping'
    //   },
    //   {
    //     id: 'TotalPrice',
    //     numeric: true,
    //     disablePadding: true,
    //     label: 'Total Price'
    //   },
    //   { id: 'Status', numeric: false, disablePadding: false, label: 'Status' },
    //   {
    //     id: 'View Detail',
    //     numeric: false,
    //     disablePadding: false,
    //     label: 'View Detail'
    //   }
    // ]
    const elements = [
      'Date',
      'Number of products',
      'address',
      'Total',
      'status'
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
            <h1>Title</h1>
            <OrderDetail Orderdetails={item.Orderdetails} />
            <a
              href='javascript:void(0);'
              onClick={() => setVisibility(!visibility)}
            >
              Close
            </a>
          </div>
        </Modal>

        <tr key={index} onClick={() => setVisibility(!visibility)}>
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
        </tr>
      </>
    )
    const renderHead = (item, index) => <th key={index}>{item}</th>

    // function EnhancedTableHead (props) {
    //   // const {
    //   //   classes,

    //   //   order,
    //   //   orderBy,
    //   //   numSelected,
    //   //   rowCount,
    //   //   onRequestSort
    //   // } = props
    //   // const createSortHandler = property => event => {
    //   //   onRequestSort(event, property)
    //   // }

    //   return (
    //     <TableHead>
    //       <TableRow>
    //         {headCells.map(headCell => (
    //           <TableCell
    //             key={headCell.id}
    //             align={headCell.numeric ? 'right' : 'left'}
    //             padding={headCell.disablePadding ? 'none' : 'default'}
    //             sortDirection={orderBy === headCell.id ? order : false}
    //           >
    //             <TableSortLabel
    //               active={orderBy === headCell.id}
    //               direction={orderBy === headCell.id ? order : 'asc'}
    //               onClick={createSortHandler(headCell.id)}
    //             >
    //               {headCell.label}
    //               {orderBy === headCell.id ? (
    //                 <span className={classes.visuallyHidden}>
    //                   {order === 'desc'
    //                     ? 'sorted descending'
    //                     : 'sorted ascending'}
    //                 </span>
    //               ) : null}
    //             </TableSortLabel>
    //           </TableCell>
    //         ))}
    //       </TableRow>
    //     </TableHead>
    //   )
    // }

    // EnhancedTableHead.propTypes = {
    //   classes: PropTypes.object.isRequired,
    //   numSelected: PropTypes.number.isRequired,
    //   onRequestSort: PropTypes.func.isRequired,

    //   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    //   orderBy: PropTypes.string.isRequired,
    //   rowCount: PropTypes.number.isRequired
    // }

    // const useToolbarStyles = makeStyles(theme => ({
    //   root: {
    //     paddingLeft: theme.spacing(2),
    //     paddingRight: theme.spacing(1)
    //   },
    //   highlight:
    //     theme.palette.type === 'light'
    //       ? {
    //           color: theme.palette.secondary.main,
    //           backgroundColor: lighten(theme.palette.secondary.light, 0.85)
    //         }
    //       : {
    //           color: theme.palette.text.primary,
    //           backgroundColor: theme.palette.secondary.dark
    //         },
    //   title: {
    //     flex: '1 1 100%'
    //   }
    // }))

    // const EnhancedTableToolbar = props => {
    //   const classes = useToolbarStyles()
    //   const { numSelected } = props

    //   return (
    //     <Toolbar
    //       className={clsx(classes.root, {
    //         [classes.highlight]: numSelected > 0
    //       })}
    //     >
    //       {numSelected > 0 ? (
    //         <Typography
    //           className={classes.title}
    //           color='inherit'
    //           variant='subtitle1'
    //           component='div'
    //         >
    //           {numSelected} selected
    //         </Typography>
    //       ) : (
    //         <Typography
    //           className={classes.title}
    //           variant='h6'
    //           id='tableTitle'
    //           component='div'
    //         >
    //           {/* <Title Name='User addresses' /> */}
    //         </Typography>
    //       )}

    //       {numSelected > 0 ? (
    //         <Tooltip title='Delete'>
    //           <IconButton aria-label='delete'>
    //             <DeleteIcon />
    //           </IconButton>
    //         </Tooltip>
    //       ) : (
    //         <Tooltip title='Filter list'>
    //           <IconButton aria-label='filter list'>
    //             <FilterListIcon />
    //           </IconButton>
    //         </Tooltip>
    //       )}
    //     </Toolbar>
    //   )
    // }

    // EnhancedTableToolbar.propTypes = {
    //   numSelected: PropTypes.number.isRequired
    // }

    // const handleRequestSort = (event, property) => {
    //   const isAsc = orderBy === property && order === 'asc'
    //   setOrder(isAsc ? 'desc' : 'asc')
    //   setOrderBy(property)
    // }

    // const handleClick = (event, name) => {
    //   const selectedIndex = selected.indexOf(name)
    //   let newSelected = []

    //   if (selectedIndex === -1) {
    //     newSelected = newSelected.concat(selected, name)
    //   } else if (selectedIndex === 0) {
    //     newSelected = newSelected.concat(selected.slice(1))
    //   } else if (selectedIndex === selected.length - 1) {
    //     newSelected = newSelected.concat(selected.slice(0, -1))
    //   } else if (selectedIndex > 0) {
    //     newSelected = newSelected.concat(
    //       selected.slice(0, selectedIndex),
    //       selected.slice(selectedIndex + 1)
    //     )
    //   }

    //   setSelected(newSelected)
    // }

    // const handleChangePage = (event, newPage) => {
    //   setPage(newPage)
    // }

    // const handleChangeRowsPerPage = event => {
    //   setRowsPerPage(parseInt(event.target.value, 10))
    //   setPage(0)
    // }

    // const isSelected = name => selected.indexOf(name) !== -1

    // const emptyRows =
    //   rowsPerPage -
    //   Math.min(rowsPerPage, historylist.length - page * rowsPerPage)

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
            <div className={classes.root}>
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

              {/* <Paper className={classes.paper}> */}
              {/* <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                  <Table
                    className={classes.table}
                    aria-labelledby='tableTitle'
                    size={'medium'}
                    aria-label='enhanced table'
                  >
                    <EnhancedTableHead
                      classes={classes}
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      rowCount={historylist.length}
                    />
                    <TableBody>
                      {historylist.map((row, index) => {
                        // const isItemSelected = isSelected(row.Name)
                        const labelId = `enhanced-table-checkbox-${index}`

                        return (
                          <TableRow
                            hover
                            onClick={event => handleClick(event, row.name)}
                            role='checkbox'
                            // aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.name}
                            // selected={isItemSelected}
                          >
                            <TableCell align='right'>{row.Date}</TableCell>
                            <TableCell align='right'>
                              {row.Orderdetails.length}
                            </TableCell>
                            <TableCell align='right'>
                              {row.AddressShipping}
                            </TableCell>
                            <TableCell align='right'>
                              {row.TotalPrice}
                            </TableCell>

                            <TableCell align='right'>{row.Status}</TableCell>
                            <TableCell>
                              <section>
                                <h1>React-Modal Examples</h1>
                                <input
                                  type='button'
                                  value='Open'
                                  onClick={setVisibility(!visibility)}
                                />
                                
                              </section>
                            </TableCell>
                            <TableCell align='right'>
                              <DeleteIcon />
                            </TableCell>
                          </TableRow>
                        )
                      })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component='div'
                  count={historylist.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Paper> */}
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

            <div className={classes.root}>
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
              {/* <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                  <Table
                    className={classes.table}
                    aria-labelledby='tableTitle'
                    size={'medium'}
                    aria-label='enhanced table'
                  >
                    <EnhancedTableHead
                      classes={classes}
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      rowCount={historylist.length}
                    />
                    <TableBody>
                      {stableSort(historylist, getComparator(order, orderBy))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          const isItemSelected = isSelected(row.Name)
                          const labelId = `enhanced-table-checkbox-${index}`

                          return (
                            <TableRow
                              hover
                              // onClick={event => handleClick(event, row.name)}
                              role='checkbox'
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.name}
                              selected={isItemSelected}
                            >
                              <TableCell align='right'>{row.Date}</TableCell>
                              <TableCell align='right'>
                                {row.Orderdetails.length}
                              </TableCell>
                              <TableCell align='right'>
                                {row.AddressShipping}
                              </TableCell>
                              <TableCell align='right'>{row.Status}</TableCell>
                              <TableCell align='right'>
                                {row.TotalPrice}
                              </TableCell>
                              <TableCell>
                                <section>
                                  <h1>React-Modal Examples</h1>
                                  <input
                                    type='button'
                                    value='Open'
                                    onClick={setVisibility(!visibility)}
                                  />
                                  <Modal
                                    visible={visibility}
                                    width='1400'
                                    height='1300'
                                    effect='fadeInUp'
                                    onClickAway={setVisibility(!visibility)}
                                  >
                                    <div>
                                      <h1>Title</h1>
                                      <OrderDetail
                                        Orderdetails={row.Orderdetails}
                                      />
                                      <a
                                        href='javascript:void(0);'
                                        onClick={setVisibility(!visibility)}
                                      >
                                        Close
                                      </a>
                                    </div>
                                  </Modal>
                                </section>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component='div'
                  count={historylist.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Paper> */}
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
            <div className={classes.root}>
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
              {/* <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                  <Table
                    className={classes.table}
                    aria-labelledby='tableTitle'
                    size={'medium'}
                    aria-label='enhanced table'
                  >
                    <EnhancedTableHead
                      classes={classes}
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      rowCount={historylist.length}
                    />
                    <TableBody>
                      {stableSort(historylist, getComparator(order, orderBy))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          // const isItemSelected = isSelected(row.Name)
                          const labelId = `enhanced-table-checkbox-${index}`

                          return (
                            <TableRow
                              hover
                              onClick={event => handleClick(event, row.name)}
                              role='checkbox'
                              // aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.name}
                              // selected={isItemSelected}
                            >
                              <TableCell align='right'>{row.Date}</TableCell>
                              <TableCell align='right'>
                                {row.Orderdetails.length}
                              </TableCell>
                              <TableCell align='right'>
                                {row.AddressShipping}
                              </TableCell>

                              <TableCell align='right'>{row.Status}</TableCell>
                              <TableCell align='right'>
                                {row.TotalPrice}
                              </TableCell>
                              <TableCell>
                                <section>
                                  <h1>React-Modal Examples</h1>
                                  <input
                                    type='button'
                                    value='Open'
                                    onClick={setVisibility(!visibility)}
                                  />
                                  <Modal
                                    visible={visibility}
                                    width='1400'
                                    height='1300'
                                    effect='fadeInUp'
                                    onClickAway={setVisibility(!visibility)}
                                  >
                                    <div>
                                      <h1>Title</h1>
                                      <OrderDetail
                                        Orderdetails={row.Orderdetails}
                                      />
                                      <a
                                        href='javascript:void(0);'
                                        onClick={setVisibility(!visibility)}
                                      >
                                        Close
                                      </a>
                                    </div>
                                  </Modal>
                                </section>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component='div'
                  count={historylist.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Paper> */}
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
