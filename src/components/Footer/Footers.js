import '../../App.css'
import { Button } from 'semantic-ui-react'
import { Visa, Mastercard, Paypal, AtmMomo, GrabPay } from 'react-pay-icons'

function Footers () {
  return (
    <div>
      <section class='services spad'>
        <div class='container'>
          <div class='row'>
            <div class='col-lg-3 col-md-4 col-sm-6'>
              <div class='services__item'>
                <i class='fa fa-car'></i>
                <h6>Free Shipping</h6>
                <p>For all oder over $99</p>
              </div>
            </div>
            <div class='col-lg-3 col-md-4 col-sm-6'>
              <div class='services__item'>
                <i class='fa fa-money'></i>
                <h6>Money Back Guarantee</h6>
                <p>If good have Problems</p>
              </div>
            </div>
            <div class='col-lg-3 col-md-4 col-sm-6'>
              <div class='services__item'>
                <i class='fa fa-support'></i>
                <h6>Online Support 24/7</h6>
                <p>Dedicated support</p>
              </div>
            </div>
            <div class='col-lg-3 col-md-4 col-sm-6'>
              <div class='services__item'>
                <i class='fa fa-headphones'></i>
                <h6>Payment Secure</h6>
                <p>100% secure payment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class='footer' style={{ backgroundColor: '#ffffff' }}>
        <div class='container'>
          <div class='row'>
            <div class='col-lg-4 col-md-6 col-sm-7'>
              <div class='footer__about'>
                <div class='footer__logo'>
                  <a href='/'>
                    {/* <img src='assets/img/logo.png' alt='' /> */}
                  </a>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt cilisis.
                </p>
                <div class='footer__payment'>
                  <a href='/'>
                    <Visa style={{ width: 50 }} />
                  </a>
                  <a href='/'>
                    <Mastercard style={{ width: 50 }} />
                  </a>
                  <a href='/'>
                    <Paypal style={{ width: 50 }} />
                  </a>
                  <a href='/'>
                    <AtmMomo style={{ width: 50 }} />
                  </a>
                  <a href='/'>
                    <GrabPay style={{ width: 50 }} />
                  </a>
                </div>
              </div>
            </div>
            <div class='col-lg-2 col-md-3 col-sm-5'>
              <div class='footer__widget'>
                <h6>Quick links</h6>
                <ul>
                  <li>
                    <a href='/'>About</a>
                  </li>
                  <li>
                    <a href='/'>Blogs</a>
                  </li>
                  <li>
                    <a href='/'>Contact</a>
                  </li>
                  <li>
                    <a href='/'>FAQ</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class='col-lg-2 col-md-3 col-sm-4'>
              <div class='footer__widget'>
                <h6>Account</h6>
                <ul>
                  <li>
                    <a href='/'>My Account</a>
                  </li>
                  <li>
                    <a href='/'>Orders Tracking</a>
                  </li>
                  <li>
                    <a href='/'>Checkout</a>
                  </li>
                  <li>
                    <a href='/'>Wishlist</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class='col-lg-4 col-md-8 col-sm-8'>
              <div class='footer__newslatter'>
                <h6>NEWSLETTER</h6>
                <form action='/'>
                  <input type='text' placeholder='Email' />
                  <button type='submit' class='site-btn'>
                    Subscribe
                  </button>
                </form>
                <div class='footer__social'>
                  <Button circular color='facebook' icon='facebook' />

                  <Button circular color='twitter' icon='twitter' />

                  <Button circular color='linkedin' icon='linkedin' />

                  <Button circular color='google plus' icon='google plus' />
                </div>
              </div>
            </div>
          </div>
          <div class='row'>
            <div class='col-lg-12'>
              <div class='footer__copyright__text'>
                <p>
                  Copyright &copy;{' '}
                  <script>document.write(new Date().getFullYear());</script> All
                  rights reserved | This template is made with{' '}
                  <i class='fa fa-heart' aria-hidden='true'></i> by{' '}
                  <a href='/' target='_blank'>
                    Heart
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footers
