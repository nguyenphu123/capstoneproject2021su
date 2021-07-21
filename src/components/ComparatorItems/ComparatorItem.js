import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'

import { Form, Radio, Header } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify'

function ComparatorItem ({ Id, Name, Price, ImageUrl, Elements }) {
  const [isLoading, setIsLoading] = useState(false)

  if (isLoading) {
    return <></>
  } else {
    return (
      <>
        <td class='image hidden-table'>
          <Link to={'/Product/' + Id} title='' class='product-image'>
            <img src={ImageUrl} width='75' alt='' />
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
