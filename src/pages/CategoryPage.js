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
  List,
  Divider,
  Rating,
  Pagination,
  Header
} from 'semantic-ui-react'
import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'

function CategoryPage () {
  //id của category
  const { categoryId } = useParams()
  //component dùng url động
  const [currentURL, setCurrentURL] = useState('')
  const [category, setCategory] = useState({})

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
  const [subList, setSubList] = useState([])

  useEffect(() => {
    console.log(categoryId)
    setCurrentURL('/api/product-management/' + categoryId)
    axios({
      method: 'GET',
      url: '/api/category-management/' + categoryId
    }).then(res => {
      console.log(res)
      console.log(res.data)
      setCategory(res.data)
    })
    // setSubList(category.SubCategories)
  }, [{ categoryId }])

  useEffect(() => {
    console.log(categoryId)

    axios({
      method: 'GET',
      url: '/api/color-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      setColorlist(res.data)
    })
    axios({
      method: 'GET',
      url: '/api/size-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      setSizelist(res.data)
    })
    axios({
      method: 'GET',
      url: '/api/tag-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      setTaglist(res.data)
    })
  }, [])

  function handleChange (colorId, sizeId, tagId, categoryId) {
    setCurrentURL('/api/product-management/1/1/1/1?pageIndex=1&pageSize=1')
  }
  return (
    <>
      <Grid centered columns={2}>
        <Header as='h1' inverted color='red'>
          Search result
        </Header>

        <Grid.Column>
          <Dropdown
            text='Color'
            icon='filter'
            floating
            labeled
            button
            className='icon'
          >
            <Dropdown.Menu>
              <Dropdown.Header content='Search Color' />
              <Input icon='search' iconPosition='left' name='search' />
              <Dropdown.Header icon='tags' content='Filter by tag' />
              <Dropdown.Divider />
              {colorlist.map(({ Name, Id }) => (
                <Dropdown.Item
                  label={{ color: Name, empty: true, circular: true }}
                  text={Name}
                  value={Id}
                />
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown
            text='Size'
            icon='filter'
            floating
            labeled
            button
            className='icon'
          >
            <Dropdown.Menu>
              <Dropdown.Header content='Search Size' />
              <Input icon='search' iconPosition='left' name='search' />
              <Dropdown.Header icon='tags' content='Filter by tag' />
              <Dropdown.Divider />
              {sizelist.map(({ Name, Id }) => (
                <Dropdown.Item
                  label={{ empty: true, circular: true }}
                  text={Name}
                  value={Id}
                />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Row>
          <Grid.Column
            style={{ marginTop: '40px', textAlign: 'center' }}
            width={4}
          >
            <List>
              <List.Item>
                <Header as='h5' color='black'>
                  Sub categories
                </Header>
              </List.Item>
              {subList.map(({ Name, Id }) => (
                <List.Item>
                  <Checkbox label={Name} value={Id} />
                </List.Item>
              ))}
            </List>
            <Divider horizontal></Divider>
            <List>
              <List.Item>
                {' '}
                <Header as='h5' color='black'>
                  Tag
                </Header>
              </List.Item>
              {taglist.map(({ Name, Id }) => (
                <List.Item>
                  <Checkbox label={Name} value={Id} />
                </List.Item>
              ))}
            </List>
            <Divider horizontal></Divider>
            <List>
              <List.Item>
                <Header as='h5' color='black'>
                  Places
                </Header>
              </List.Item>
              <List.Item>
                <Checkbox label='Ho Chi Minh city' />
              </List.Item>
              <List.Item>
                <Checkbox label='Ha Noi' />
              </List.Item>
            </List>
            <Divider horizontal></Divider>
            <List>
              <List.Item>
                <Header as='h5' color='black'>
                  Transports unit
                </Header>
              </List.Item>
              <List.Item>
                <Checkbox label='Express' />
              </List.Item>
            </List>
            <Divider horizontal></Divider>
            <List>
              <List.Item>
                <Header as='h5' color='black'>
                  Rating
                </Header>
              </List.Item>
              <List.Item>
                <Rating icon='star' defaultRating={5} maxRating={5} disabled />
              </List.Item>
              <List.Item>
                <Rating icon='star' defaultRating={4} maxRating={5} disabled />
              </List.Item>
              <List.Item>
                <Rating icon='star' defaultRating={3} maxRating={5} disabled />
              </List.Item>
              <List.Item>
                <Rating icon='star' defaultRating={2} maxRating={5} disabled />
              </List.Item>
              <List.Item>
                <Rating icon='star' defaultRating={1} maxRating={5} disabled />
              </List.Item>
            </List>
          </Grid.Column>

          <Grid.Column width={11}>
            <VerticalItemList
              topic={category.Name}
              apiUrl={'/api/product-management/' + categoryId}
            />
            <Pagination defaultActivePage={1} totalPages={10} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default CategoryPage
