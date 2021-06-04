import '../../App.css'
import { Image, Grid, Icon, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Category from './Category'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

function Categories () {
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
  }, [])

  return (
    <>
      <div class='section-title'>
        <h4>Categories</h4>
      </div>

      <Grid centered>
        {/* {Array.from(Array(10), (e, i) => {
          return <Category name='' img='' />
        })} */}
        {categorylist.map(({ Id, Name }) => (
          <Category Id={Id} Name={Name} img='' />
        ))}

        <Grid.Column>
          <Link to='/Categories'>
            <Icon name='eye' />
            See More
          </Link>
        </Grid.Column>
      </Grid>
    </>
  )
}

export default Categories
