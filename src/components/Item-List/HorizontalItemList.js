import axios from 'axios'
import React from 'react'
import { Card } from 'semantic-ui-react'

import HorizontalItem from './HorizontalItem'

class HorizontalItemLList extends React.Component {
  constructor () {
    super()

    this.state = {
      products: [],
      isLoading: true
    }
  }
  componentDidMount () {
    axios({
      method: 'GET',
      url: this.props.apiUrl
    }).then(res => {
      console.log(res)
      console.log(res.data)
      if (this.props.topic === 'Top luxury') {
        let result = res.data
          .sort((a, b) => (a.CurrentPrice < b.CurrentPrice ? 1 : -1))
          .filter(item => item.Status === true)
        let afterSliceResult = result.slice(0, 3)

        this.setState({
          products: afterSliceResult,
          isLoading: false
        })
      } else {
        let result = res.data
          .sort((a, b) => (a.CurrentPrice < b.CurrentPrice ? -1 : 1))
          .filter(item => item.Status === true)
        console.log(result)

        let afterSliceResult = result.slice(0, 3)
        console.log(afterSliceResult)
        this.setState({
          products: afterSliceResult,
          isLoading: false
        })
      }
    })
  }
  render () {
    if (this.state.isLoading) {
      return (
        <img
          src={'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'}
          alt='promotion-banner1'
        />
      )
    } else {
      return (
        <>
          <Card.Group itemsPerRow={8}>
            {this.state.products.length !== 0 ? (
              this.state.products
                .filter(
                  item =>
                    item.Status === true && item.ImageStorages.length !== 0
                )
                .map(
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
                    <div style={{ float: 'left' }}>
                      <HorizontalItem
                        Id={Id}
                        Name={Name}
                        Status={Status}
                        Price={Price}
                        CurrentPrice={CurrentPrice}
                        ImageStorages={ImageStorages}
                        Quantity={Quantity}
                        Star={Star}
                      />
                    </div>
                  )
                )
            ) : (
              <>No Data</>
            )}
          </Card.Group>
        </>
      )
    }
  }
}
export default HorizontalItemLList
