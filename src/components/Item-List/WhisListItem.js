import NumberFormat from 'react-number-format'
import Card from '@material-ui/core/Card'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { comparator } from '../../features/Comparator/ComparatorSlice'

import { Link } from 'react-router-dom'
import { Rating } from 'semantic-ui-react'
import Tooltip from '@material-ui/core/Tooltip'

const mapDispatch = { comparator }
const useStyles = makeStyles({
  card: {
    width: 270,
    margin: 10,
    transition: 'transform 0.15s ease-in-out',
    '&:hover': {
      transform: 'scale3d(1.05, 1.05, 1)'
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {},
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  LikeButton: {
    '&:hover': {
      color: 'red'
    }
  },
  ShareButton: {
    '&:hover': {
      color: 'green'
    }
  },
  AddToWishlistButton: {
    '&:hover': {
      color: 'blue'
    }
  }
})

function WhisListItem ({ Id }) {
  console.log(Id)
  const [product, setProduct] = useState(null)
  const ComparatorSlice = useSelector(state => state.ComparatorSlice.comparator)
  const [comparators, setComparators] = useState([])
  const [currentState, setCurrentState] = useState(false)

  const classes = useStyles()

  useEffect(() => {
    if (comparators !== null) {
      if (comparators.length !== 0) {
        dispatch(comparator(comparators))
      }
    } else {
      setComparators([])
    }
  }, [comparators])
  useEffect(() => {
    if (ComparatorSlice !== null) {
      if (ComparatorSlice.length !== 0) {
        console.log(ComparatorSlice)
        setComparators(ComparatorSlice)
      }
    } else {
      setComparators([])
    }
  }, [ComparatorSlice])
  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/product-management/productId?productId=' + Id,
      headers: {}
    }).then(res => {
      console.log(res.data)
      setProduct(res.data)
      console.log(res.data.ImageStorages)
      setProduct(res.data)
      setCurrentState(true)
    })
  }, [!currentState])

  function addToComparator (e) {
    e.preventDefault()
    console.log(comparators)
    const item = {
      ProductId: Id,
      CurrentPrice: CurrentPrice,
      img: ImageStorages[0].ImageUrl,
      Name: Name,
      Elements: Elements
    }
    if (ComparatorSlice !== null && ComparatorSlice.length !== 0) {
      console.log(ComparatorSlice)

      const check_index = ComparatorSlice.findIndex(
        item => item.ProductId === Id
      )
      if (check_index !== -1) {
        console.log(ComparatorSlice)
      } else {
        setComparators(comparators => [...comparators, item])
      }
    } else {
      setComparators(comparators => [...comparators, item])
    }
  }
  if (currentState) {
    return (
      <Link to={'/Product/' + Id}>
        <Tooltip
          title={<h5 style={{ color: 'white' }}>{product.Description}</h5>}
        >
          <Card className={classes.card}>
            <div class='slider-items slider-width-col4 products-grid'>
              <div className='item'>
                <div className='item-inner'>
                  <div className='item-img'>
                    <div className='item-img-info'>
                      {ImageStorages[0].ImageUrl.includes('http') ? (
                        <img
                          src={ImageStorages[0].ImageUrl}
                          alt='Fresh Organic Mustard Leaves '
                          style={{ width: '200px', height: '200px' }}
                        />
                      ) : (
                        <img
                          src={
                            'http://13.213.30.175:5000/' +
                            ImageStorages[0].ImageUrl
                          }
                          alt='Fresh Organic Mustard Leaves '
                          style={{ width: '200px', height: '200px' }}
                        />
                      )}

                      {product.CurrentPrice === product.Price ? null : (
                        <div class='sale-label sale-top-left'>
                          <span>
                            -
                            {Math.round(
                              ((product.Price - product.CurrentPrice) * 100) /
                                product.Price
                            )}
                            %
                          </span>
                        </div>
                      )}

                      <div className='item-box-hover'>
                        <div className='box-inner'>
                          <div className='actions'>
                            <span className='add-to-links'>
                              <Link
                                onClick={addToComparator}
                                className='link-compare add_to_compare'
                                title='Add to Compare'
                              >
                                <span>Add to Compare</span>
                              </Link>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='item-info'>
                    <div className='info-inner'>
                      <div
                        className='item-title'
                        style={{ fontSize: '14.3px' }}
                      >
                        {product.Name}
                      </div>
                      <div className='item-content'>
                        {product.Star === 'NaN' ? (
                          <Rating
                            maxRating={5}
                            defaultRating={0}
                            icon='star'
                            size='mini'
                          />
                        ) : (
                          <Rating
                            maxRating={5}
                            defaultRating={product.Star}
                            icon='star'
                            size='mini'
                          />
                        )}

                        <div className='item-price'>
                          <div className='price-box'>
                            <span className='regular-price'>
                              <span className='price'>
                                <NumberFormat
                                  value={product.CurrentPrice}
                                  className='foo'
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  prefix={''}
                                  renderText={(value, props) => (
                                    <div {...props}>{value}VND</div>
                                  )}
                                />
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Tooltip>
      </Link>
    )
  } else {
    return <>Loading please wait a momment</>
  }
}

export default WhisListItem
