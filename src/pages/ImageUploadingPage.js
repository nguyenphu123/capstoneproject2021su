import { Button, Header, Icon, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import React from 'react'
import ImageUploading from 'react-images-uploading'
import '../App.css'

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
          <Segment placeholder>
            <Header icon>
              Upload your image here
              <div className='upload__image-wrapper'>
                {imageList.map((image, index) => (
                  <div key={index} className='image-item'>
                    <img src={image.data_url} alt='' />
                    <div className='image-item__btn-wrapper'>
                      <Button
                        inverted
                        color='blue'
                        style={{ marginTop: '10px' }}
                        onClick={() => onImageUpdate(index)}
                      >
                        Update
                      </Button>
                      <Button
                        inverted
                        color='blue'
                        style={{ marginTop: '10px' }}
                        onClick={() => onImageRemove(index)}
                      >
                        Remove
                      </Button>
                      <Button
                        as={Link}
                        to={'/Category/12345678-1234-1243-1234-123456789012/1'}
                        inverted
                        color='blue'
                        style={{ marginTop: '10px' }}
                      >
                        Search
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Header>
            <Button
              fluid
              icon='upload'
              style={isDragging ? { color: 'red' } : null}
              onClick={onImageUpload}
              {...dragProps}
            ></Button>
          </Segment>
        )}
      </ImageUploading>
    </div>
  )
}

export default ImageUploadingPage
