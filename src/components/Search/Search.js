import logo from '../../logo.svg'
import '../../App.css'
import FilterResults from 'react-filter-search'

import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'

function Search () {
  const [categorylist, setCategorylist] = useState([])
  const [search, setSearch] = useState(' ')
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/category-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      setCategorylist(res.data)
    })
  }, [categorylist])

  function Search (event) {
    const { value } = event.target
    setSearch(value)

    setSearchResult(categorylist.find(category => category.Name === search))
  }

  return (
    // <Search
    //   loading={loading}
    //   onResultSelect={(e, data) =>
    //     // dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
    //   }
    //   onSearchChange={handleSearchChange}
    //   results={results}
    //   value={value}
    // />

    // <MDBCol md='6'>
    //   <div className='input-group md-form form-sm form-1 pl-0'>
    //     <input
    //       className='form-control my-0 py-1'
    //       type='text'
    //       placeholder='Search'
    //       aria-label='Search'
    //     />
    //     <div className='input-group-prepend'>
    //       <span className='input-group-text purple lighten-3' id='basic-text1'>
    //         <MDBIcon className='text-white' icon='search' />
    //       </span>
    //     </div>
    //   </div>
    // </MDBCol>
    <div>
      <input type='text' value={search} onChange={handleChange} />
      <SearchResults
        value={search}
        data={searchResult}
        renderResults={results => (
          <div>
            {results.map(el => (
              <div>
                <span>{el.Name}</span>
              </div>
            ))}
          </div>
        )}
      />
    </div>
  )
}

export default Search
