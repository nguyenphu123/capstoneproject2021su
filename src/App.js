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
import Profile from './pages/Profile'
import PaymentConfirm from './pages/PaymentConfirm'
import RegistrationPage from './pages/RegistrationPage'
import 'react-chat-widget/lib/styles.css'
import { BrowserRouter } from 'react-router-dom'
import FadeIn from 'react-fade-in'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import FavoriteIcon from '@material-ui/icons/Favorite'
import NavigationIcon from '@material-ui/icons/Navigation'
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
