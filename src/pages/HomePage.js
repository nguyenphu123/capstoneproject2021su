import '../App.css'
import VerticalItemList from '../components/Item-List/VerticalItemList'
import HorizontalItemList from '../components/Item-List/HorizontalItemList'
import SaleOff from '../components/Sale-Off/SaleOff'
import { Pagination, Card, Button, Header } from 'semantic-ui-react'

function HomePage () {
  return (
    <div>
      <Header as='h1' inverted color='red'>
        Flash Deal
      </Header>

      <SaleOff />

      <VerticalItemList
        topic='New Product'
        apiUrl={'/api/product-management?sort=up&pageIndex=1&pageSize=8'}
      />
      <Button inverted color='blue' style={{ marginTop: '10px' }} fluid>
        See more...
      </Button>

      <VerticalItemList
        topic='You may like'
        apiUrl={'/api/product-management?sort=up&pageIndex=1&pageSize=8'}
      />
      <Button inverted color='blue' style={{ marginTop: '10px' }} fluid>
        See more...
      </Button>

      <section class='trend spad'>
        <div class='container'>
          <div class='row'>
            <div class='col-lg-4 col-md-4 col-sm-6'>
              <HorizontalItemList
                topic='Best Seller'
                apiUrl={
                  '/api/product-management?sort=up&pageIndex=1&pageSize=3'
                }
              />
            </div>
            <div class='col-lg-4 col-md-4 col-sm-6'>
              <HorizontalItemList
                topic='Top'
                apiUrl={
                  '/api/product-management?sort=up&pageIndex=1&pageSize=3'
                }
              />
            </div>
            <div class='col-lg-4 col-md-4 col-sm-6'>
              <HorizontalItemList
                topic='Feature'
                apiUrl={
                  '/api/product-management?sort=up&pageIndex=1&pageSize=3'
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
