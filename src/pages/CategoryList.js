import '../App.css'
import { Image, Grid, Card } from 'semantic-ui-react'
import Category from '../components/Category/Category'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

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
    <div>
      <div class='section-title'>
        <h4>Categories</h4>
      </div>

      <Grid centered columns={5} style={{ marginLeft: '50px' }}>
        {categorylist.map(({Id, Name }) => (
          <Category Id={Id} Name={Name} img='' />
        ))}
      </Grid>
    </div>
  )
}

export default CategoryList
