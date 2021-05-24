import '../App.css'
import VerticalItemList from '../components/Item-List/VerticalItemList'
import {
  Grid,
  Checkbox,
  Segment,
  Menu,
  Sidebar,
  Input,
  Dropdown,
  Pagination,
  List
} from 'semantic-ui-react'
import _ from 'lodash'
const columns = _.times(5, i => (
  <Grid.Column key={i}>
    <Dropdown
      text='Status'
      icon='filter'
      floating
      labeled
      button
      className='icon'
    >
      <Dropdown.Menu>
        <Dropdown.Header content='Search Issues' />
        <Input icon='search' iconPosition='left' name='search' />
        <Dropdown.Header icon='tags' content='Filter by tag' />
        <Dropdown.Divider />
        <Dropdown.Item
          label={{ color: 'red', empty: true, circular: true }}
          text='New'
        />
        <Dropdown.Item
          label={{ color: 'blue', empty: true, circular: true }}
          text='Sale off'
        />
        <Dropdown.Item
          label={{ color: 'black', empty: true, circular: true }}
          text='Soldout'
        />
      </Dropdown.Menu>
    </Dropdown>
  </Grid.Column>
))

function CategoryPage () {
  return (
    <>
      Search result
      <Grid centered>Filter{columns}</Grid>
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          vertical
          visible
          width='thin'
          style={{ backgroundColor: '#EEB6A2' }}
        >
          Filter
          <Menu.Item position='left' fitted='vertically'>
            Categories
            <List>
              <List.Item>
                <Checkbox label='Shirt' />
              </List.Item>
              <List.Item>
                <Checkbox label='T-Shirt' />
              </List.Item>
              <List.Item>
                <Checkbox label='Skirt' />
              </List.Item>
              <List.Item>
                <Checkbox label='Jean' />
              </List.Item>
              <List.Item>
                <Checkbox label='Pant' />
              </List.Item>
            </List>
          </Menu.Item>
          <Menu.Item as='a'>
            Places
            <List>
              <List.Item>
                <Checkbox label='Ho Chi Minh city' />
              </List.Item>
              <List.Item>
                <Checkbox label='Ha Noi' />
              </List.Item>
            </List>
          </Menu.Item>
          <Menu.Item as='a'>
            Transports unit
            <Checkbox label='Express' />
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <Segment basic>
            <VerticalItemList topic='category1' />
            <Pagination defaultActivePage={1} totalPages={10} />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  )
}

export default CategoryPage
