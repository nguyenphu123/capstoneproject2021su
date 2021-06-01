import '../../App.css'
import { Link } from 'react-router-dom'
const VerticalItem = ({ title, imageUrl, label, price, mix }) => (
  <div class={'col-lg-3 col-md-4 col-sm-6 mix' + mix}>
    <div class='product__item'>
      <div class='product__item__pic set-bg'>
        <img src={`/${imageUrl}`} alt='' />
        <div class={'label ' + label}>{label}</div>
        <ul class='product__hover'>
          <li>
            <a href={imageUrl} class='image-popup'>
              <span class='arrow_expand'></span>
            </a>
          </li>
          <li>
            <a href='/'>
              <span class='icon_heart_alt'></span>
            </a>
          </li>
          <li>
            <a href='/'>
              <span class='icon_bag_alt'></span>
            </a>
          </li>
        </ul>
      </div>
      <div class='product__item__text'>
        <h6>
          {' '}
          <Link to='/Product/1'>{title} </Link>
        </h6>
        <div class='rating'>
          <i class='fa fa-star'></i>
          <i class='fa fa-star'></i>
          <i class='fa fa-star'></i>
          <i class='fa fa-star'></i>
          <i class='fa fa-star'></i>
        </div>
        <div class='product__price'>{price}</div>
      </div>
    </div>
  </div>
)

export default VerticalItem
