import '../App.css'
import VerticalItemList from '../components/Item-List/VerticalItemList'
import HorizontalItemList from '../components/Item-List/HorizontalItemList'
import SaleOff from '../components/Sale-Off/SaleOff'

function HomePage () {
  return (
    <div>
      <SaleOff />

      <VerticalItemList
        topic='New Product'
        apiUrl={'/api/product-management?sort=up&pageIndex=1&pageSize=1'}
      />
      <VerticalItemList
        topic='You may like'
        apiUrl={'/api/product-management?sort=up&pageIndex=1&pageSize=1'}
      />

      <section class='trend spad'>
        <div class='container'>
          <div class='row'>
            <div class='col-lg-4 col-md-4 col-sm-6'>
              <HorizontalItemList
                topic='Best Seller'
                apiUrl={
                  '/api/product-management?sort=up&pageIndex=1&pageSize=1'
                }
              />
            </div>
            <div class='col-lg-4 col-md-4 col-sm-6'>
              <HorizontalItemList
                topic='Top'
                apiUrl={
                  '/api/product-management?sort=up&pageIndex=1&pageSize=1'
                }
              />
            </div>
            <div class='col-lg-4 col-md-4 col-sm-6'>
              <HorizontalItemList
                topic='Feature'
                apiUrl={
                  '/api/product-management?sort=up&pageIndex=1&pageSize=1'
                }
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
