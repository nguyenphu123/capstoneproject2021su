import { Button } from 'semantic-ui-react'

function SeeMoreButton ({ Url }) {
  function handleSubmit () {}
  return (
    <Button
      onClick={handleSubmit}
      inverted
      color='blue'
      style={{ marginTop: '10px' }}
    >
      See more...
    </Button>
  )
}

export default SeeMoreButton
