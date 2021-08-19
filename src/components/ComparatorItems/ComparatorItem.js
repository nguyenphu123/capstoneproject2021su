import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'

function ComparatorItem ({ Id, Name, Price, ImageUrl, Elements }) {
  const [isLoading, setIsLoading] = useState(false)

  if (isLoading) {
    return <></>
  } else {
    return (
      <>
        <td class='image hidden-table'>
          <Link to={'/Product/' + Id} title='' class='product-image'>
            {ImageUrl.includes('http') ? (
              <img src={ImageUrl} width='75' alt='' />
            ) : (
              <img
                src={'http://13.229.97.240:5000/' + ImageUrl}
                alt='404 '
              />
            )}
          </Link>
        </td>
        <td>
          <h2 class='product-name'>
            <Link to={'/Product/' + Id}>{Name}</Link>
          </h2>
        </td>
        <td class='a-center hidden-table'>
          <div>
            <div>
              {Elements.map(({ Color, Size }) => (
                <></>
              ))}
            </div>
          </div>
        </td>

        <td class='a-right hidden-table'>
          <span class='cart-price'>
            <span class='price'>
              <NumberFormat
                value={Price}
                className='foo'
                displayType={'text'}
                thousandSeparator={true}
                prefix={''}
                renderText={(value, props) => <div {...props}>{value}</div>}
              />
            </span>
          </span>
        </td>
      </>
    )
  }
}
export default ComparatorItem
