import axios from 'axios'
import React from 'react'
import { Card } from 'semantic-ui-react'

import PagnationBar from '../../Assets/PagnationBar'

import VerticalItem from './VerticalItem'

function mergePage (items, newItems, offset) {
  const merged = items.slice()
  newItems.forEach((item, idx) => {
    merged[idx + offset] = item
  })
  return merged
}

class VerticalItemListHome extends React.Component {
  constructor () {
    super()

    this.state = {
      products: [],
      currentPage: 1,
      pageSize: 12,
      isLoading: true,
      isUpdated: true
    }
  }
  componentDidMount () {
    console.log(this.props.topic)
    axios({
      method: 'GET',
      url: this.props.apiUrl
    }).then(res => {
      if (this.props.topic === 'Super deals') {
        let result = res.data.sort((a, b) =>
          Math.round(((a.Price - a.CurrentPrice) * 100) / a.Price) <
          Math.round(((b.Price - b.CurrentPrice) * 100) / b.Price)
            ? 1
            : -1
        )
        let afterSliceResult = result
          .slice(0, 8)
          .filter(item => item.Status === true && item.ImageStorages !== [])

        this.setState({
          products: afterSliceResult,
          isLoading: false,
          isUpdated: false
        })
      } else if (this.props.topic === 'New arrival') {
        let result = res.data.sort(function compare (a, b) {
          var dateA = new Date(a.DateTime)
          var dateB = new Date(b.DateTime)
          return dateA - dateB
        })
        let afterSliceResult = result
          .slice(0, 8)
          .filter(item => item.Status === true && item.ImageStorages !== [])

        this.setState({
          products: afterSliceResult,
          isLoading: false,
          isUpdated: false

          // currentPage: this.props.match.params
        })
      } else {
        let result = res.data

        let afterSliceResult = result
          .slice(0, 8)
          .filter(item => item.Status === true && item.ImageStorages !== [])

        this.setState({
          products: afterSliceResult,
          isLoading: false,
          isUpdated: false
        })
      }
    })
  }
  componentDidUpdate (prevProps) {
    if (this.props.reset && this.state.isUpdated) {
      if (this.props.topic === 'Super deals') {
        let result = this.state.products.sort((a, b) =>
          Math.round(((a.Price - a.CurrentPrice) * 100) / a.Price) <
          Math.round(((b.Price - b.CurrentPrice) * 100) / b.Price)
            ? 1
            : -1
        )
        let afterSliceResult = result
          .slice(0, 8)
          .filter(item => item.Status === true && item.ImageStorages !== [])

        this.setState({
          products: afterSliceResult,
          isLoading: false,
          isUpdated: false
        })
      } else if (this.props.topic === 'New arrival') {
        let result = this.state.products.sort(function compare (a, b) {
          var dateA = new Date(a.DateTime)
          var dateB = new Date(b.DateTime)
          return dateA - dateB
        })
        let afterSliceResult = result
          .slice(0, 8)
          .filter(item => item.Status === true && item.ImageStorages !== [])

        this.setState({
          products: afterSliceResult,
          isLoading: false,
          isUpdated: false

          // currentPage: this.props.match.params
        })
      } else {
        let result = this.state.products.filter(item => item.Status === true)

        let afterSliceResult = result
          .slice(0, 8)
          .filter(item => item.Status === true && item.ImageStorages !== [])

        this.setState({
          products: afterSliceResult,
          isLoading: false,
          isUpdated: false
        })
      }
    }
  }
  render () {
    const indexOfLastPost = this.state.currentPage * this.state.pageSize

    const indexOfFirstPost = indexOfLastPost - this.state.pageSize

    const currentPosts = this.state.products.slice(
      indexOfFirstPost,
      indexOfLastPost
    )

    // Change page
    const paginate = pageNumber =>
      this.setState({
        currentPage: pageNumber
      })

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
            {currentPosts
              .filter(
                item => item.Status === true && item.ImageStorages.length !== 0
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
                  ImageStorages,
                  Elements
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
                      Description={Description}
                      Elements={Elements}
                      Star={Star}
                    />
                  </div>
                )
              )}
            {this.state.products.length > 12 ? (
              <PagnationBar
                postsPerPage={12}
                totalPosts={this.state.products.length}
                paginate={paginate}
                currentLink={this.props.currentLink}
              />
            ) : (
              <></>
            )}
          </Card.Group>
        </>
      )
    }
  }
}
export default VerticalItemListHome
