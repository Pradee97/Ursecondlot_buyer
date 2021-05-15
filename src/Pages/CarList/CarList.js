import React from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";

// import '../../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import {
    Table
} from 'antd';

import { Modal, Button } from 'antd';


const CarList = () => {


    return (
       
            <div>
                <main id="main" class="inner-page">
                    <div id="suggested-cars" class="suggested-cars">
                        <div class="container-fluid aos-init aos-animate" data-aos="fade-up">
                            <div class="section-title">
                                <h2>Suggested cars</h2>
                            </div>
                            <div class="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
                                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div class="car-item">
                                        <div class="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"}  />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}/>
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
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
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"} class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
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
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
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
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
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
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"} class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div class="cars-prices">
                                                <a class="cta-btns" href="#">$1900</a>
                                                <a class="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <a href="#" class="more-btn">View More <i class="bx bx-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>



                    <div id="inventory-cars" class="inventory-cars">
                        <div class="container-fluid aos-init aos-animate" data-aos="fade-up">

                            <div class="section-title">
                                <h2>inventory</h2>
                            </div>

                            <div class="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">

                                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div class="car-item">
                                        <div class="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"} class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
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
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"} class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
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
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"} class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
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
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"} class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
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
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div class="cars-prices">
                                                <a class="cta-btns" href="#">$1900</a>
                                                <a class="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row aos-init aos-animate mt-3 pt-4" data-aos="zoom-in" data-aos-delay="100">

                                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div class="car-item">
                                        <div class="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
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
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
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
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
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
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
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
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div class="cars-prices">
                                                <a class="cta-btns" href="#">$1900</a>
                                                <a class="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div class="text-center">
                                <a href="#" class="more-btn">See More Make Search <i class="bx bx-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>

                    <div id="recently-cars" class="recently-cars">
                        <div class="container-fluid aos-init aos-animate" data-aos="fade-up">

                            <div class="section-title">
                                <h2>Recently Added Cars</h2>
                            </div>

                            <div class="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">

                                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div class="car-item">
                                        <div class="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
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
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
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
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
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
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
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
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div class="cars-prices">
                                                <a class="cta-btns" href="#">$1900</a>
                                                <a class="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row aos-init aos-animate mt-3 pt-4" data-aos="zoom-in" data-aos-delay="100">

                                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div class="car-item">
                                        <div class="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
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
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
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
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
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
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
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
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}class="img-fluid" alt="..." />
                                        <div class="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div class="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div class="d-flex align-items-center mb-3">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p class="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div class="cars-prices">
                                                <a class="cta-btns" href="#">$1900</a>
                                                <a class="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="text-center">
                                <a href="#" class="more-btn">See More Make Search <i class="bx bx-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>

                    <div id="favorite-cars" class="favorite-cars">
                        <div class="container-fluid aos-init aos-animate" data-aos="fade-up">

                            <div class="section-title">
                                <h2>favorite list</h2>
                            </div>

                            <div class="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">

                                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div class="car-item">
                                        <div class="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}class="img-fluid" alt="..." />

                                        <div class="cars-content">
                                            <h3><a href="#">View Details</a></h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div class="car-item">
                                        <div class="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}class="img-fluid" alt="..." />

                                        <div class="cars-content">
                                            <h3><a href="#">View Details</a></h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div class="car-item">
                                        <div class="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}class="img-fluid" alt="..." />

                                        <div class="cars-content">
                                            <h3><a href="#">View Details</a></h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div class="car-item">
                                        <div class="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}class="img-fluid" alt="..." />

                                        <div class="cars-content">
                                            <h3><a href="#">View Details</a></h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div class="car-item">
                                        <div class="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} class="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}class="img-fluid" alt="..." />

                                        <div class="cars-content">
                                            <h3><a href="#">View Details</a></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="text-center">
                            <a href="#" class="more-btn">View Favorite List <i class="bx bx-chevron-right"></i></a>
                        </div>
                    </div>
                




               
           
        
    </main>
        </div >
    );
};

export default CarList;