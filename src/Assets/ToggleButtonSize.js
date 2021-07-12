import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'

const ToggleButton = ({ Size, currentSize }) => <Button toggle>{Size}</Button>

export default ToggleButton
