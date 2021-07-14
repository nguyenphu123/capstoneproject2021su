import React, { useEffect, useState } from 'react'
import { useParams, withRouter } from 'react-router-dom'
import axios from 'axios'

import { Link } from 'react-router-dom'

function PagnationBar ({ Name, apiUrl }) {
  const { currentPage, categoryId } = useParams()

  const [page, setPage] = useState(currentPage)
  const [numOfPage, setNumOfPage] = useState([])
  useEffect(() => {
    axios({
      method: 'GET',
      url: apiUrl
    }).then(res => {
      console.log(res)
      console.log(res.data)
      if (res.data.length < 50) {
      } else {
        const ProductPage = res.data.length / 50
        if (ProductPage === parseInt(ProductPage, 10)) {
          for (let index = 0; index < ProductPage; index++) {
            numOfPage.push({ Page: index })
          }
        } else {
          const ProductPage = Math.round(res.data.length / 50) + 1
          for (let index = 0; index < ProductPage; index++) {
            numOfPage.push({ Page: index })
          }
        }
      }
    })
  }, [])
  if (numOfPage.length === 0) {
    return <></>
  } else {
    return (
      <div className='pages'>
        <label>Page:</label>
        <ul className='pagination'>
          {currentPage === 1 ? null : (
            <li>
              <Link to={'/' + Name + '/' + currentPage - 1}>«</Link>
            </li>
          )}

          {numOfPage.map(({ Page }) => (
            <li className='active'>
              <Link to={'/' + Name + '/' + Page}>{Page}</Link>
            </li>
          ))}
          {currentPage === numOfPage.length ? null : (
            <li>
              <Link to={'/' + Name + '/' + currentPage + 1}>«</Link>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default PagnationBar
