import './App.css'
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

        <div
          className='App'
          style={{
            width: '70%',
            marginLeft: '250px'
          }}
        >
          <div className='maincontainer'>
            <Fab variant='extended'>
              <NavigationIcon className={classes.extendedIcon} />
              Navigate
            </Fab>

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
                <ImageUploadingPage />
                <Widget />
                <Footers />
              </Route>
              <Route path='/Product/:productId' exact>
                <ProductDetail />
                <Widget />
                <Footers />
              </Route>
              <Route path='/Profille/:userId'>
                <Profile />
                <Widget />
                <Footers />
              </Route>
              <Route path='/OrderHistory'>
                <OrderHistory />
                <Widget />
                <Footers />
              </Route>
              <Route path='/OrderDetail/:id'>
                <OrderDetail />
                <Footers />
              </Route>
              <Route path='/Cart'>
                <ShoppingCart />
                <Widget />
                <Footers />
              </Route>
              <Route path='/PaymentInfo'>
                <PaymentConfirm />
                <Widget />
                <Footers />
              </Route>

              <Route path='/' exact>
                <Ads />
                {/* <Categories /> */}
                <HomePage />
                <Widget />
                <Footers />
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </FadeIn>
  )
}

export default App
