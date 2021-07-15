import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import ToggleButtonSize from './ToggleButtonSize'
function ToggleGroupColor ({ list, currentColor, onChangeColor }) {
  const [thisColor, setThisColor] = useState(currentColor)
  function handleClick (value) {
    setThisColor(value)
    onChangeColor(value)
  }
  console.log(list)
  return (
    <Button.Group>
      {list.map(({ Name, Id }) =>
        currentColor === Id ? (
          <Button color={Name} toggle active={true}>
            {Name}
          </Button>
        ) : (
          <Button color={Name} onClick={handleClick} toggle active={false}>
            >{Name}
          </Button>
        )
      )}
    </Button.Group>
  )
}

export default ToggleGroupColor
