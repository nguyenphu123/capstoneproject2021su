import '../App.css'

import Button from '@material-ui/core/Button'
import React from 'react'
import ImageUploading from 'react-images-uploading'

function ImageUploadingPage () {
  const [images, setImages] = React.useState([])
  const maxNumber = 1
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex)
    setImages(imageList)
  }

  return (
    <div style={{ marginTop: '50px' }}>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey='data_url'
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className='upload__image-wrapper'>
            <Button
              style={isDragging ? { color: 'red' } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </Button>
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className='image-item'>
                <img src={image.data_url} alt='' width='1000' />
                <div className='image-item__btn-wrapper'>
                  <Button onClick={() => onImageUpdate(index)}>Update</Button>
                  <Button onClick={() => onImageRemove(index)}>Remove</Button>
                  <a href='/Category1'>Search</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  )
}

export default ImageUploadingPage
