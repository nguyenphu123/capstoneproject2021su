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
  const image = [
    {
      Id: '12345678-1234-1243-1234-123456789012',
      Url:
        '//vn-test-11.slatic.net/p/bdc70a474f5b0d1f3ca8d2137ad4a651.jpg_720x720q80.jpg_.webp'
    },
    {
      Id: '351772a7-a733-4b07-8c3d-42b7694d2bc2',
      Url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbYgC22msl0IT4fTk1THf6U6wBjrj2YzXJaQ&usqp=CAU'
    },
    {
      Id: '6517bd6f-ffd4-4e1a-897a-cf82f5f52c03',
      Url:
        'data:image/jpeg;base64,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'
    },
    {
      Id: '6517bd6f-ffd4-4e1a-897a-cf82f5f52c01',
      Url:
        'https://images.foody.vn/res/g28/273885/prof/s576x330/foody-mobile-3-jpg-568-636089241276843449.jpg'
    },
    {
      Id: '351772a7-a733-4b07-8c3d-42b7694d2b12',
      Url:
        'https://specials-images.forbesimg.com/imageserve/5fce964d2a25eb72755f987f/960x0.jpg?fit=scale'
    }
    // { Id: '', Url: '' },
    // { Id: '', Url: '' },
    // { Id: '', Url: '' },
    // { Id: '', Url: '' },
    // { Id: '', Url: '' }
  ]

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/category-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      for (let index = 0; index < image.length; index++) {
        const element = image[index].Id
        const check_index = res.data.findIndex(item => item.Id === element)
        if (check_index !== -1) {
          res.data[check_index].Image = image[index].Url
        } else {
        }
      }
      console.log(res.data)

      setCategorylist(res.data)
    })
    setLoadComplete(true)
  }, [!loadComplete])

  return (
    <>
      <div className='top-cate'>
        <div className='featured-pro container'>
          <div className='row'>
            <div className='col-lg-12'>
              <Carousel responsive={responsive}>
                {categorylist.map(({ Id, Name, Image }) => (
                  <div className='slider-items-products'>
                    <Category Id={Id} Name={Name} img={Image} />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CategoryList
