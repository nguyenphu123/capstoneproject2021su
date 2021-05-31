import '../App.css'
import VerticalItemList from '../components/Item-List/VerticalItemList'
import HorizontalItemList from '../components/Item-List/HorizontalItemList'
import SaleOff from '../components/Sale-Off/SaleOff'

function HomePage () {
  return (
    <div>
      <VerticalItemList topic='New Product' />

      <SaleOff />
      <section class='trend spad'>
        <div class='container'>
          <div class='row'>
            <div class='col-lg-4 col-md-4 col-sm-6'>
              <HorizontalItemList topic='Best Seller' />
            </div>
            <div class='col-lg-4 col-md-4 col-sm-6'>
              <HorizontalItemList topic='Top' />
            </div>
            <div class='col-lg-4 col-md-4 col-sm-6'>
              <HorizontalItemList topic='Feature' />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
