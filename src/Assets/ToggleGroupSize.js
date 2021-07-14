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
      {list.map(({ Size }) =>
        currentSize === Size.Id ? (
          <Button toggle active={true}>
            {Size.Name}
          </Button>
        ) : (
          <Button onClick={handleClick} toggle active={false}>
            >{Size.Name}
          </Button>
        )
      )}
    </Button.Group>
  )
}
export default ToggleGroupSize
