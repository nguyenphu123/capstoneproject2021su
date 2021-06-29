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

function ProductReview ({ Comments }) {
  return (
    <div id='productTabContent' class='tab-content'>
      <div class='tab-pane fade in active' id='product_tabs_description'>
        <div class='std'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            fringilla augue nec est tristique auctor. Donec non est at libero
            vulputate rutrum. Morbi ornare lectus quis justo gravida semper.
            Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla.
            Donec a neque libero. Pellentesque aliquet, sem eget laoreet
            ultrices, ipsum metus feugiat sem, quis fermentum turpis eros eget
            velit. Donec ac tempus ante. Fusce ultricies massa massa. Mauris vel
            tellus non nunc mattis lobortis. vulputate adipiscing cursus eu,
            suscipit id nulla. Donec a neque libero. Pellentesque aliquet, sem
            eget laoreet ultrices, ipsum metus feugiat sem, quis fermentum
            turpis eros eget velit. Donec ac tempus ante.
          </p>
          <img alt='' src='images/custom-img2.jpg' style={{ float: 'right' }} />
          <p>
            Nunc facilisis sagittis ullamcorper. Proin lectus ipsum, gravida et
            mattis vulputate, tristique ut lectus. Sed et lorem nunc. Vestibulum
            ante ipsum primis in faucibus orci luctus et ultrices posuere
            cubilia Curae; Aenean eleifend laoreet congue. Vivamus adipiscing
            nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. Integer enim purus, posuere at ultricies eu,
            placerat a felis. Suspendisse aliquet urna pretium eros convallis
            interdum. Quisque in arcu id dui vulputate mollis eget non arcu.
            Aenean et nulla purus. Mauris vel tellus non nunc mattis lobortis.
            vulputate adipiscing cursus eu, suscipit id nulla. Donec a neque
            libero. Pellentesque aliquet, sem eget laoreet ultrices, ipsum metus
            feugiat sem, quis fermentum turpis eros eget velit. Donec ac tempus
            ante. Fusce ultricies massa massa. Fusce aliquam, purus eget
            sagittis vulputate, sapien libero hendrerit est, vulputate
            adipiscing cursus eu, suscipit id nulla. Donec a neque libero.
            Pellentesque aliquet, sem eget laoreet ultrices, ipsum metus feugiat
            sem, quis fermentum turpis eros eget velit. Donec ac tempus ante.
            Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis
            vulputate, sapien libero hendrerit.
          </p>
          <ul>
            <li>
              <strong>Mauris vel tellus non nunc mattis lobortis</strong>
            </li>
            <li>
              <strong>Suspendisse aliquet urna pretium eros convallis</strong>
            </li>
            <li>
              Vestibulum ante ipsum
              <strong>primis in faucibus</strong>
            </li>
            <li>
              <strong>Fusce ultricies massa massa</strong>
            </li>
          </ul>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            fringilla augue nec est tristique auctor. Donec non est at libero
            vulputate rutrum. Morbi ornare lectus quis justo gravida semper.
            Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla.
            Donec a neque libero. Pellentesque aliquet, sem eget laoreet
            ultrices, ipsum metus feugiat sem, quis fermentum turpis eros eget
            velit. Donec ac tempus ante. Fusce ultricies massa massa. Mauris vel
            tellus non nunc mattis lobortis. vulputate adipiscing cursus eu,
            suscipit id nulla. Donec a neque libero. Pellentesque aliquet, sem
            eget laoreet ultrices, ipsum metus feugiat sem, quis fermentum
            turpis eros eget velit. Donec ac tempus ante.
          </p>
        </div>
      </div>
      <div class='tab-pane fade' id='product_tabs_tags'>
        <div class='box-collateral box-tags'>
          <div class='tags'>
            <form id='addTagForm' action='#' method='get'>
              <div class='form-add-tags'>
                <div class='input-box'>
                  <input
                    class='input-text'
                    name='productTagName'
                    id='productTagName'
                    type='text'
                    value='enter your tags'
                  />
                  <button
                    type='button'
                    title='Add Tags'
                    class=' button btn-add'
                    onClick='submitTagForm()'
                  >
                    <span>Add Tags</span>
                  </button>
                </div>
                {/* <!--input-box--> */}
              </div>
            </form>
          </div>
          {/* <!--tags--> */}
          <p class='note'>
            Use spaces to separate tags. Use single quotes (') for phrases.
          </p>
        </div>
      </div>
      <div class='tab-pane fade in' id='reviews_tabs'>
        <div class='woocommerce-Reviews'>
          <div>
            <h2 class='woocommerce-Reviews-title'>
              2 reviews for
              <span>Bacca Bucci Men's Running Shoes</span>
            </h2>
            <ol class='commentlist'>
              <li class='comment'>
                <div>
                  <img
                    alt=''
                    src='images/member1.png'
                    class='avatar avatar-60 photo'
                  />
                  <div class='comment-text'>
                    <div class='ratings'>
                      <div class='rating-box'>
                        <div style={{ width: '100%' }} class='rating'></div>
                      </div>
                    </div>
                    <p class='meta'>
                      <strong>John Doe</strong>
                      <span>–</span> April 19, 2018
                    </p>
                    <div class='description'>
                      <p>
                        Vivamus magna justo, lacinia eget consectetur sed,
                        convallis at tellus. Nulla quis lorem ut libero
                        malesuada feugiat. Proin eget tortor risus. Donec rutrum
                        congue leo eget malesuada. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit.
                      </p>
                      <p>
                        Donec sollicitudin molestie malesuada. Vivamus suscipit
                        tortor eget felis porttitor volutpat. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit. Nulla quis lorem
                        ut libero malesuada feugiat. Vivamus magna justo,
                        lacinia eget consectetur sed, convallis at tellus.
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              {/* <!-- #comment-## --> */}
              <li class='comment'>
                <div>
                  <img
                    alt=''
                    src='images/member2.png'
                    class='avatar avatar-60 photo'
                  />
                  <div class='comment-text'>
                    <div class='ratings'>
                      <div class='rating-box'>
                        <div style={{ width: '100%' }} class='rating'></div>
                      </div>
                    </div>
                    <p class='meta'>
                      <strong>Stephen Smith</strong> <span>–</span>
                      June 02, 2018
                    </p>
                    <div class='description'>
                      <p>
                        Donec rutrum congue leo eget malesuada. Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              {/* <!-- #comment-## --> */}
            </ol>
          </div>
          <div>
            <div>
              <div class='comment-respond'>
                <span class='comment-reply-title'>Add a review</span>
                <form action='#' method='post' class='comment-form' novalidate>
                  <p class='comment-notes'>
                    <span id='email-notes'>
                      Your email address will not be published.
                    </span>
                    Required fields are marked
                    <span class='required'>*</span>
                  </p>
                  <div class='comment-form-rating'>
                    <label id='rating'>Your rating</label>
                    <p class='stars'>
                      <span>
                        <Link class='star-1' to=''>
                          1
                        </Link>
                        <Link class='star-2' to=''>
                          2
                        </Link>
                        <Link class='star-3' to=''>
                          3
                        </Link>
                        <Link class='star-4' to=''>
                          4
                        </Link>
                        <Link class='star-5' to=''>
                          5
                        </Link>
                      </span>
                    </p>
                  </div>
                  <p class='comment-form-comment'>
                    <label>
                      Your review <span class='required'>*</span>
                    </label>
                    <textarea
                      id='comment'
                      name='comment'
                      cols='45'
                      rows='8'
                      required
                    ></textarea>
                  </p>
                  <p class='comment-form-author'>
                    <label for='author'>
                      Name <span class='required'>*</span>
                    </label>
                    <input
                      id='author'
                      name='author'
                      type='text'
                      value=''
                      size='30'
                      required
                    />
                  </p>
                  <p class='comment-form-email'>
                    <label for='email'>
                      Email <span class='required'>*</span>
                    </label>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      value=''
                      size='30'
                      required
                    />
                  </p>
                  <p class='form-submit'>
                    <input
                      name='submit'
                      type='submit'
                      id='submit'
                      class='submit'
                      value='Submit'
                    />
                  </p>
                </form>
              </div>
              {/* <!-- #respond --> */}
            </div>
          </div>
          <div class='clear'></div>
        </div>
      </div>
      <div class='tab-pane fade' id='product_tabs_custom'>
        <div class='product-tabs-content-inner clearfix'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor,
            lorem et placerat vestibulum, metus nisi posuere nisl, in accumsan
            elit odio quis mi.
          </p>
          <p>
            Cras neque metus, consequat et blandit et, luctus a nunc. Etiam
            gravida vehicula tellus, in imperdiet ligula euismod eget.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Nam erat mi, rutrum at sollicitudin
            rhoncus, ultricies posuere erat. Duis convallis, arcu nec aliquam
            consequat, purus felis vehicula felis, a dapibus enim lorem nec
            augue.
          </p>
        </div>
      </div>
      <div class='tab-pane fade' id='product_tabs_custom1'>
        <div class='product-tabs-content-inner clearfix'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor,
            lorem et placerat vestibulum, metus nisi posuere nisl, in accumsan
            elit odio quis mi. Cras neque metus, consequat et blandit et, luctus
            a nunc. Etiam gravida vehicula tellus, in imperdiet ligula euismod
            eget. Pellentesque habitant morbi tristique senectus et netus et
            malesuada fames ac turpis egestas. Nam erat mi, rutrum at
            sollicitudin rhoncus, ultricies posuere erat. Duis convallis, arcu
            nec aliquam consequat, purus felis vehicula felis, a dapibus enim
            lorem nec augue.
          </p>
        </div>
      </div>
    </div>
  )
}
export default ProductReview
