import _ from 'lodash'
import FilterResults from 'react-filter-search'
import axios from 'axios'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'

// const initialState = { isLoading: false, results: [], value: '' }
// const getResults = () => _.times(5, () => ({}))

export default class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      value: '',
      filterVisibility: 'hidden',
      hover: false,
      SearchResult: ''
    }
  }
  componentWillMount () {
    axios({
      method: 'GET',
      url: '/api/category-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      // const size = 2
      // const items = res.data.slice(0, size)
      this.setState({ data: res.data })
    })
  }
  // state = initialState

  // handleResultSelect = (e, { result }) => this.setState({ value: result.Name })

  // handleSearchChange = (e, { value }) => {
  //   this.setState({ isLoading: true, value })

  //   setTimeout(() => {
  //     if (this.state.value.length < 1) return this.setState(initialState)

  //     const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
  //     const isMatch = result => re.test(result.Name)

  //     const filteredResults = _.reduce(
  //       this.props.categories,
  //       (Id, data, memo, Name) => {
  //         const results = _.filter(data.Nesults, isMatch)
  //         if (results.length) memo[Name] = { Name, results } // eslint-disable-line no-param-reassign

  //         return memo
  //       },
  //       {}
  //     )

  //     this.setState({
  //       isLoading: false,
  //       results: filteredResults
  //     })
  //   }, 300)
  // }
  handleMouseEnter = () => {
    this.setState({ hover: true })
  }
  handleMouseLeave = () => {
    this.setState({ hover: false })
  }

  handleChange = event => {
    const { value } = event.target
    if (value === '') {
      this.setState({ value, filterVisibility: 'hidden' })
    } else {
      this.setState({ value, filterVisibility: 'visible' })
    }
  }
  setInvisible = result => {
    this.setState({
      value: '',
      filterVisibility: 'hidden',
      SearchResult: result
    })
  }
  render () {
    const { data, value, hover } = this.state

    // const { isLoading, value, results } = this.state
    if (this.state.SearchResult !== '') {
      return <Redirect to={'/Category/' + this.state.SearchResult} />
    } else {
      return (
        <div>
          <input
            type='text'
            className='form-control'
            placeholder='Search'
            value={value}
            onChange={this.handleChange}
          />
          <span className='input-group-btn'>
            <button
              type='submit'
              // onClick={handleSearchResult}
              className='search-btn'
            >
              <span className='glyphicon glyphicon-search'>
                <span className='sr-only'>Search</span>
              </span>
            </button>
          </span>
          <FilterResults
            value={value}
            data={data}
            renderResults={results => (
              <div style={{ visibility: this.state.filterVisibility }}>
                {results.map(el => (
                  <div
                    className='search-Item'
                    onClick={() => this.setInvisible(el.Id)}
                  >
                    <span>{el.Name}</span>
                  </div>
                ))}
              </div>
            )}
          />
        </div>

        // <Grid>
        //   <Grid.Column width={8}>
        //     <Search
        //       category
        //       loading={isLoading}
        //       onResultSelect={this.handleResultSelect}
        //       onSearchChange={_.debounce(this.handleSearchChange, 500, {
        //         leading: true
        //       })}
        //       results={results}
        //       value={value}
        //     />
        //   </Grid.Column>
        // </Grid>
      )
    }
  }
}
