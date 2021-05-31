import '../../App.css'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { Grid } from 'semantic-ui-react'

const handleDragStart = e => e.preventDefault()

const items = [
  <img
    alt=''
    src={`/${'assets/img/categories/category-4.jpg'}`}
    onDragStart={handleDragStart}
  />,
  <img
    alt=''
    src={`/${'assets/img/categories/category-2.jpg'}`}
    onDragStart={handleDragStart}
  />,
  <img
    alt=''
    src={`/${'assets/img/categories/category-3.jpg'}`}
    onDragStart={handleDragStart}
  />
]
function AdsSlideShow () {
  return (
    <div style={{ marginLeft: '200px', marginTop: '100px' }}>
      <Grid columns={2} divided>
        <Grid.Row stretched>
          <Grid.Column>
            <div style={{ width: 500, marginLeft: '200px' }}>
              <AliceCarousel
                autoPlay
                autoPlayStrategy='action '
                autoPlayInterval={1000}
                animationDuration={1000}
                infinite
                disableButtonsControls
                items={items}
              />
            </div>
          </Grid.Column>
          <Grid.Column>
            <img
              alt=''
              src={`/${'assets/img/categories/category-3.jpg'}`}
              height={140}
              width={500}
            />
            <img
              alt=''
              src={`/${'assets/img/categories/category-3.jpg'}`}
              height={140}
              width={500}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default AdsSlideShow
