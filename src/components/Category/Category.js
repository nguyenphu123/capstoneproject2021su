import '../../App.css'
import { Image, Grid, Icon, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
const Category = ({ Id, Name, img }) => (
  <Grid.Column>
    <Card href={'/Category/' + Id}>
      <Image
        size='small'
        src={`/${'assets/img/categories/category-1.jpg'}`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Description>{Name}</Card.Description>
      </Card.Content>
    </Card>
  </Grid.Column>
)

export default Category
