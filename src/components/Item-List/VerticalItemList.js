import axios from 'axios'
import React from 'react'
import { Button, Card, Header } from 'semantic-ui-react'
import Title from '../../Assets/Title'
import { withRouter } from 'react-router-dom'

import VerticalItem from './VerticalItem'
import { Link } from 'react-router-dom'

class VerticalItemList extends React.Component {
  constructor () {
    super()

    this.state = {
      products: [],
      currentPage: '1',
      pageSize: 50
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
      let result = res.data
      if (this.props.colorId !== '') {
        result = res.data.filter(x =>
          x.Elements.findIndex(item => item.Color.Id === this.props.colorId)
        )
      }
      if (this.props.categoryId !== '') {
        result = res.data.filter(x => x.CategoryId === this.props.categoryId)
      }
      if (this.props.sizeId !== '') {
        result = res.data.filter(x =>
          x.Elements.findIndex(item => item.Size.Id === this.props.sizeId)
        )
      }
      if (this.props.tagId !== '') {
        result = res.data.filter(x =>
          x.Tags.findIndex(item => item.Id === this.props.tagId)
        )
      }

      this.setState({
        products: result

        // currentPage: this.props.match.params
      })
    })
  }

  render () {
    const indexOfLastPost = this.state.currentPage * this.state.pageSize
    const indexOfFirstPost = indexOfLastPost - this.state.pageSize
    const currentPosts = this.state.products.slice(
      indexOfFirstPost,
      indexOfLastPost
    )

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
                <VerticalItem
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
export default VerticalItemList
