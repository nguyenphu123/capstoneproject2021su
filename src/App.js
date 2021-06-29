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
        <NavigationHeader />

        <Switch>
          {/* <Route path='/Login'>
            <LoginPage />
          </Route> */}
          <Route path='/Registration'>
            <RegistrationPage />
          </Route>
          <Route path='/Category/:categoryId'>
            <Ads />

            <CategoryPage topic={'Category1'} />
            <Widget />
          </Route>
          <Route path='/Categories'>
            <Ads />
            <CategoryList />
            <Widget />
          </Route>
          <Route path='/ImageUploading'>
            <Ads />
            <ImageUploadingPage />
            <Widget />
          </Route>
          <Route path='/Product/:productId' exact>
            <ProductDetail />
            <Widget />
          </Route>
          <Route path='/Profille/:userId'>
            <Profile />
            <Widget />
          </Route>
          <Route path='/OrderHistory'>
            <OrderHistory />
            <Widget />
          </Route>
          <Route path='/OrderDetail/:id'>
            <OrderDetail />
          </Route>
          <Route path='/Cart'>
            <ShoppingCart />
            <Widget />
          </Route>
          <Route path='/PaymentInfo'>
            <PaymentConfirm />
            <Widget />
          </Route>

          <Route path='/' exact>
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
