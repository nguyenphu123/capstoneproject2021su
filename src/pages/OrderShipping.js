// import Table from '@material-ui/core/Table'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

function OrderShipping ({ props }) {
  const [history, setHistory] = useState('')

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/ship-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      let result = res.data.findIndex(item => item.OrderId === props)
      if (result !== -1) {
        setHistory(res.data[result].ShipStatus)
      }
      setIsLoading(false)
    })
  }, [isLoading])
  if (isLoading) {
    return <></>
  } else {
    return <div>{history}</div>
  }
}
export default OrderShipping
