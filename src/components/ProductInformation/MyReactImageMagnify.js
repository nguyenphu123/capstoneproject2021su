import React, { Component } from 'react'

import ReactImageMagnify from 'react-image-magnify'
import { withStyles } from '@material-ui/core/styles'


const styles = theme => ({
  root: {}
})

class MyReactImageMagnify extends Component {
  render () {
    return (
      <div className='fluid'>
        <div className='fluid__image-container'>
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: 'Wristwatch by Ted Baker London',
                isFluidWidth: true,
                src: 'https://placeimg.com/640/480/any'
              },
              largeImage: {
                src: 'https://placeimg.com/640/480/any',
                width: 640,
                height: 480
              },
              enlargedImagePortalId: 'myPortal'
            }}
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(MyReactImageMagnify)
