import '../../App.css'
import { Image, Grid, Icon, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Category from './Category'
import axios from 'axios'

function Categories () {
  const catagories = [
    {
      name: 'Pendant earrings',
      img: 'assets/img/trend/ht-1.jpg'
    },
    {
      name: 'Cotton T-Shirt',
      img: 'assets/img/trend/ht-3.jpg'
    },
    {
      name: 'Cotton T-Shirt',
      img: '/assets/img/trend/ht-3.jpg'
    }
  ]

  return (
    <>
      <div class='section-title'>
        <h4>Categories</h4>
      </div>

      <Grid centered>
        {Array.from(Array(10), (e, i) => {
          return <Category name="" img="" />
        })}

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
