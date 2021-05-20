import React from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";
import ls from 'local-storage';

// import '../../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import {
    Table
} from 'antd';

import { Modal, Button } from 'antd';


const CarList = () => {
    let userDetails = ls.get('userDetails');
    console.log("=======>",userDetails.user_id)

    return (
       
            <div>
                <main id="main" className="inner-page">
                    <div id="suggested-cars" className="suggested-cars">
                        <div className="container-fluid aos-init aos-animate" data-aos="fade-up">
                            <div className="section-title">
                                <h2>Suggested cars</h2>
                            </div>
                            <div className="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"}  />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}/>
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"} className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"} className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <a href="#" className="more-btn">View More <i className="bx bx-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>



                    <div id="inventory-cars" className="inventory-cars">
                        <div className="container-fluid aos-init aos-animate" data-aos="fade-up">

                            <div className="section-title">
                                <h2>inventory</h2>
                            </div>

                            <div className="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">

                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"} className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"} className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"} className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"} className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row aos-init aos-animate mt-3 pt-4" data-aos="zoom-in" data-aos-delay="100">

                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div className="text-center">
                                <a href="#" className="more-btn">See More Make Search <i className="bx bx-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>

                    <div id="recently-cars" className="recently-cars">
                        <div className="container-fluid aos-init aos-animate" data-aos="fade-up">

                            <div className="section-title">
                                <h2>Recently Added Cars</h2>
                            </div>

                            <div className="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">

                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row aos-init aos-animate mt-3 pt-4" data-aos="zoom-in" data-aos-delay="100">

                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">Honda amaze (2014 model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">$1900</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="text-center">
                                <a href="#" className="more-btn">See More Make Search <i className="bx bx-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>

                    <div id="favorite-cars" className="favorite-cars">
                        <div className="container-fluid aos-init aos-animate" data-aos="fade-up">

                            <div className="section-title">
                                <h2>favorite list</h2>
                            </div>

                            <div className="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">

                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />

                                        <div className="cars-content">
                                            <h3><a href="#">View Details</a></h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />

                                        <div className="cars-content">
                                            <h3><a href="#">View Details</a></h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />

                                        <div className="cars-content">
                                            <h3><a href="#">View Details</a></h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />

                                        <div className="cars-content">
                                            <h3><a href="#">View Details</a></h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />

                                        <div className="cars-content">
                                            <h3><a href="#">View Details</a></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="text-center">
                            <a href="#" className="more-btn">View Favorite List <i className="bx bx-chevron-right"></i></a>
                        </div>
                    </div>
                




               
           
        
    </main>
        </div >
    );
};

export default CarList;