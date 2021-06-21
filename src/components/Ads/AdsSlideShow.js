import '../../App.css'
import 'react-alice-carousel/lib/alice-carousel.css'

import AliceCarousel from 'react-alice-carousel'

const handleDragStart = e => e.preventDefault()

const items = [
  <img
    style={{ objectFit: 'fill' }}
    alt=''
    src='https://shop.jaguars.com/content/ws/all/b1f77cc0-86b3-4663-957d-56fef63534ee__1600X615.jpg'
    onDragStart={handleDragStart}
  />,
  <img
    style={{ objectFit: 'fill' }}
    alt=''
    src='https://shop.jaguars.com/content/ws/all/b1f77cc0-86b3-4663-957d-56fef63534ee__1600X615.jpg'
    onDragStart={handleDragStart}
  />,
  <img
    style={{ objectFit: 'fill' }}
    alt=''
    src='https://shop.jaguars.com/content/ws/all/b1f77cc0-86b3-4663-957d-56fef63534ee__1600X615.jpg'
    onDragStart={handleDragStart}
  />
]
function AdsSlideShow () {
  return (
    <div style={{ marginTop: '150px' }}>
      <img
        style={{ objectFit: 'fill', marginTop: '10px' }}
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
    </div>
  )
}

export default AdsSlideShow
