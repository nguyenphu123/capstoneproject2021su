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

import 'react-chat-widget/lib/styles.css'
function App () {
  return (
    <div className='App'>
      <div className='maincontainer'>
        <NavigationHeader />
        <Switch>
          <Route path='/Login' component={LoginPage} />
          <Route path='/Category1'>
            <Ads />
            <Categories />
            <CategoryPage topic={'Category1'} />
            <Widget />
            <Footers />
          </Route>
          <Route path='/Product/:id'>
            <ProductDetail />
          </Route>
          <Route path='/Category2'>
            <Ads />
            <Categories />
            <CategoryPage topic={'Category2'} />
            <Widget />
            <Footers />
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
  )
}

export default App
