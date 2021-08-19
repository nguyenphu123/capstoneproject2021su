import { Button } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import ImageUploading from 'react-images-uploading'
import axios from 'axios'
import VerticalItemListImageSearch from '../components/Item-List/VerticalItemListImageSearch'
import { Segment, Header } from 'semantic-ui-react'

function ImageUploadingPage () {
  const [images, setImages] = React.useState(null)
  const [results, setResults] = React.useState([])

  const maxNumber = 1
  // const onChange = e => {
  //   // data for submit
  //   // console.log(event.target.files)
  //   // setImages(event.target.files[0])
  // }
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit

    setImages(imageList)
  }

  function onSearchImage (img) {
    let fd = new FormData()
    console.log(img)
    fd.append('query_img', img)

    axios({
      method: 'POST',
      url: 'http://13.229.97.240:5000/',
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
      <div>
        <>
          <section className='main-container col2-left-layout bounceInUp animated'>
            <div className='container'>
              <div className='row'>
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
                                  onClick={() => onSearchImage(image.file)}
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
                </ImageUploading>

                <div className='col-main col-sm-9 col-sm-push-3 product-list'>
                  <div className='pro-coloumn'>
                    <article>
                      <VerticalItemListImageSearch
                        topic='Super deals'
                        ImageList={results}
                        apiUrl={
                          '/api/product-management?sort=up&pageIndex=1&pageSize=500'
                        }
                      />
                    </article>
                  </div>
                </div>
                <aside className='col-left sidebar col-sm-3 col-xs-12 col-sm-pull-9 wow bounceInUp animated'>
                  {/* <!-- BEGIN SIDE-NAV-CATEGORY --> */}
                  <div className='side-nav-categories'>
                    <div className='block-title'> Search result </div>

                    {/* <!--block-title--> */}

                    {/* <!-- BEGIN BOX-CATEGORY --> */}

                    {/* <!--box-content box-category--> */}
                  </div>

                  {/* <!--side-nav-categories--> */}
                </aside>
              </div>
            </div>
          </section>
        </>
      </div>
    </>
  )
}

export default ImageUploadingPage
