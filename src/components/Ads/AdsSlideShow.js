import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function AdsSlideShow () {
  const [banners, setBanners] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    window.sliderr()
    // window.commonjs()

    axios({
      method: 'GET',
      url: '/api/banner-management'
    }).then(res => {
      console.log(res)
      console.log(res.data)
      let result = res.data
      setBanners(result)
      setIsLoading(false)
    })
  }, [isLoading])
  if (isLoading) {
    return <></>
  } else {
    return (
      <div id='thmg-slider-slideshow' class='thmg-slider-slideshow'>
        <div class='container'>
          {console.log(banners)}
          <div
            id='thm_slider_wrapper'
            class='thm_slider_wrapper fullwidthbanner-container'
          >
            <div id='thm-rev-slider' class='rev_slider fullwidthabanner'>
              <ul>
                {banners.map(({ Id, Name, ImageBannerStorages }) => (
                  <li
                    data-transition='random'
                    data-slotamount='7'
                    data-masterspeed='1000'
                    data-thumb={ImageBannerStorages[0].ImageUrl}
                  >
                    <img
                      src={ImageBannerStorages[0].ImageUrl}
                      data-bgposition='left top'
                      data-bgfit='cover'
                      data-bgrepeat='no-repeat'
                      alt='slider-image1'
                      // style={{ heigth: '200px' }}
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
                        <span>{JSON.parse(Name).Name}</span>
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
                        <span>Our motto</span>
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
                        <Link to='/AllProduct/1/Grid' class='buy-btn'>
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
                        {JSON.parse(Name).Quote}
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
}
export default AdsSlideShow
