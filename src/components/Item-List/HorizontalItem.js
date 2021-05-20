import logo from '../../logo.svg';
import '../../App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
const HorizontalItem = ({ title, imageUrl, price }) => (
   
       <div class="trend__item">
            <div class="trend__item__pic">
            <img src={`/${imageUrl}`}  />
            </div>
            <div class="trend__item__text">
            <h6><Link to="/Product/id">{title} </Link></h6>
            <div class="rating">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            </div>
            <div class="product__price">{price}</div>
            </div>
            </div>
           
            
            
           
);

export default HorizontalItem;
