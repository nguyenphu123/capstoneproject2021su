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
            <Card.Group itemsPerRow={6}>
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
            </Card.Group>
          </div>
        </div>
      </>

      /* <Title Name={this.props.topic} />
        <div style={{ marginTop: '100px' }}> */

      /* </div> */
    )
  }
}
export default VerticalItemList
