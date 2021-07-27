import NumberFormat from 'react-number-format'
import Card from '@material-ui/core/Card'

import { makeStyles } from '@material-ui/core/styles'

import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from 'semantic-ui-react'

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

function HorizontalItem ({
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
  ImageStorages
}) {
  const classes = useStyles()

  return (
    <Link to={'/Product/' + Id}>
      <Card className={classes.card}>
        <div class='slider-items slider-width-col4 products-grid'>
          <div className='item'>
            <div className='item-inner'>
              <div className='item-img'>
                <div className='item-img-info'>
                  <img
                    src={ImageStorages[0].ImageUrl}
                    alt='Fresh Organic Mustard Leaves '
                    style={{ width: '200px', height: '200px' }}
                  />

                  {/* <div className='new-label new-top-left'>Hot</div> */}
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
                            href='#'
                            className='link-wishlist'
                            title='Add to Wishlist'
                          >
                            <span>Add to Wishlist</span>
                          </Link>
                          <Link
                            href='#'
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
                  <div className='item-title'>{Name}</div>
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

                    {/* <div className='rating'></div> */}

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
      </Card>
    </Link>
  )
}

export default HorizontalItem
