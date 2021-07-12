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
      <Button toggle active={true}>
        42
      </Button>
      <Button toggle active={false}>
        43
      </Button>

      {/* {list.map(({ Size }) =>
        currentSize === Size ? (
          <Button toggle active={true}>
            {Size}
          </Button>
        ) : (
          <Button onClick={handleClick} toggle active={false}>
            >{Size}
          </Button>
        )
      )} */}
    </Button.Group>
  )
}
export default ToggleGroupSize
