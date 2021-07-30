import { Button } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
// import ImageUploading from 'react-images-uploading'
import axios from 'axios'
import VerticalItemListImageSearch from '../components/Item-List/VerticalItemListImageSearch'

function ImageUploadingPage () {
  const [images, setImages] = React.useState(null)
  const [results, setResults] = React.useState([])

  const maxNumber = 1
  const onChange = e => {
    // data for submit
    console.log(event.target.files[0])
    setImages(event.target.files[0])
  }
  function onSearchImage () {
    let fd = new FormData()
    console.log(images)
    fd.append('query_img', images)

    axios({
      method: 'POST',
      url: 'http://18.142.44.6:5000/',
      Header: {
        'Content-Type': 'multipart/form-data'
      },
      data: fd
    }).then(res => {
      console.log(res.data)
      setResults(res.data)
    })
  }
  useEffect(() => {
    setResults(results => results)
  }, [results])

  return (
    <>
      <div
        style={{
          marginTop: '50px',
          marginLeft: '340px',
          marginBottom: '100px'
        }}
      >
        <input type='file' onChange={onChange} />
        {images ? (
          <div>
            <h2>File Details:</h2>

            <p>File Name: {images.name}</p>

            <p>File Type: {images.type}</p>

            <p>
              Last Modified:
              {images.lastModifiedDate.toDateString()}
            </p>
          </div>
        ) : (
          <div>
            <br />
            <h4>Choose before Pressing the Upload button</h4>
          </div>
        )}
        <Button
          fluid
          onClick={onSearchImage}
          // as={Link}
          // to={'/Category/12345678-1234-1243-1234-123456789012/1'}
          inverted
          color='blue'
          style={{ marginTop: '10px' }}
        >
          Search
        </Button>
        <VerticalItemListImageSearch
          topic='Super deals'
          ImageList={results}
          apiUrl={'/api/product-management?sort=up&pageIndex=1&pageSize=500'}
        />

        {/* <ImageUploading
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
                        fluid
                        color='blue'
                        style={{ marginTop: '10px' }}
                        onClick={() => onImageUpdate(index)}
                      >
                        Update
                      </Button>
                      <Button
                        fluid
                        inverted
                        color='blue'
                        style={{ marginTop: '10px' }}
                        onClick={() => onImageRemove(index)}
                      >
                        Remove
                      </Button>
                      <Button
                        fluid
                        onClick={onSearchImage}
                        // as={Link}
                        // to={'/Category/12345678-1234-1243-1234-123456789012/1'}
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
      </ImageUploading> */}
      </div>
    </>
  )
}

export default ImageUploadingPage
