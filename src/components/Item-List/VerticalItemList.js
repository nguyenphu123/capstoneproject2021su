import '../../App.css'

import axios from 'axios'
import React from 'react'
import { Button, Card, Header } from 'semantic-ui-react'

import VerticalItem from './VerticalItem'

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
        <div class='col-lg-4 col-md-4'>
          <div class='section-title'>
            <Header textAlign='left' as='h1' color='black'>
              <h4>{this.props.topic}</h4>
            </Header>
          </div>
        </div>

        <section class='product spad'>
          <div class='container'>
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
        </section>
        <Button inverted color='blue' style={{ marginTop: '10px' }}>
          See more...
        </Button>
      </>
    )
  }
}
export default VerticalItemList
