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
      {list.map(({ Color }) =>
        currentColor === Color.Id ? (
          <Button color={Color.Name} toggle active={true}>
            {Color.Name}
          </Button>
        ) : (
          <Button
            color={Color.Name}
            onClick={handleClick}
            toggle
            active={false}
          >
            >{Color.Name}
          </Button>
        )
      )}
    </Button.Group>
  )
}

export default ToggleGroupColor
