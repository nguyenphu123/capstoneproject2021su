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
  List
} from 'semantic-ui-react'
import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'

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
  //id của category
  const { categoryId } = useParams()
  //component dùng url động
  const [currentURL, setCurrentURL] = useState('')
  //filter màu
  const [colorlist, setColorlist] = useState([])
  const [color, setColor] = useState('')
  //filter rank
  // const [ranklist, setRanklist] = useState([])
  // const [rank, setRank] = useState('')
  
  //filter size
  const [sizelist, setSizelist] = useState([])
  const [size, setSize] = useState('')
  //tag
  const [taglist, setTaglist] = useState([])
  const [tag, setTag] = useState('')

  useEffect(() => {
    console.log(categoryId)
    setCurrentURL(
      '/api/product-management/' +
        {
          categoryId
        }
    )
    axios({
      method: 'GET',
      url: '/api/color-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
    })
    // axios({
    //   method: 'GET',
    //   url: '/api/rank-management'
    // }).then(res => {
    //   console.log(res)
    //   console.log(res.data)
    // })
    
    axios({
      method: 'GET',
      url: '/api/size-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
    })
    axios({
      method: 'GET',
      url: '/api/tag-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
    })
  }, [{ categoryId }])
  function handleChange (colorId, sizeId, tagId, categoryId) {
    setCurrentURL('/api/product-management/1/1/1/1?pageIndex=1&pageSize=1')
  }
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
            <VerticalItemList topic='category1' apiUrl={currentURL} />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  )
}

export default CategoryPage
