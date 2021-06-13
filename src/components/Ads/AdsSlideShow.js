import '../../App.css'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { Grid } from 'semantic-ui-react'

const handleDragStart = e => e.preventDefault()

const items = [
  <img
    alt=''
    src='https://shop.jaguars.com/content/ws/all/b1f77cc0-86b3-4663-957d-56fef63534ee__1600X615.jpg'
    onDragStart={handleDragStart}
  />,
  <img
    alt=''
    src='https://shop.jaguars.com/content/ws/all/b1f77cc0-86b3-4663-957d-56fef63534ee__1600X615.jpg'
    onDragStart={handleDragStart}
  />,
  <img
    alt=''
    src='https://shop.jaguars.com/content/ws/all/b1f77cc0-86b3-4663-957d-56fef63534ee__1600X615.jpg'
    onDragStart={handleDragStart}
  />
]
function AdsSlideShow () {
  return (
    <>
      <img
        alt=''
        src='https://shop.jaguars.com/content/ws/all/d69ff630-c90a-4b2a-b5b8-8e95fffc1ea5__1346X60.jpg'
      />

      <div style={{ marginTop: '10px' }}>
        <div>
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
      </div>
    </>
  )
}

export default AdsSlideShow
