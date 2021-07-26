import FilterResults from 'react-filter-search'
import axios from 'axios'
import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'

// const initialState = { isLoading: false, results: [], value: '' }
// const getResults = () => _.times(5, () => ({}))

export default class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      value: '',
      filterVisibility: 'none',
      hover: false,
      SearchResult: '',
      SearchId: ''
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
      this.setState({ value, filterVisibility: 'none' })
    } else {
      this.setState({ value, filterVisibility: 'inline' })
    }
  }
  setInvisible = (name, id) => {
    this.setState({
      value: name,
      filterVisibility: 'hidden'

      // SearchResult: result
    })
  }
  SearchResult = () => {
    if (this.state.value === '') {
    } else {
      this.setState({
        SearchResult: this.state.value
      })
    }
  }
  render () {
    const { data, value, hover } = this.state

    // const { isLoading, value, results } = this.state
    if (this.state.SearchResult !== '') {
      return (
        <>
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
                onClick={() => this.SearchResult()}
                className='search-btn'
              >
                <span className='glyphicon glyphicon-search'>
                  <span className='sr-only'>Search</span>
                </span>
              </button>
              <div style={{ Position: 'Absolute', zIndex: '1000' }}>
                <FilterResults
                  value={value}
                  data={data}
                  renderResults={results => (
                    <div style={{ display: this.state.filterVisibility }}>
                      {results.map(el => (
                        <div
                          className='search-Item'
                          onClick={() => this.setInvisible(el.Name, el.Id)}
                        >
                          <span>{el.Name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </div>
            </span>
          </div>
          <Redirect to={'/Search/' + this.state.SearchResult + '/1'} />
        </>
      )
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
              onClick={() => this.SearchResult()}
              className='search-btn'
            >
              <span className='glyphicon glyphicon-search'>
                <span className='sr-only'>Search</span>
              </span>
            </button>
            <div style={{ Position: 'Absolute', zIndex: '1000' }}>
              <FilterResults
                value={value}
                data={data}
                renderResults={results => (
                  <div style={{ display: this.state.filterVisibility }}>
                    {results.map(el => (
                      <div
                        className='search-Item'
                        onClick={() => this.setInvisible(el.Name, el.Id)}
                      >
                        <span>{el.Name}</span>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>
          </span>
        </div>
      )
    }
  }
}
