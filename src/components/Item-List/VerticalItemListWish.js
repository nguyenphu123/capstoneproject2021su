import axios from 'axios'
import React from 'react'
import { Card } from 'semantic-ui-react'
import Button from '@material-ui/core/Button'

import PagnationBar from '../../Assets/PagnationBar'
import equal from 'fast-deep-equal'
import WhisListItem from './WhisListItem'

function mergePage (items, newItems, offset) {
  const merged = items.slice()
  newItems.forEach((item, idx) => {
    merged[idx + offset] = item
  })
  return merged
}

class VerticalItemListWish extends React.Component {
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
    console.log(this.props.apiUrl)
    axios({
      method: 'GET',
      url: this.props.apiUrl
    }).then(res => {
      console.log(res)
      console.log(res.data)

      let result = res.data.filter(x => x.UserId === this.props.UserId)

      this.setState({
        products: result,
        isLoading: false,
        isUpdated: false

        // currentPage: this.props.match.params
      })
    })
  }
  componentDidUpdate (prevProps) {
    if (!equal(this.props.reset, prevProps.reset)) {
      if (this.props.reset) {
        axios({
          method: 'GET',
          url: this.props.apiUrl
        }).then(res => {
          console.log(res)
          console.log(res.data)

          let result = res.data.filter(x => x.UserId === this.props.UserId)

          this.setState({
            products: result,
            isLoading: false,
            isUpdated: false

            // currentPage: this.props.match.params
          })
        })
      }
    } else {
    }
  }
  removeFromWhisList = (e, Id) => {
    e.prevenDefault()
    axios({
      method: 'DELETE',
      url: '/api/whistlist-management' + Id
    }).then(res => {})
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
              .map(({ Id, ProductId }) => (
                <div>
                  <div style={{ float: 'left' }}>
                    <WhisListItem Id={ProductId} />
                  </div>
                  <br />
                  <div style={{ float: 'left', marginLeft: '80px' }}>
                    <Button
                      onClick={() => removeFromWhisList(Id)}
                      title='Remove item'
                      class='button remove-item'
                    >
                      <span>
                        <span>Remove item</span>
                      </span>
                    </Button>
                  </div>
                </div>
              ))}
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
export default VerticalItemListWish
