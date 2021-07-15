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
      let result = res.data
      if (this.props.colorId !== '') {
        result = res.data.filter(x =>
          x.Elements.findIndex(item => item.Color.Id === this.props.colorId)
        )
      }
      if (this.props.categoryId !== '') {
        result = res.data.filter(x => x.CategoryId === this.props.categoryId)
      }
      if (this.props.sizeId !== '') {
        result = res.data.filter(x =>
          x.Elements.findIndex(item => item.Size.Id === this.props.sizeId)
        )
      }
      if (this.props.tagId !== '') {
        result = res.data.filter(x =>
          x.Tags.findIndex(item => item.Id === this.props.tagId)
        )
      }

      if (result.length < 50) {
      } else {
        const ProductPage = result.length / 50
        if (ProductPage === parseInt(ProductPage, 10)) {
          for (let index = 0; index < ProductPage; index++) {
            numOfPage.push({ Page: index })
          }
        } else {
          const ProductPage = Math.round(result.length / 50) + 1
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
