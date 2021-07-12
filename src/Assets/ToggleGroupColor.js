import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import ToggleButtonSize from './ToggleButtonSize'
function ToggleGroupColor ({ list, currentColor, onChangeColor }) {
  const [thisColor, setThisColor] = useState(currentColor)
  function handleClick (value) {
    setThisColor(value)
    onChangeColor(value)
  }

  return (
    <Button.Group>
      <Button color='red' toggle active={true}>
        red
      </Button>
      <Button color='grey' toggle active={false}>
        grey
      </Button>
      <Button color='black' toggle active={false}>
        black
      </Button>

      {/* {list.map(({ Color }) =>
        currentColor === Color ? (
          <Button color={Color} toggle active={true}>
            {Color}
          </Button>
        ) : (
          <Button color={Color} onClick={handleClick} toggle active={false}>
            >{Color}
          </Button>
        )
      )} */}
    </Button.Group>
  )
}

export default ToggleGroupColor
