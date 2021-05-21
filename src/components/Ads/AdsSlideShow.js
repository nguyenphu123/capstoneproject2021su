import logo from '../../logo.svg'
import '../../App.css'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

const handleDragStart = e => e.preventDefault()

const items = [
  <img
    src={`/${'assets/img/categories/category-4.jpg'}`}
    onDragStart={handleDragStart}
  />,
  <img
    src={`/${'assets/img/categories/category-2.jpg'}`}
    onDragStart={handleDragStart}
  />,
  <img
    src={`/${'assets/img/categories/category-3.jpg'}`}
    onDragStart={handleDragStart}
  />
]
function AdsSlideShow () {
  return (
    <AliceCarousel
      autoPlay
      autoPlayStrategy='action '
      autoPlayInterval={1000}
      animationDuration={1000}
      infinite
      disableButtonsControls
      items={items}
    />
  )
}

export default AdsSlideShow
