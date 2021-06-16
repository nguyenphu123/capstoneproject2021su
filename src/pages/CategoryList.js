import '../App.css'
import { Image, Grid, Card, Header } from 'semantic-ui-react'
import Category from '../components/Category/Category'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

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

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/category-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      setCategorylist(res.data)
    })
  }, [categorylist])

  return (
    <>
    <div style={{ marginTop: '10px' }}>
      
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
