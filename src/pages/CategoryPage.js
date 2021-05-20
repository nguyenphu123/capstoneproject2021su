
import '../App.css';
import VerticalItemList from "../components/Item-List/VerticalItemList";
import { Grid,Checkbox ,Segment,Menu,Sidebar, Input, Dropdown,Pagination} from 'semantic-ui-react'
import _ from 'lodash'
 const columns = _.times(5, (i) => (
  <Grid.Column key={i}>
    <Dropdown
    text='Filter'
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
        text='Important'
      />
      <Dropdown.Item
        label={{ color: 'blue', empty: true, circular: true }}
        text='Announcement'
      />
      <Dropdown.Item
        label={{ color: 'black', empty: true, circular: true }}
        text='Discussion'
      />
    </Dropdown.Menu>
  </Dropdown>
  </Grid.Column>
))

function CategoryPage() {
  return (
   
       
            
           
          
            <>Sắp xếp theo
             <Grid  centered>{columns}</Grid>
         <Sidebar.Pushable as={Segment}>
    <Sidebar
      as={Menu}
      animation='overlay'
      icon='labeled'
      inverted
      vertical
      visible
      width='thin'
      style={{ backgroundColor: '#EEB6A2'}}
    >
    BỘ LỌC TÌM KIẾM
      <Menu.Item  as='a'>
      Theo Danh Mục
       <Checkbox label='Make my profile visible' />
        <Checkbox label='Make my profile visible' />
         <Checkbox label='Make my profile visible' />
          <Checkbox label='Make my profile visible' />
           <Checkbox label='Make my profile visible' />
      </Menu.Item>
      <Menu.Item as='a'>
       Nơi Bán
       <Checkbox label='Make my profile visible' />
        <Checkbox label='Make my profile visible' />
         <Checkbox label='Make my profile visible' />
          <Checkbox label='Make my profile visible' />
           <Checkbox label='Make my profile visible' />
      </Menu.Item>
      <Menu.Item as='a'>
       Đơn Vị Vận Chuyển
       <Checkbox label='Make my profile visible' />
        <Checkbox label='Make my profile visible' />
         <Checkbox label='Make my profile visible' />
          <Checkbox label='Make my profile visible' />
           <Checkbox label='Make my profile visible' />
      </Menu.Item>
    </Sidebar>

    <Sidebar.Pusher>
      <Segment basic>
         <VerticalItemList />
         <Pagination defaultActivePage={1} totalPages={10} />
      </Segment>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
          
             </>
            
            
           
    
  );
}

export default CategoryPage;
