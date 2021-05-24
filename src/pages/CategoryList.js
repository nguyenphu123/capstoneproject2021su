import '../App.css'
import { Image, Grid, Icon, Rail, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
function CategoryList () {
  return (
    <>
      <div class='section-title'>
        <h4>Categories</h4>
      </div>

      <Grid centered>
        <Grid.Column>
          <Image avatar src={`/${'assets/img/categories/category-1.jpg'}`} />
          <Link to='/Category1'>Category1</Link>
        </Grid.Column>
        <Grid.Column>
          <Image avatar src={`/${'assets/img/categories/category-1.jpg'}`} />
          <Link to='/Category1'>Category1</Link>
        </Grid.Column>
        <Grid.Column>
          <Image avatar src={`/${'assets/img/categories/category-1.jpg'}`} />
          <Link to='/Category1'>Category1</Link>
        </Grid.Column>
        <Grid.Column>
          <Image avatar src={`/${'assets/img/categories/category-1.jpg'}`} />
          <Link to='/Category1'>Category1</Link>
        </Grid.Column>
        <Grid.Column>
          <Image avatar src={`/${'assets/img/categories/category-1.jpg'}`} />
          <Link to='/Category1'>Category1</Link>
        </Grid.Column>
        <Grid.Column>
          <Image avatar src={`/${'assets/img/categories/category-1.jpg'}`} />
          <Link to='/Category1'>Category1</Link>
        </Grid.Column>
      </Grid>
    </>
  )
}

export default CategoryList
