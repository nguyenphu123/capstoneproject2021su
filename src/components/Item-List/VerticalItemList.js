import axios from 'axios'
import React from 'react'
import { Button, Card, Header } from 'semantic-ui-react'
import Title from '../../Assets/Title'

import VerticalItem from './VerticalItem'
import { Link } from 'react-router-dom'

class VerticalItemList extends React.Component {
  constructor () {
    super()

    this.state = {
      products: []
    }
  }
  componentDidMount () {
    console.log(this.props.apiUrl)

    axios({
      method: 'GET',
      url: this.props.apiUrl
    }).then(res => {
      console.log(res)
      console.log(res.data)
      this.setState({
        products: res.data
      })
    })
  }

  render () {
    return (
      <>
        <div id='best-seller' class='product-flexslider hidden-buttons'>
          <div class='slider-items slider-width-col4 products-grid'>
            <div className='item'>
              <div className='item-inner'>
                <div className='item-img'>
                  <div className='item-img-info'>
                    <Link
                      to={'/product-details'}
                      title='Fresh Organic Mustard Leaves '
                      className='product-image'
                    >
                      <img
                        src='products-images/p27.jpg'
                        alt='Fresh Organic Mustard Leaves '
                      />
                    </Link>
                    <div className='new-label new-top-left'>Hot</div>
                    <div className='sale-label sale-top-left'>-15%</div>
                    <div className='item-box-hover'>
                      <div className='box-inner'>
                        <div className='product-detail-bnt'>
                          <Link className='button detail-bnt'>
                            <span>Quick View</span>
                          </Link>
                        </div>
                        <div className='actions'>
                          <span className='add-to-links'>
                            <Link
                              href='#'
                              className='link-wishlist'
                              title='Add to Wishlist'
                            >
                              <span>Add to Wishlist</span>
                            </Link>{' '}
                            <Link
                              href='#'
                              className='link-compare add_to_compare'
                              title='Add to Compare'
                            >
                              <span>Add to Compare</span>
                            </Link>
                          </span>{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='add_cart'>
                    <button className='button btn-cart' type='button'>
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
                <div className='item-info'>
                  <div className='info-inner'>
                    <div className='item-title'>
                      <Link
                        to={'/product-details'}
                        title='Fresh Organic Mustard Leaves '
                      >
                        Fresh Organic Mustard Leaves{' '}
                      </Link>{' '}
                    </div>
                    <div className='item-content'>
                      <div className='rating'>
                        <div className='ratings'>
                          <div className='rating-box'>
                            <div className='rating'></div>
                          </div>
                          <p className='rating-links'>
                            <Link href='#'>1 Review(s)</Link>{' '}
                            <span className='separator'>|</span>{' '}
                            <Link href='#'>Add Review</Link>
                          </p>
                        </div>
                      </div>
                      <div className='item-price'>
                        <div className='price-box'>
                          <span className='regular-price'>
                            <span className='price'>$125.00</span>{' '}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      /* <Title Name={this.props.topic} />
        <div style={{ marginTop: '100px' }}> */
      /* <Card.Group itemsPerRow={6}>
            {this.state.products.map(
              ({
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
              }) => (
                <VerticalItem
                  Id={Id}
                  Name={Name}
                  Status={Status}
                  Price={Price}
                  CurrentPrice={CurrentPrice}
                  ImageStorages={ImageStorages}
                  Quantity={Quantity}
                />
              )
            )}
          </Card.Group> */
      /* </div> */
    )
  }
}
export default VerticalItemList
