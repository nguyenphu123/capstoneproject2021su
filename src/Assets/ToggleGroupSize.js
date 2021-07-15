import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import ToggleButtonSize from './ToggleButtonSize'
function ToggleGroupSize ({ list, currentSize, onChangeSize }) {
  const [thisSize, setThisSize] = useState(currentSize)
  function handleClick (value) {
    setThisSize(value)
    onChangeSize(value)
  }

  return (
    <Button.Group>
      {list.map(({ Name, Id }) =>
        currentSize === Id ? (
          <Button toggle active={true}>
            {Name}
          </Button>
        ) : (
          <Button onClick={handleClick} toggle active={false}>
            >{Name}
          </Button>
        )
      )}
    </Button.Group>
  )
}
export default ToggleGroupSize
