

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Icon } from 'semantic-ui-react'


import Category from './Category'

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
