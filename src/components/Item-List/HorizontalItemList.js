import '../../App.css'

import axios from 'axios'
import React from 'react'
import { Button, Card, Header } from 'semantic-ui-react'

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
        <div class='section-title'>
          <Header textAlign='left' as='h1' color='black'>
            <h4>{this.props.topic}</h4>
          </Header>
        </div>

        <div class='trend__content'>
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
        <Button inverted color='blue' style={{ marginTop: '10px' }}>
          See more...
        </Button>
      </>
    )
  }
}
export default HorizontalItemLList
