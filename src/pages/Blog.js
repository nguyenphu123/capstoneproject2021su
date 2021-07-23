import React from 'react'
import './Blog/style/App.scss'

// Components
import DesktopNav from './Blog/components/navbar/desktop-nav'
import MobileNav from './Blog/components/navbar/mobile-nav'
import Backdrop from './Blog/components/navbar/backdrop'
import Hero from './Blog/components/hero/hero'
import Portfolio from './Blog/components/portfolio/portfolio'
import Partners from './Blog/components/partners/partners'
import About from './Blog/components/about/about'
import Blog from './Blog/components/blog/blog'
import Contact from './Blog/components/contact/contact'
import Footer from './Blog/components/footer/footer'

class Blog extends React.Component {
  state = {
    userIsScrolled: false,
    mobileNavbarOpen: false
  }

  componentDidMount () {
    window.addEventListener('scroll', this.userIsScrolled)
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.userIsScrolled)
  }

  // Detect if user is scorlled down (used for add/disable extra large navbar)
  userIsScrolled = () => {
    if (window.pageYOffset > 80) {
      this.setState({ userIsScrolled: true })
    } else {
      this.setState({ userIsScrolled: false })
    }
  }
  // On closeMobileMenu click close navbar
  closeMobileMenu = () => {
    this.setState({ mobileNavbarOpen: false })
  }
  // Mobile menu handler
  mobileMenuOpen = () => {
    this.setState({ mobileNavbarOpen: true })
  }

  render () {
    // BACKDROP RENDER
    let backdrop = <Backdrop closeMobileMenu={this.closeMobileMenu} />
    if (this.state.mobileNavbarOpen) {
      backdrop = (
        <Backdrop closeMobileMenu={this.closeMobileMenu} isOpen={true} />
      )
    }
    // MOBILE NAVBAR RENDER
    let mobileNavbar = <MobileNav />
    if (this.state.mobileNavbarOpen) {
      mobileNavbar = (
        <MobileNav isOpen={true} closeMobileMenu={this.closeMobileMenu} />
      )
    }

    return (
      <div className='App'>
        {mobileNavbar}
        {backdrop}
        <DesktopNav
          userIsScrolled={this.state.userIsScrolled}
          mobileMenuOpen={this.mobileMenuOpen}
        />
        <Hero />
        <Portfolio />
        <Partners />
        <About />
        <Blog />
        <Contact />
        <Footer />
      </div>
    )
  }
}

export default Blog
