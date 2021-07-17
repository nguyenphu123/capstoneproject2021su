import axios from 'axios'
import React from 'react'
import { Button, Card, Header } from 'semantic-ui-react'
import Title from '../../Assets/Title'
import HorizontalItem from './HorizontalItem'


class HorizontalItemLList extends React.Component {
  constructor () {
    super()

    this.state = {
      products: []
    }
  }
  componentDidMount () {
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
        <Card.Group itemsPerRow={8}>
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
              <div style={{ float: 'left' }}>
                <HorizontalItem
                  Id={Id}
                  Name={Name}
                  Status={Status}
                  Price={Price}
                  CurrentPrice={CurrentPrice}
                  ImageStorages={ImageStorages}
                  Quantity={Quantity}
                />
              </div>
            )
          )}
        </Card.Group>
      </>
    )
  }
}
export default HorizontalItemLList
