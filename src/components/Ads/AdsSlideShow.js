import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const items = [
  'https://pages.lazada.vn/wow/gcp/route/lazada/vn/upr_1000345_lazada/channel/vn/upr-router/vn?spm=a2o4n.home.top.dbr6.19056afevjwfCO&hybrid=1&data_prefetch=true&at_iframe=1&wh_pid=/lazada/channel/vn/thoi-trang/sieu-hoi-balo-tui-vi&scm=1003.4.icms-zebra-5000379-2587043.OTHER_6045501404_7424723&prefetch_replace=1',
  'https://shop.jaguars.com/content/ws/all/b1f77cc0-86b3-4663-957d-56fef63534ee__1600X615.jpg',
  'https://shop.jaguars.com/content/ws/all/b1f77cc0-86b3-4663-957d-56fef63534ee__1600X615.jpg'
]
function AdsSlideShow () {
  return (
    <div id='thmg-slider-slideshow' class='thmg-slider-slideshow'>
      <div class='container'>
        <div
          id='thm_slider_wrapper'
          class='thm_slider_wrapper fullwidthbanner-container'
        >
          <div id='thm-rev-slider' class='rev_slider fullwidthabanner'>
            <ul>
              {items.map(({ img }) => (
                <li
                  data-transition='random'
                  data-slotamount='7'
                  data-masterspeed='1000'
                  data-thumb='https://shop.jaguars.com/content/ws/all/b1f77cc0-86b3-4663-957d-56fef63534ee__1600X615.jpg'
                >
                  <img
                    src='https://d-themes.com/react/molla/demo-5/images/home/banners/banner-3.jpg'
                    data-bgposition='left top'
                    data-bgfit='cover'
                    data-bgrepeat='no-repeat'
                    alt='slider-image1'
                    style={{ heigth: '200px' }}
                  />
                  <div class='info'>
                    <div
                      class='tp-caption ExtraLargeTitle sft  tp-resizeme '
                      data-x='0'
                      data-y='220'
                      data-endspeed='500'
                      data-speed='500'
                      data-start='1100'
                      data-easing='Linear.easeNone'
                      data-splitin='none'
                      data-splitout='none'
                      data-elementdelay='0.1'
                      data-endelementdelay='0.1'
                      style={{
                        zIndex: '2',
                        whiteSpace: 'nowrap',
                        heigth: '200px'
                      }}
                    >
                      <span>Trending</span>
                    </div>
                    <div
                      class='tp-caption LargeTitle sfl  tp-resizeme '
                      data-x='0'
                      data-y='300'
                      data-endspeed='500'
                      data-speed='500'
                      data-start='1300'
                      data-easing='Linear.easeNone'
                      data-splitin='none'
                      data-splitout='none'
                      data-elementdelay='0.1'
                      data-endelementdelay='0.1'
                      style={{
                        zIndex: '3',
                        whiteSpace: 'nowrap',
                        heigth: '200px'
                      }}
                    >
                      Simply <span>cool</span>
                    </div>
                    <div
                      class='tp-caption sfb  tp-resizeme '
                      data-x='0'
                      data-y='520'
                      data-endspeed='500'
                      data-speed='500'
                      data-start='1500'
                      data-easing='Linear.easeNone'
                      data-splitin='none'
                      data-splitout='none'
                      data-elementdelay='0.1'
                      data-endelementdelay='0.1'
                      style={{
                        zIndex: '4',
                        whiteSpace: 'nowrap',
                        heigth: '200px'
                      }}
                    >
                      <Link to='/AllProduct' class='buy-btn'>
                        Shop Now
                      </Link>
                    </div>
                    <div
                      class='tp-caption Title sft  tp-resizeme '
                      data-x='0'
                      data-y='420'
                      data-endspeed='500'
                      data-speed='500'
                      data-start='1500'
                      data-easing='Power2.easeInOut'
                      data-splitin='none'
                      data-splitout='none'
                      data-elementdelay='0.1'
                      data-endelementdelay='0.1'
                      style={{
                        zIndex: '4',
                        whiteSpace: 'nowrap',
                        heigth: '200px'
                      }}
                    >
                      We supply highly quality products
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdsSlideShow
