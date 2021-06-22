import '../App.css'
import 'react-multi-carousel/lib/styles.css'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'

import Category from '../components/Category/Category'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6
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

function CategoryList () {
  const [categorylist, setCategorylist] = useState([])
  const [loadComplete, setLoadComplete] = useState(false)

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/category-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      setCategorylist(res.data)
    })
    setLoadComplete(true)
  }, [!loadComplete])

  return (
    <>
      <div style={{ marginTop: '100px' }}>
        <Carousel responsive={responsive}>
          {categorylist.map(({ Id, Name }) => (
            <Category
              Id={Id}
              Name={Name}
              img='//vn-test-11.slatic.net/p/bdc70a474f5b0d1f3ca8d2137ad4a651.jpg_720x720q80.jpg_.webp'
            />
          ))}
        </Carousel>
      </div>
    </>
  )
}

export default CategoryList
