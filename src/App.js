import 'react-chat-widget/lib/styles.css'

import Fab from '@material-ui/core/Fab'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import NavigationIcon from '@material-ui/icons/Navigation'
import { Widget } from 'react-chat-widget'
import FadeIn from 'react-fade-in'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Ads from './components/Ads/AdsSlideShow'
import Footers from './components/Footer/Footers'
import NavigationHeader from './components/Navigation-Menu/NavigationHeader'
import CategoryList from './pages/CategoryList'
import CategoryPage from './pages/CategoryPage'
import HomePage from './pages/HomePage'
import ImageUploadingPage from './pages/ImageUploadingPage'
import LoginPage from './pages/LoginPage'
import OrderDetail from './pages/OrderDetail'
import OrderHistory from './pages/OrderHistory'
import PaymentConfirm from './pages/PaymentConfirm'
import ProductDetail from './pages/ProductDetail'
import Profile from './pages/Profile'
import RegistrationPage from './pages/RegistrationPage'
import ShoppingCart from './pages/ShoppingCart'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1)
      }
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    }
  })
)

function App () {
  const classes = useStyles()

  return (
    <FadeIn>
      <BrowserRouter>
        <Switch>
          <Route path='/Registration'>
            <NavigationHeader />

            <RegistrationPage />
          </Route>
          <Route path='/Category/:categoryId'>
            <NavigationHeader />

            <Ads />

            <CategoryPage topic={'Category1'} />
            <Widget />
          </Route>
          <Route path='/Categories'>
            <NavigationHeader />

            <Ads />
            <CategoryList />
            <Widget />
          </Route>
          <Route path='/ImageUploading'>
            <NavigationHeader />

            <Ads />
            <ImageUploadingPage />
            <Widget />
          </Route>
          <Route path='/Product/:productId' exact>
            <NavigationHeader />

            <ProductDetail />
            <Widget />
          </Route>
          <Route path='/Profille/:userId'>
            <NavigationHeader />

            <Profile />
            <Widget />
          </Route>
          <Route path='/OrderHistory'>
            <NavigationHeader />

            <OrderHistory />
            <Widget />
          </Route>
          <Route path='/OrderDetail/:id'>
            <NavigationHeader />

            <OrderDetail />
          </Route>
          <Route path='/Cart'>
            <NavigationHeader />

            <ShoppingCart />
            <Widget />
          </Route>
          <Route path='/PaymentInfo'>
            <NavigationHeader />

            <PaymentConfirm />
            <Widget />
          </Route>

          <Route path='/' exact>
            <NavigationHeader />

            <HomePage />
            <Widget />
          </Route>
        </Switch>
        <Footers />
      </BrowserRouter>
    </FadeIn>
  )
}

export default App
