import '../../App.css'
import React from 'react'
import VerticalItem from './VerticalItem'
import axios from 'axios'
import { Pagination, Card, Button } from 'semantic-ui-react'

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
        <section class='product spad'>
          <div class='container'>
            <div class='col-lg-4 col-md-4'>
              <div class='section-title'>
                <h4>{this.props.topic}</h4>
              </div>
            </div>
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
                  />
                )
              )}
            </Card.Group>
            
          </div>
        </section>
      </>
    )
  }
}
export default VerticalItemList
