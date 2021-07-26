import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function SeeMoreButton ({ Url }) {
  return (
    <Button
      as={Link}
      to={Url}
      inverted
      color='blue'
      fluid
      size='big'
      style={{ marginTop: '10px' }}
    >
      See more...
    </Button>
  )
}

export default SeeMoreButton
