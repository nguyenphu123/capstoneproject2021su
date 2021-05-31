import '../App.css'
import { Image, Grid, Card } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'
function CategoryList () {
  return (
    <div>
      <div class='section-title'>
        <h4>Categories</h4>
      </div>

      <Grid centered columns={5} style={{ marginLeft: '50px' }}>
        <Grid.Column>
          <Card href='/Category1'>
            <Image
              size='medium'
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
              size='medium'
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
              size='medium'
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
              size='medium'
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
              size='medium'
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
              size='medium'
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
              size='medium'
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
              size='medium'
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
              size='medium'
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
              size='medium'
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
              size='medium'
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
              size='medium'
              src={`/${'assets/img/categories/category-1.jpg'}`}
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Description>Category1</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default CategoryList
