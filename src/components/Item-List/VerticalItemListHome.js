import axios from 'axios'
import React from 'react'
import { Button, Card, Header } from 'semantic-ui-react'
import Title from '../../Assets/Title'
import { withRouter } from 'react-router-dom'
import ReactList from 'react-list'
import LazyLoading from 'react-list-lazy-load'
import PagnationBar from '../../Assets/PagnationBar'
import equal from 'fast-deep-equal'
import VerticalItem from './VerticalItem'
import { Link } from 'react-router-dom'

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
    axios({
      method: 'GET',
      url: this.props.apiUrl
    }).then(res => {
      this.setState({
        products: res.data,
        isLoading: true,
        isUpdated: true
      })
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
        let afterSliceResult = result.slice(0, 8)

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
        let afterSliceResult = result.slice(0, 8)

        this.setState({
          products: afterSliceResult,
          isLoading: false,
          isUpdated: false

          // currentPage: this.props.match.params
        })
      } else {
        let result = this.state.products

        let afterSliceResult = result.slice(0, 8)

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
            {currentPosts.map(
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
