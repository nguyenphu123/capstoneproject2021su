
import './App.css';
import NavigationHeader from "./components/Navigation-Menu/NavigationHeader";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import Footers from "./components/Footer/Footers";
import Categories from "./components/Category/Categories";
import Ads from "./components/Ads/AdsSlideShow";
import ProductDetail from "./pages/ProductDetail";
import {
 
  Switch,
  Route
  
} from "react-router-dom";
import { Widget } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';
function App() {
  return (
     
    <div className="App">
     <div className="maincontainer">

      
       <NavigationHeader />
       <Ads/>
           <Categories />
         <Switch>
          <Route  path="/Category1"   render={()=><CategoryPage topic={"Category1"}/>}/>
          <Route  path="/Product/:id"    component={ProductDetail}/>
          <Route  path="/Category2"   render={()=><CategoryPage topic={"Category2"}/>}/>
         <Route  path="/"  exact  component={HomePage}/>         
        </Switch>
         <Widget/>
      <Footers />
        
      </div>
    </div>
 
  );
}

export default App;
