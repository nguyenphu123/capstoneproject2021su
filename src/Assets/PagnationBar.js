import React, { useEffect, useState } from 'react'
import { useParams, withRouter } from 'react-router-dom'

import { Link } from 'react-router-dom'

function PagnationBar ({ apiUrl }) {
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
      for (let index = 0; index < res.data.length; index++) {
        numOfPage.push({ Page: index })
      }
    })
  }, [])

  return (
    <div className='pages'>
      <label>Page:</label>
      <ul className='pagination'>
        {currentPage === 1 ? null : (
          <li>
            <Link to={'/Category/' + categoryId + '/' + currentPage - 1}>
              «
            </Link>
          </li>
        )}

        {numOfPage.map(({ Page }) => (
          <li className='active'>
            <Link to={'/Category/' + categoryId + '/' + Page}>{Page}</Link>
          </li>
        ))}
        {currentPage === numOfPage.length ? null : (
          <li>
            <Link to={'/Category/' + categoryId + '/' + currentPage + 1}>
              «
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default PagnationBar
