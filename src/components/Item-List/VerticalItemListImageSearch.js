import axios from 'axios'
import React from 'react'
import { Card } from 'semantic-ui-react'

import PagnationBar from '../../Assets/PagnationBar'

import VerticalItem from './VerticalItem'

var faker = require('faker')

var randomstring = require('randomstring')

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
      isLoading: false,
      isUpdated: true,
      Colors: [],
      Sizes: [],
      Elements: [],
      ImageList: [],
      Tags: [],
      categories: []
    }
  }
  componentDidMount () {
    axios({
      method: 'GET',
      url: '/api/category-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      for (let index = 0; index < res.data.length; index++) {
        const element = {
          key: res.data[index].Id,
          text: res.data[index].Name,
          value: res.data[index].Id
        }
        if (res.data[index].SubCategories.length !== 0) {
          for (
            let jindex = 0;
            jindex < res.data[index].SubCategories.length;
            jindex++
          ) {
            const element = {
              key: res.data[index].SubCategories[jindex].Id,
              text: res.data[index].SubCategories[jindex].Name,
              value: res.data[index].SubCategories[jindex].Id
            }

            this.state.categories.push(element)

            //   this.setState({
            //     categories: this.state.categories.push(element)
            //   })
          }
        }
        this.state.categories.push(element)

        //   this.setState({
        //     categories: this.state.categories.push(element)
        //   })
      }
    })

    axios({
      method: 'GET',
      url: '/api/tag-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      for (let index = 0; index < res.data.length; index++) {
        const element = {
          key: res.data[index].Id,
          text: res.data[index].Name,
          value: res.data[index].Id
        }
        this.state.Tags.push(element)

        //   this.setState({
        //     categories: this.state.categories.push(element)
        //   })
      }
    })
    axios({
      method: 'GET',
      url: '/api/color-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      for (let index = 0; index < res.data.length; index++) {
        const element = {
          key: res.data[index].Id,
          text: res.data[index].Name,
          value: res.data[index].Id
        }
        this.state.Colors.push(element)

        //   this.setState({
        //     categories: this.state.categories.push(element)
        //   })
      }
    })
    axios({
      method: 'GET',
      url: '/api/size-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      for (let index = 0; index < res.data.length; index++) {
        const element = {
          key: res.data[index].Id,
          text: res.data[index].Name,
          value: res.data[index].Id
        }
        this.state.Sizes.push(element)

        //   this.setState({
        //     categories: this.state.categories.push(element)
        //   })
      }
    })
  }
  componentDidUpdate (prevProps) {
    console.log(this.props.ImageList)
    if (prevProps.ImageList !== this.props.ImageList) {
      this.setState({
        isLoading: true
      })

      axios({
        method: 'GET',
        url: this.props.apiUrl
      }).then(res => {
        let final = []
        let datas = res.data
        let sendToDb = []
        console.log(datas)

        if (datas.length === 0) {
          console.log(this.props.ImageList)

          this.props.ImageList.forEach(elementimg => {
            const data = {
              Name: faker.commerce.productName(),
              Price: 20000,
              CurrentPrice: 10000,
              Code: randomstring.generate(4),
              CategoryId: this.state.categories[
                Math.floor(Math.random() * this.state.categories.length)
              ].value,
              Description: faker.commerce.productDescription(),
              ImageStorages: [
                {
                  ImageUrl: elementimg.path,
                  Alt: '404'
                }
              ],
              Tags: [
                {
                  Id: this.state.Tags[
                    Math.floor(Math.random() * this.state.Tags.length)
                  ].value
                }
              ],
              Elements: [
                {
                  ColorId: this.state.Colors[
                    Math.floor(Math.random() * this.state.Colors.length)
                  ].value,
                  SizeId: this.state.Sizes[
                    Math.floor(Math.random() * this.state.Sizes.length)
                  ].value,
                  Quantity: 100
                }
              ],
              Status: true,
              Star: 5
            }
            datas.push(data)
            const check_index = sendToDb.findIndex(
              item => item.ImageStorages[0].ImageUrl === elementimg.path
            )
            if (check_index !== -1) {
            } else {
              sendToDb.push(data)
              console.log(this.props.ImageList)
            }
          })
        }

        let result = datas.forEach(element => {
          this.props.ImageList.forEach(elementimg => {
            if (elementimg.path === element.ImageStorages[0].ImageUrl) {
              const check_index = final.findIndex(
                item => item.ImageStorages[0].ImageUrl === elementimg.path
              )
              if (check_index !== -1) {
              } else {
                final.push(element)
              }
            } else {
              const check_index = datas.findIndex(
                item => item.ImageStorages[0].ImageUrl === elementimg.path
              )
              if (check_index !== -1) {
              } else {
                const data = {
                  Name: faker.commerce.productName(),
                  Price: 20000,
                  CurrentPrice: 10000,
                  Code: randomstring.generate(4),
                  CategoryId: this.state.categories[
                    Math.floor(Math.random() * this.state.categories.length)
                  ].value,
                  Description: faker.commerce.productDescription(),
                  ImageStorages: [
                    {
                      ImageUrl: elementimg.path,
                      Alt: '404'
                    }
                  ],
                  Tags: [
                    {
                      Id: this.state.Tags[
                        Math.floor(Math.random() * this.state.Tags.length)
                      ].value
                    }
                  ],
                  Elements: [
                    {
                      ColorId: this.state.Colors[
                        Math.floor(Math.random() * this.state.Colors.length)
                      ].value,
                      SizeId: this.state.Sizes[
                        Math.floor(Math.random() * this.state.Sizes.length)
                      ].value,
                      Quantity: 100
                    }
                  ],
                  Status: true,
                  Star: 5
                }
                datas.push(data)
                const check_index = sendToDb.findIndex(
                  item => item.ImageStorages[0].ImageUrl === elementimg.path
                )
                if (check_index !== -1) {
                } else {
                  sendToDb.push(data)
                }
              }
            }
          })
        })
        for (let index = 0; index < sendToDb.length; index++) {
          const element = sendToDb[index]

          axios({
            method: 'post',
            url: '/api/product-management',
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify(element)
          }).then(res => {
            console.log(res)
            element.Id = res.data
            console.log(element)
            const check_index = final.findIndex(
              item =>
                item.ImageStorages[0].ImageUrl ===
                element.ImageStorages[0].ImageUrl
            )
            if (check_index !== -1) {
            } else {
              final.push(element)
            }
          })
        }

        setTimeout(() => {
          this.setState({
            products: final,
            isLoading: false,
            isUpdated: false
          })
        }, 10000)
      })
    }
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
        <div style={{ marginTop: '30px' }}>
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
        </div>
      )
    }
  }
}
export default VerticalItemListHome
