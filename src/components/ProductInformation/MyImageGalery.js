import React, { Component } from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

import { SideBySideMagnifier } from 'react-image-magnifiers'

class MyImageGalery extends Component {
  state = {
    alwaysInPlace: true,
    overlayOpacity: 0.6,
    switchSides: false,
    fillAvailableSpace: false,
    fillAlignTop: false,
    fillGapLeft: 0,
    fillGapRight: 10,
    fillGapTop: 10,
    fillGapBottom: 10
  }

  handleBoolChange = key => e => {
    const value = Boolean(e.target.value)
    this.setState(() => ({ [key]: value }))
  }

  handleNumberChange = key => e => {
    const value = Number(e.target.value)
    this.setState(() => ({ [key]: value }))
  }

  myRenderItem (item) {
    const {
      alwaysInPlace,
      overlayOpacity,
      switchSides,
      fillAvailableSpace,
      fillAlignTop,
      fillGapLeft,
      fillGapRight,
      fillGapTop,
      fillGapBottom
    } = this.state

    const { image, largeImage } = this.props

    console.log(item.original)
    return (
      <div className='flex'>
        <SideBySideMagnifier
          className='input-position'
          style={{ order: switchSides ? '1' : '0', zIndex: '100000px' }}
          imageSrc={item.original}
          largeImageSrc={item.original}
          alwaysInPlace={alwaysInPlace}
          overlayOpacity={overlayOpacity}
          switchSides={switchSides}
          zoomPosition='bottom'
          inPlaceMinBreakpoint={641}
          fillAvailableSpace={fillAvailableSpace}
          fillAlignTop={fillAlignTop}
          fillGapTop={fillGapTop}
          fillGapRight={fillGapRight}
          fillGapBottom={fillGapBottom}
          fillGapLeft={fillGapLeft}
          zoomContainerBorder='1px solid #ccc'
          zoomContainerBoxShadow='0 4px 8px rgba(0,0,0,.5)'
        />
        {/* <SideExampleControls
          handleBoolChange={this.handleBoolChange}
          handleNumberChange={this.handleNumberChange}
          enableFillControls={fillAvailableSpace}
        /> */}
      </div>
    )
  }
  render () {
    const properties = {
      useBrowserFullscreen: false,
      showPlayButton: false,
      renderItem: this.myRenderItem.bind(this),
      items: this.props.items
    }
    console.log(this.props.items)
    return (
      <ImageGallery
        // renderItem={<MyReactImageMagnify />}
        {...properties}
      />
    )
  }
}

export default MyImageGalery
