import NumberFormat from 'react-number-format'
import Card from '@material-ui/core/Card'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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

function VerticalItemSlide ({
  Id,
  Name,
  Price,
  Quantity,
  Star,
  Description,
  Code,
  CurrentPrice,
  CategoryId,
  Status,
  ImageStorages,
  Elements
}) {
  const dispatch = useDispatch()
  const UserSlice = useSelector(state => state.UserSlice.user)

  const ComparatorSlice = useSelector(state => state.ComparatorSlice.comparator)
  const [comparators, setComparators] = useState([])

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
  function addtoWhisList (e) {
    e.preventDefault()
    if (UserSlice === null) {
    } else {
      const wish = {
        ProductId: Id,
        UserId: UserSlice.Id
      }
      axios({
        method: 'POST',
        url: '/api/whistlist-management',
        data: wish
      }).then(res => {})
    }
  }
  return (
    <Link to={'/Product/' + Id}>
      <Tooltip title={<h5 style={{ color: 'white' }}>{Description}</h5>}>
        <div class='slider-items slider-width-col4 products-grid'>
          <div className='item'>
            <div className='item-inner'>
              <div className='item-img'>
                <div className='item-img-info'>
                  {ImageStorages[0].ImageUrl.includes('http') ? (
                    <img
                      src={ImageStorages[0].ImageUrl}
                      alt='404'
                      style={{ width: '200px', height: '200px' }}
                    />
                  ) : (
                    <img
                      src={
                        'http://18.136.201.97:5000/' + ImageStorages[0].ImageUrl
                      }
                      alt='404 '
                      style={{ width: '200px', height: '200px' }}
                    />
                  )}

                  {CurrentPrice === Price ? null : (
                    <div class='sale-label sale-top-left'>
                      <span>
                        -{Math.round(((Price - CurrentPrice) * 100) / Price)}%
                      </span>
                    </div>
                  )}

                  <div className='item-box-hover'>
                    <div className='box-inner'>
                      <div className='actions'>
                        <span className='add-to-links'>
                          <Link
                            className='link-wishlist'
                            title='Add to Wishlist'
                            onClick={addtoWhisList}
                          >
                            <span>Add to Wishlist</span>
                          </Link>
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
                  <div className='item-title' style={{ fontSize: '14.3px' }}>
                    {Name}
                  </div>
                  <div className='item-content'>
                    {Star === 'NaN' ? (
                      <Rating
                        maxRating={5}
                        defaultRating={0}
                        icon='star'
                        size='mini'
                      />
                    ) : (
                      <Rating
                        maxRating={5}
                        defaultRating={Star}
                        icon='star'
                        size='mini'
                      />
                    )}

                    <div className='item-price'>
                      <div className='price-box'>
                        <span className='regular-price'>
                          <span className='price'>
                            <NumberFormat
                              value={CurrentPrice}
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
      </Tooltip>
    </Link>
  )
}

export default VerticalItemSlide
