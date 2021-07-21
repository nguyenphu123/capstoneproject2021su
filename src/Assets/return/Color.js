import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Header } from 'semantic-ui-react'

function Color ({ Id, Color }) {
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/product-management/productId?productId=' + Id,
      headers: {}
    }).then(res => {
      console.log(res.data)
      let check_index = res.data.Elements.findIndex(x => x.Color.Id === Color)
      if (check_index !== -1) {
        setName(res.data.Elements[check_index].Color.Name)
      }
      setIsLoading(false)
    })
  }, [isLoading])
  if (isLoading) {
    return <>{name}</>
  } else {
    return (
      <Header as='h4' color={name}>
        {name}
      </Header>
    )
  }
}

export default Color
