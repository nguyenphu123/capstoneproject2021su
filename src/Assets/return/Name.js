import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Name ({ Id }) {
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/product-management/productId?productId=' + Id,
      headers: {}
    }).then(res => {
      console.log(res.data)
      setName(res.data.Name)
      setIsLoading(false)
    })
  }, [isLoading])
  if (isLoading) {
    return <>{name}</>
  } else {
    return <>{name}</>
  }
}

export default Name
