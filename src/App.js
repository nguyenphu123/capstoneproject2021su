import './App.css'
import NavigationHeader from './components/Navigation-Menu/NavigationHeader'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import Footers from './components/Footer/Footers'
import Categories from './components/Category/Categories'
import Ads from './components/Ads/AdsSlideShow'
import ProductDetail from './pages/ProductDetail'
import LoginPage from './pages/LoginPage'
import { Switch, Route } from 'react-router-dom'
import { Widget } from 'react-chat-widget'
import ImageUploadingPage from './pages/ImageUploadingPage'
import CategoryList from './pages/CategoryList'
import ShoppingCart from './pages/ShoppingCart'
import OrderHistory from './pages/OrderHistory'
import OrderDetail from './pages/OrderDetail'
import RegistrationPage from './pages/RegistrationPage'
import 'react-chat-widget/lib/styles.css'
import { BrowserRouter } from 'react-router-dom'
function App () {
  return (
    <BrowserRouter>
      <div className='App'>
        <div className='maincontainer'>
          <NavigationHeader />
          <Switch>
            <Route path='/Login'>
              <LoginPage />
              <Footers />
            </Route>
            <Route path='/Registration'>
              <RegistrationPage />
              <Footers />
            </Route>
            <Route path='/Category/:categoryId'>
              <Ads />
              <Categories />
              <CategoryPage topic={'Category1'} />
              <Widget />
              <Footers />
            </Route>
            <Route path='/Categories'>
              <Ads />
              <CategoryList />
              <Widget />
              <Footers />
            </Route>
            <Route path='/ImageUploading'>
              <Ads />
              <Categories />
              <ImageUploadingPage />
              <Widget />
              <Footers />
            </Route>
            <Route path='/Product/:productId' exact>
              <ProductDetail />
              <Widget />
              <Footers />
            </Route>
            <Route path='/Category/:categoryId'>
              <Ads />
              <Categories />
              <CategoryPage topic={'Category2'} />
              <Widget />
              <Footers />
            </Route>
            <Route path='/OrderHistory'>
              <OrderHistory />
              <Footers />
            </Route>
            <Route path='/OrderDetail/:id'>
              <OrderDetail />
              <Footers />
            </Route>
            <Route path='/Cart'>
              <ShoppingCart />
            </Route>
            <Route path='/' exact>
              <Ads />
              <Categories />
              <HomePage />
              <Widget />
              <Footers />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
