import React, { useEffect, useState } from 'react'

const items = [
  'https://shop.jaguars.com/content/ws/all/b1f77cc0-86b3-4663-957d-56fef63534ee__1600X615.jpg',
  'https://shop.jaguars.com/content/ws/all/b1f77cc0-86b3-4663-957d-56fef63534ee__1600X615.jpg',
  'https://shop.jaguars.com/content/ws/all/b1f77cc0-86b3-4663-957d-56fef63534ee__1600X615.jpg'
]
function AdsSlideShow () {
  useEffect(() => {
    window.sliderr()
    window.commonjs()

    // if (UserSlice !== null) {
    //   NotificationManager.success(
    //     'Success message',
    //     'Wellcome ' + UserSlice.UserName
    //   )
    // }
    // alert.success('Wellcome ' + UserSlice.UserName)
  }, [])

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
                    src='https://shop.jaguars.com/content/ws/all/b1f77cc0-86b3-4663-957d-56fef63534ee__1600X615.jpg'
                    data-bgposition='left top'
                    data-bgfit='cover'
                    data-bgrepeat='no-repeat'
                    alt='slider-image1'
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
                      style={{ zIndex: '2', whiteSpace: 'nowrap' }}
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
                      style={{ zIndex: '3', whiteSpace: 'nowrap' }}
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
                      style={{ zIndex: '4', whiteSpace: 'nowrap' }}
                    >
                      <a href='#' class='buy-btn'>
                        Shop Now
                      </a>
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
                      style={{ zIndex: '4', whiteSpace: 'nowrap' }}
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
