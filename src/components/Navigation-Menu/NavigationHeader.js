import { Dropdown, NavDropdown, MenuItem } from "react-bootstrap";
import logo from '../../logo.svg';
import '../../App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import NavigationMenu from "./NavigationMenu";
function NavigationHeader() {
  
  

  return (
    
     <div >
        <div id="preloder">
           
            </div>
            
            
            <header class="header">
            <div class="container-fluid">
            <div class="row">
            <div class="col-xl-3 col-lg-2">
            
            <div class="header__logo">
           
            <a href="/"><img src="assets/img/logo.png" alt="" /></a>
            
            </div>
            
            </div>
            
            <div class="col-xl-6 col-lg-7">
            
            <nav class="header__menu">
            
           
          
         <NavigationMenu/>
            </nav>
            
            </div>
            <div class="col-lg-3">
            <div class="header__right">
            <div class="header__right__auth">
            
            <a href="/Login">Login</a>
            <a href="#">Register</a>
            </div>
            <ul class="header__right__widget">
           
            <li><a href="#"><span class="icon_heart_alt"></span>
            <div class="tip">2</div>
            </a></li>
            <li><a href="#"><span class="icon_bag_alt"></span>
            <div class="tip">2</div>
            </a></li>
            </ul>
            
            </div>
            
            </div>
            
            </div>
            
            <div class="canvas__open">
            
            <i class="fa fa-bars"></i>
            
            </div>
            
            </div>
            
            </header>
            
            
           
      </div>
   
  );
}

export default NavigationHeader;
