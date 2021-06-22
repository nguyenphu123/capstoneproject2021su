import '../../App.css'

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
        <Title Name={this.props.topic} />

        <div class='trend__content' style={{ marginTop: '100px' }}>
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
      </>
    )
  }
}
export default HorizontalItemLList
