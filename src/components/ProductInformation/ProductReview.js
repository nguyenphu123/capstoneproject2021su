import 'react-image-gallery/styles/css/image-gallery.css'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Title from '../../Assets/Title'

import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// import InputSpinner from 'react-bootstrap-input-spinner'
// import ImageGallery from 'react-image-gallery'
// import { useDispatch, useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'
import {
  Comment,
  Grid,
  Header,
  Rating,
  Tab,
  List,
  Form
} from 'semantic-ui-react'

function ProductReview ({}) {
  return (
    <div id='productTabContent' class='tab-content'>
      <div class='tab-pane fade in active' id='product_tabs_description'>
        <div>
          Average Rating:
          <Rating
            maxRating={5}
            defaultRating={4.5}
            icon='star'
            size='massive'
          />
          <br />
          <br />
          Rate this product:
          <Rating maxRating={5} defaultRating={0} icon='star' size='massive' />
          <br />
          <br />
        </div>
      </div>
    </div>
  )
}
export default ProductReview
