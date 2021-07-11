import React from 'react';
import lock from '../../assets/img/lock.svg';
import cars01 from '../../assets/img/cars01.png';
import appstore from '../../assets/img/appstore.png';
import googleplay from '../../assets/img/googleplay.png';
import speedometer from '../../assets/img/speedometer.svg';
import gasolinePump from '../../assets/img/gasolinePump.svg';


const Favoritelist = () => {
  return (
      <>
        <main id="main" class="inner-page">

          <div id="suggested-cars" class="suggested-cars">
            <div class="container-fluid aos-init aos-animate" data-aos="fade-up">

              <div class="section-title">
                <h2>My Favorite Car List</h2>
              </div>

              <div class="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">

                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                  <div class="car-item">
                    <div class="cars-lock">
                      <img src={lock} class="img-fluid" alt="..." />
                    </div>
                        <img src={cars01} class="img-fluid" alt="..." />
                        <div class="cars-tag">
                          <h4>Best deal</h4>
                        </div>
                        <div class="cars-content">
                        <h3><a href="#">Honda amaze (2014 model)</a></h3>
                        <div class="d-flex align-items-center mb-3">
                            <p class="details"><img src={speedometer} alt="" /><span>31,1241 m</span></p>
                            {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                            <p class="details"><img src={gasolinePump} alt="" /><span>Diesel</span></p>
                          </div>

                        <div class="cars-prices">
                          <a class="cta-btns" href="#">$1900</a>
                          <a class="cta-btns-primary" href="#">Make Bid</a>
                        </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                  <div class="car-item">
                    <div class="cars-lock">
                    <img src={lock} class="img-fluid" alt="..." />
                    </div>
                    <img src={cars01} class="img-fluid" alt="..." />
                      <div class="cars-tag">
                        <h4>Best deal</h4>
                      </div>
                        <div class="cars-content">
                          <h3><a href="#">Honda amaze (2014 model)</a></h3>
                          <div class="d-flex align-items-center mb-3">
                            <p class="details"><img src={speedometer} alt="" /><span>31,1241 m</span></p>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <p class="details"><img src={gasolinePump} alt="" /><span>Diesel</span></p>
                          </div>
                          <div class="cars-prices">
                            <a class="cta-btns" href="#">$1900</a>
                            <a class="cta-btns-primary" href="#">Make Bid</a>
                          </div>
                        </div>
                      </div>
                    </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                  <div class="car-item">
                                    <div class="cars-lock">
                                    <img src={lock} class="img-fluid" alt="..." />
                                    </div>
                                    <img src={cars01} class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                          <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                          <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                          <div class="d-flex align-items-center mb-3">
                                            <p class="details"><img src={speedometer} alt="" /><span>31,1241 m</span></p>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <p class="details"><img src={gasolinePump} alt="" /><span>Diesel</span></p>
                                          </div>

                    <div class="cars-prices">
                      <a class="cta-btns" href="#">$1900</a>
                      <a class="cta-btns-primary" href="#">Make Bid</a>
                    </div>
                  </div>
                    </div>
                      </div>
                      <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                    <div class="car-item">
                      <div class="cars-lock">
                      <img src={lock} class="img-fluid" alt="..." />
                      </div>
                      <img src={cars01} class="img-fluid" alt="..." />
                      <div class="cars-tag">
                        <h4>Best deal</h4>
                      </div>
                      <div class="cars-content">
                        <h3><a href="#">Honda amaze (2014 model)</a></h3>
                        <div class="d-flex align-items-center mb-3">
                          <p class="details"><img src={speedometer} alt="" /><span>31,1241 m</span></p>
                          {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                          <p class="details"><img src={gasolinePump} alt="" /><span>Diesel</span></p>
                        </div>
                        <div class="cars-prices">
                          <a class="cta-btns" href="#">$1900</a>
                          <a class="cta-btns-primary" href="#">Make Bid</a>
                        </div>
                      </div>
                    </div>
                    </div>
                    <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                      <div class="car-item">
                        <div class="cars-lock">
                        <img src={lock} class="img-fluid" alt="..." />
                        </div>
                        <img src={cars01} class="img-fluid" alt="..." />
                        <div class="cars-tag">
                          <h4>Best deal</h4>
                        </div>
                        <div class="cars-content">
                          <h3><a href="#">Honda amaze (2014 model)</a></h3>
                          <div class="d-flex align-items-center mb-3">
                              <p class="details"><img src={speedometer} alt="" /> <span>31,1241 m</span> </p>
                            {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                            <p class="details"><img src={gasolinePump} alt="" /><span>Diesel</span></p>
                          </div>

                          <div class="cars-prices">
                            <a class="cta-btns" href="#">$1900</a>
                            <a class="cta-btns-primary" href="#">Make Bid</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          

          <section id="playstoreBlock" class="playstoreBlock">
            <div class="container">


              <div class="row content">
                <div class="col-lg-12">
                  <img src={appstore} />
                  <img src={googleplay} />

                </div>

              </div>

            </div>
          </section>

        </main>
       
      </>  
    )
}
export default Favoritelist;