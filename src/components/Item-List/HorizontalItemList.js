import '../../App.css'
import React from 'react'
import HorizontalItem from './HorizontalItem'
import axios from 'axios'
import { Button, Card, Image } from 'semantic-ui-react'

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
      <div class='trend__content'>
        <div class='section-title'>
          <h4>{this.props.topic}</h4>
        </div>
        <Card.Group>
          {this.state.products.map(
            ({ Id, Name, ImageStorages, CurrentPrice }) => (
              <HorizontalItem
                Id={Id}
                Name={Name}
                ImageStorages={ImageStorages}
                CurrentPrice={CurrentPrice}
              />
            )
          )}
        </Card.Group>
      </div>
    )
  }
}
export default HorizontalItemLList
