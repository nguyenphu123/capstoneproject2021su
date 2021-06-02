import '../../App.css'
import { Image, Grid, Icon, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
const Category = ({ name, img }) => (
  <Grid.Column>
    <Card href='/Category/categoryId'>
      <Image
        size='small'
        src={`/${'assets/img/categories/category-1.jpg'}`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Description>Category1</Card.Description>
      </Card.Content>
    </Card>
  </Grid.Column>
)

export default Category
