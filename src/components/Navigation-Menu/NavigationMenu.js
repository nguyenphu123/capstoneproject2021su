import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import logo from '../../logo.svg';
import '../../App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Search from "../Search/Search";
import React, { Component } from "react";
class  NavigationMenu extends Component{
  
  
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
    
     
            
            
           <MDBNavbar color="indigo" dark expand="md">
       
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem nav active>
              <MDBNavLink  to="/">Home</MDBNavLink >
            </MDBNavItem>
            <MDBNavItem nav>
              <MDBNavLink  to="/">AboutUs</MDBNavLink >
            </MDBNavItem>
            <MDBNavItem nav>
              <MDBNavLink  to="/">OurStore</MDBNavLink >
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav >
                 <a>Category</a>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem ><Link to="/">Home</Link></MDBDropdownItem>
                  <MDBDropdownItem> <Link to="/Category1">Category1</Link></MDBDropdownItem>
                  <MDBDropdownItem > <Link to="/Category2">Category2</Link></MDBDropdownItem>
                  
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav >
            <MDBNavItem>
             
                 <Search/>
              
            </MDBNavItem>
           
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
           
          
//            <div class="navigationMenu">
            
//           <Search/>
//              <Dropdown title="Services" id="basic-nav-dropdown">
//            <Dropdown.Toggle variant="success" id="dropdown-basic">
//   Pages
//   </Dropdown.Toggle>
//             <Dropdown.Menu>
//             <Dropdown.Item>
//             <Link to="/">Home</Link>
//             </Dropdown.Item>
//             <Dropdown.Item>
//              <Link to="/Category1">Category1</Link>
//             </Dropdown.Item>
//                         <Dropdown.Item>
//             <Link to="/Category2">Category2</Link>
//             </Dropdown.Item>
                     
         
//              </Dropdown.Menu>
//           </Dropdown>
//           </div>
           
            
            
           
     
   
  );
}
}
export default NavigationMenu;
