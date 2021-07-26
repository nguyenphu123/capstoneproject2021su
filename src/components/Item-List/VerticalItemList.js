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
      if (
        this.props.keyword === '' ||
        this.props.keyword === null ||
        this.props.keyword === undefined
      ) {
        this.setState({
          products: res.data,
          isLoading: false,
          isUpdated: false
        })
      } else {
        let result = res.data.filter(x => x.Name.includes(this.props.keyword))

        this.setState({
          products: result,
          isLoading: false,
          isUpdated: false

          // currentPage: this.props.match.params
        })
      }
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
          if (
            this.props.keyword === '' ||
            this.props.keyword === null ||
            this.props.keyword === undefined
          ) {
            this.setState({
              products: res.data,
              isLoading: false,
              isUpdated: false
            })
          } else {
            let result = res.data.filter(x =>
              x.Name.includes(this.props.keyword)
            )

            this.setState({
              products: result,
              isLoading: false,
              isUpdated: false

              // currentPage: this.props.match.params
            })
          }
        })
      }
    } else {
      if (!equal(this.props.sortOption, prevProps.sortOption)) {
        console.log(this.props.sortOption)
        if (this.props.sortOption !== '') {
          if (this.props.sortOption === 'asc') {
            let result = this.state.products.sort((a, b) =>
              a.Price > b.Price ? 1 : -1
            )

            this.setState({
              products: result,
              isLoading: false,
              isUpdated: false
            })
          } else {
            let result = this.state.products.sort((a, b) =>
              a.Price < b.Price ? 1 : -1
            )

            this.setState({
              products: result,
              isLoading: false,
              isUpdated: false
            })
          }
        }
      }
      if (!equal(this.props.apiUrl, prevProps.apiUrl)) {
        axios({
          method: 'GET',
          url: this.props.apiUrl
        }).then(res => {
          if (this.props.sortOption === 'asc') {
            let result = res.data.sort((a, b) => (a.Price > b.Price ? 1 : -1))

            this.setState({
              products: result,
              isLoading: false,
              isUpdated: false
            })
          } else {
            let result = res.data.sort((a, b) => (a.Price < b.Price ? 1 : -1))

            this.setState({
              products: result,
              isLoading: false,
              isUpdated: false
            })
          }

          // }
        })
      } else {
        if (!equal(this.props.colorId, prevProps.colorId)) {
          if (this.props.colorId !== '') {
            if (this.props.sizeId === '' && this.props.tagId === '') {
              console.log(this.props.apiUrl)
              axios({
                method: 'GET',
                url: this.props.apiUrl
              }).then(res => {
                const result = res.data.filter(x => x.Elements.length !== 0)
                const colorResult = result.filter(
                  x =>
                    x.Elements.findIndex(
                      item => item.Color.Id === this.props.colorId
                    ) !== -1
                )

                if (res.data.length !== []) {
                  this.setState({
                    products: colorResult
                  })
                }
              })
            } else {
              const result = this.state.products.filter(
                x => x.Elements.length !== 0
              )
              const colorResult = result.filter(
                x =>
                  x.Elements.findIndex(
                    item => item.Color.Id === this.props.colorId
                  ) !== -1
              )

              if (this.state.products.length !== []) {
                this.setState({
                  products: colorResult
                })
              }
            }
          }
        }
        if (!equal(this.props.sizeId, prevProps.sizeId)) {
          if (this.props.sizeId !== '') {
            if (this.props.colorId === '' && this.props.tagId === '') {
              axios({
                method: 'GET',
                url: this.props.apiUrl
              }).then(res => {
                const result = res.data.filter(x => x.Elements.length !== 0)
                const sizeResult = result.filter(
                  x =>
                    x.Elements.findIndex(
                      item => item.Size.Id === this.props.sizeId
                    ) !== -1
                )
                if (this.state.products.length !== []) {
                  this.setState({
                    products: sizeResult
                  })
                }
              })
            } else {
              const result = this.state.products.filter(
                x => x.Elements.length !== 0
              )
              const sizeResult = result.filter(
                x =>
                  x.Elements.findIndex(
                    item => item.Size.Id === this.props.sizeId
                  ) !== -1
              )
              if (this.state.products.length !== []) {
                this.setState({
                  products: sizeResult
                })
              }
            }
          }
        }
        if (!equal(this.props.tagId, prevProps.tagId)) {
          if (this.props.tagId !== '') {
            if (this.props.sizeId === '' && this.props.colorId === '') {
              axios({
                method: 'GET',
                url: this.props.apiUrl
              }).then(res => {
                const result = res.data.filter(
                  x =>
                    x.Tags.findIndex(
                      item => item.Tag.Id === this.props.tagId
                    ) !== -1
                )

                if (this.state.products.length !== []) {
                  this.setState({
                    products: result
                  })
                }
              })
            } else {
              const result = this.state.products.filter(x =>
                x.Tags.length === 0
                  ? null
                  : x.Tags.findIndex(item => item.Id === this.props.tagId) !==
                    -1
              )
              console.log(result)
              if (this.state.products.length !== []) {
                this.setState({
                  products: result
                })
              }
            }
          }
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
                Elements,
                Star
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
export default VerticalItemList
