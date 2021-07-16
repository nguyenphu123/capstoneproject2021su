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

class VerticalItemList extends React.Component {
  constructor () {
    super()

    this.state = {
      products: [],
      currentPage: 1,
      pageSize: 9,
      isLoading: true,
      isUpdated: true
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

      this.setState({
        products: result,
        isLoading: false
        // currentPage: this.props.match.params
      })
    })
  }
  componentDidUpdate (prevProps) {
    if (this.props.reset && this.state.isUpdated) {
      axios({
        method: 'GET',
        url: this.props.apiUrl
      }).then(res => {
        console.log(res)
        console.log(res.data)
        let result = res.data

        this.setState({
          products: result,
          isLoading: false,
          isUpdated: false

          // currentPage: this.props.match.params
        })
      })
    } else {
      if (!equal(this.props.colorId, prevProps.colorId)) {
        if (this.props.colorId !== '') {
          const result = this.state.products.filter(x =>
            x.Elements.findIndex(item => item.Color.Id === this.props.colorId)
          )
          this.setState({
            products: result
            // isLoading: false
            // currentPage: this.props.match.params
          })
        }
      }
      if (!equal(this.props.sizeId, prevProps.sizeId)) {
        if (this.props.sizeId !== '') {
          const result = this.state.products.filter(x =>
            x.Elements.findIndex(item => item.Size.Id === this.props.sizeId)
          )

          this.setState({
            products: result
            // isLoading: false
            // currentPage: this.props.match.params
          })
        }
      }
      if (!equal(this.props.tagId, prevProps.tagId)) {
        if (this.props.tagId !== '') {
          const result = this.state.products.filter(x =>
            x.Tags.findIndex(item => item.Id === this.props.tagId)
          )

          this.setState({
            products: result
            // isLoading: false
            // currentPage: this.props.match.params
          })
        }
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
      return null
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
                    Description={Description}
                  />
                </div>
              )
            )}
            {this.state.products.length > 9 ? (
              <PagnationBar
                postsPerPage={9}
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
export default VerticalItemList
