import axios from 'axios'
import React from 'react'

// import PagnationBar from '../../Assets/PagnationBar'
import 'react-multi-carousel/lib/styles.css'

import VerticalItem from './VerticalItem'
// import Slider from 'react-slick'
// import '~slick-carousel/slick/slick.css'
// import '~slick-carousel/slick/slick-theme.css'
import Carousel from 'react-multi-carousel'

function mergePage (items, newItems, offset) {
  const merged = items.slice()
  newItems.forEach((item, idx) => {
    merged[idx + offset] = item
  })
  return merged
}

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}

class VerticalItemListSlide extends React.Component {
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
        let afterSliceResult = result.slice(0, 5)

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
        let afterSliceResult = result.slice(0, 5)

        this.setState({
          products: afterSliceResult,
          isLoading: false,
          isUpdated: false

          // currentPage: this.props.match.params
        })
      } else {
        let result = res.data

        let afterSliceResult = result.slice(0, 5)

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
        let afterSliceResult = result.slice(0, 5)

        this.setState({
          products: afterSliceResult,
          isLoading: false,
          isUpdated: false

          // currentPage: this.props.match.params
        })
      } else {
        let result = this.state.products

        let afterSliceResult = result.slice(0, 5)

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
          <Carousel responsive={responsive}>
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
                <div style={{ float: 'left', marginLeft: '50px' }}>
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
          </Carousel>
        </>
      )
    }
  }
}
export default VerticalItemListSlide
