import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Size ({ Id, Size }) {
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/product-management/productId?productId=' + Id,
      headers: {}
    }).then(res => {
      console.log(res.data)
      let check_index = res.data.Elements.findIndex(x => x.Size.Id === Size)
      if (check_index !== -1) {
        setName(res.data.Elements[check_index].Size.Name)
      }
      setIsLoading(false)
    })
  }, [isLoading])
  if (isLoading) {
    return <>{name}</>
  } else {
    return <>{name}</>
  }
}

export default Size
