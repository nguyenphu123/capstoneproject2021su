import '../../App.css'
import { Image, Grid, Icon, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
function Categories () {
  return (
    <>
      <div class='section-title'>
        <h4>Categories</h4>
      </div>
      <Grid centered>
        <Grid.Column>
          <Card href='/Category1'>
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
        <Grid.Column>
          <Card href='/Category1'>
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
        <Grid.Column>
          <Card href='/Category1'>
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

        <Grid.Column>
          <Card href='/Category1'>
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
        <Grid.Column>
          <Card href='/Category1'>
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
        <Grid.Column>
          <Card href='/Category1'>
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
