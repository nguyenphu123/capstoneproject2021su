import React, { useEffect, useState } from 'react'

import { Tab } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'

function Blog () {
  const [isLoading, setIsLoading] = useState(false)

  if (isLoading) {
    return <div style={{ marginTop: '200px' }}>...Is Loading please wait</div>
  } else {
    return (
      <>
        <div
          class='background-color-layer'
          style={{
            backgroundImage:
              'https://amymhaddad.s3.amazonaws.com/morocco-blue.png'
          }}
        ></div>
        <main class='content-wrapper'>
          <header class='white-text-container section-container'>
            <div class='text-center'>
              <h1>I am David Folley</h1>
              <p>Web designer</p>
              <p>
                <a
                  class='fa-icon fa-icon-2x'
                  href='https://facebook.com/'
                  title=''
                >
                  <i class='fa fa-facebook'></i>
                </a>
                <a
                  class='fa-icon fa-icon-2x'
                  href='https://twitter.com/'
                  title=''
                >
                  <i class='fa fa-twitter'></i>
                </a>
                <a
                  class='fa-icon fa-icon-2x'
                  href='https://dribbble.com/'
                  title=''
                >
                  <i class='fa fa-dribbble'></i>
                </a>
                <a
                  class='fa-icon fa-icon-2x'
                  href='https://www.linkedin.com/'
                  title=''
                >
                  <i class='fa fa-linkedin'></i>
                </a>
                <a
                  class='fa-icon fa-icon-2x'
                  href='https://vimeo.com/'
                  title=''
                >
                  <i class='fa fa-vimeo'></i>
                </a>
              </p>
            </div>
          </header>

          <div class='container'>
            <div class='row'>
              <div class='col-xs-12'>
                <div class='card'>
                  <div class='card-block'>
                    <h2>About me</h2>
                    <div class='row'>
                      <div class='col-md-4'>
                        <p>
                          <img
                            src='https://amymhaddad.s3.amazonaws.com/morocco-blue.png'
                            class='img-responsive'
                            alt=''
                          />
                        </p>
                      </div>
                      <div class='col-md-8'>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                        <p>
                          Duis aute irure dolor in reprehenderit in voluptate
                          velit esse cillum dolore eu fugiat nulla pariatur.
                          Excepteur sint occaecat cupidatat non proident, sunt
                          in culpa qui officia deserunt mollit anim id est
                          laborum.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class='card'>
                  <div class='card-block'>
                    <h2>Projects</h2>
                    <div class='row'>
                      <div class='col-md-4'>
                        <img
                          src='https://amymhaddad.s3.amazonaws.com/morocco-blue.png'
                          class='img-responsive'
                          alt=''
                        />
                        <h3 class='h5'>Amelia App</h3>
                        <p>June 2017</p>
                      </div>
                      <div class='col-md-4'>
                        <img
                          ssrc='https://amymhaddad.s3.amazonaws.com/morocco-blue.png'
                          class='img-responsive'
                          alt=''
                        />
                        <h3 class='h5'>Portland</h3>
                        <p>March 2017</p>
                      </div>
                      <div class='col-md-4'>
                        <img
                         src='https://amymhaddad.s3.amazonaws.com/morocco-blue.png'
                          class='img-responsive'
                          alt=''
                        />
                        <h3 class='h5'>Denz for Nilon</h3>
                        <p>Jan 2017</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class='card'>
                  <div class='card-block'>
                    <h2>Work</h2>
                    <div class='work-experience'>
                      <small class='date'>2017-2015</small>
                      <h3 class='h5 date-title'>
                        Web developer -
                        <a
                          href='http://en.orson.io'
                          title='Create professionnal website'
                        >
                          Orson.io
                        </a>
                      </h3>

                      <p>
                        Leo vel orci porta non pulvinar neque laoreet
                        suspendisse interdum. Vitae ultricies leo integer
                        malesuada nunc. Imperdiet proin fermentum leo vel orci
                        porta non pulvinar neque. Fermentum leo vel orci porta
                        non. Posuere sollicitudin aliquam ultrices sagittis.
                        Aliquam faucibus purus in massa tempor nec.
                      </p>
                    </div>

                    <div class='work-experience'>
                      <small class='date'>2017-2015</small>
                      <h3 class='h5 date-title'>
                        Web developer -
                        <a href='http://mashup-template.com' title=''>
                          Mashup Template
                        </a>
                      </h3>

                      <p>
                        Fermentum leo vel orci porta non. Posuere sollicitudin
                        aliquam ultrices sagittis. Aliquam faucibus purus in
                        massa tempor nec.
                      </p>
                    </div>
                  </div>
                </div>

                <div class='card'>
                  <div class='card-block'>
                    <h2>Education</h2>
                    <div class='row'>
                      <div class='col-md-4'>
                        <div class='education-experience'>
                          <small class='date'>2017-2015</small>
                          <h3 class='h5 date-title'>Design Master</h3>
                          <p>Chicago University</p>
                        </div>
                      </div>
                      <div class='col-md-4'>
                        <div class='education-experience'>
                          <small class='date'>2015-2012</small>
                          <h3 class='h5 date-title'>Metrics Degree</h3>
                          <p>Ecole 87</p>
                        </div>
                      </div>
                      <div class='col-md-4'>
                        <div class='education-experience'>
                          <small class='date'>2012-2011</small>
                          <h3 class='h5 date-title'>Motion Design Course</h3>
                          <p>Pascal’s Lee Studio</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class='card'>
                  <div class='card-block'>
                    <h2>Language</h2>
                    <div class='row'>
                      <div class='col-md-4'>
                        <div class='language-experience'>
                          <h3 class='h5'>
                            English <small>Bilingual</small>
                          </h3>
                        </div>
                      </div>
                      <div class='col-md-4'>
                        <div class='language-experience'>
                          <h3 class='h5'>
                            French <small>Fluent</small>
                          </h3>
                        </div>
                      </div>
                      <div class='col-md-4'>
                        <div class='language-experience'>
                          <h3 class='h5'>
                            Russian <small>Beginner</small>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class='card'>
                  <div class='card-block'>
                    <h2>Projects</h2>
                    <div
                      id='carousel-example-generic'
                      class='carousel slide'
                      data-ride='carousel'
                    >
                      <div class='carousel-inner' role='listbox'>
                        <div class='item active'>
                          <img
                            src='https://amymhaddad.s3.amazonaws.com/morocco-blue.png'
                            class='img-responsive'
                            alt='...'
                          />
                          <div class='carousel-caption'>
                            <h3 class='h5'>Jules for Bastion</h3>
                            <p>2017</p>
                          </div>
                        </div>
                        <div class='item'>
                          <img
                            src='https://amymhaddad.s3.amazonaws.com/morocco-blue.png'
                            class='img-responsive'
                            alt='...'
                          />
                          <div class='carousel-caption'>
                            <h3 class='h5'>Jules for Bastion</h3>
                            <p>2017</p>
                          </div>
                        </div>

                        <div class='item'>
                          <img
                            src='https://amymhaddad.s3.amazonaws.com/morocco-blue.png'
                            class='img-responsive'
                            alt='...'
                          />
                          <div class='carousel-caption'>
                            <h3 class='h5'>Jules for Bastion</h3>
                            <p>2017</p>
                          </div>
                        </div>
                      </div>

                      <ol class='carousel-indicators'>
                        <li
                          data-target='#carousel-example-generic'
                          data-slide-to='0'
                          class='active'
                        ></li>
                        <li
                          data-target='#carousel-example-generic'
                          data-slide-to='1'
                        ></li>
                        <li
                          data-target='#carousel-example-generic'
                          data-slide-to='2'
                        ></li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div class='card'>
                  <div class='card-block'>
                    <h2>Social Network</h2>
                    <div class='row'>
                      <div class='col-md-3'>
                        <p class='social-buttons'>
                          <a href='https://twitter.com/' title=''>
                            <span class='social-round-icon fa-icon'>
                              <i class='fa fa-twitter'></i>
                            </span>
                            @David_Folley
                          </a>
                        </p>
                      </div>
                      <div class='col-md-3'>
                        <p class='social-buttons'>
                          <a href='https://www.linkedin.com/' title=''>
                            <span class='social-round-icon fa-icon'>
                              <i class='fa fa-linkedin'></i>
                            </span>
                            David Folley
                          </a>
                        </p>
                      </div>
                      <div class='col-md-3'>
                        <p class='social-buttons'>
                          <a href='https://dribbble.com/' title=''>
                            <span class='social-round-icon fa-icon'>
                              <i class='fa fa-dribbble'></i>
                            </span>
                            David Folley
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class='card'>
                  <div class='card-block'>
                    <h2>Contact</h2>
                    {/* <form action="" class="reveal-content">
              <div class="form-group">
                <input type="email" class="form-control" id="email" placeholder="Email">
              </div>
              <div class="form-group">
                <input type="text" class="form-control" id="subject" placeholder="Subject">
              </div>
              <div class="form-group">
                <textarea class="form-control" rows="5" placeholder="Enter your message"></textarea>
              </div>
              <div class="form-group">
                <button type="submit" class=" btn btn-primary">Send message</button>
              </div> 
            </form> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer class='footer-container white-text-container text-center'>
          <div class='container'>
            <div class='row'>
              <div class='col-xs-12'>
                <p>
                  <img src='./assets/images/mashup-icon.svg' alt='' />
                </p>

                <p>
                  ©All right reserved. Design
                  <a
                    href='http://www.mashup-template.com/'
                    title='Create website with free html template'
                  >
                    Mashup Template
                  </a>
                  /
                  <a href='https://unsplash.com/' title='Beautiful Free Images'>
                    Unsplash
                  </a>
                </p>
                <p>
                  <a
                    class='fa-icon fa-icon-2x'
                    href='https://facebook.com/'
                    title=''
                  >
                    <i class='fa fa-facebook'></i>
                  </a>
                  <a
                    class='fa-icon fa-icon-2x'
                    href='https://twitter.com/'
                    title=''
                  >
                    <i class='fa fa-twitter'></i>
                  </a>
                  <a
                    class='fa-icon fa-icon-2x'
                    href='https://dribbble.com/'
                    title=''
                  >
                    <i class='fa fa-dribbble'></i>
                  </a>
                  <a
                    class='fa-icon fa-icon-2x'
                    href='https://www.linkedin.com/'
                    title=''
                  >
                    <i class='fa fa-linkedin'></i>
                  </a>
                  <a
                    class='fa-icon fa-icon-2x'
                    href='https://vimeo.com/'
                    title=''
                  >
                    <i class='fa fa-vimeo'></i>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </>
    )
  }
}

export default Blog