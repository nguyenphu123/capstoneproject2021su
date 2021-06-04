import '../../App.css'
import { Link } from 'react-router-dom'
const HorizontalItem = ({ Id, Name, ImageStorages, CurrentPrice }) => (
  <div class='trend__item'>
    <div class='trend__item__pic'>
      <img alt='' src={ImageStorages[0].ImageUrl} />
    </div>
    <div class='trend__item__text'>
      <h6>
        <Link to={'/Product/' + Id}>{Name} </Link>
      </h6>
      <div class='rating'>
        <i class='fa fa-star'></i>
        <i class='fa fa-star'></i>
        <i class='fa fa-star'></i>
        <i class='fa fa-star'></i>
        <i class='fa fa-star'></i>
      </div>
      <div class='product__price'>{CurrentPrice}</div>
    </div>
  </div>
)

export default HorizontalItem
