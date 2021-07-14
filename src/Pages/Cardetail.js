import React from 'react';
import appstore from '../assets/img/appstore.png';
import googleplay from '../assets/img/googleplay.png';
import speedometer from '../assets/img/speedometer.svg';
import gasolinePump from '../assets/img/gasolinePump.svg';
import car from '../assets/img/car.svg';

const Cardetail=()=>{
return(
    <div>
        
        <main id="main" class="inner-page-cars">
            <div id="products-details" class="products-details">
            <div class="container">
                    <div class="back-btn">
                        <a class="back-btn-primary" href="#"><i class="bx bx-chevron-left"></i> Back</a>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="wrapper">
                                <div class="image-gallery">
                                    <main class="primary" style="background-image: url('assets/img/cars02.png');"></main>
                                    <aside class="thumbnails">
                                        <a href="#" class="selected thumbnail" data-big="assets/img/cars02.png">
                                        <div class="thumbnail-image" style="background-image: url(assets/img/cars02.png)"></div>
                                        </a>
                                        <a href="#" class="thumbnail" data-big="assets/img/cars03.png">
                                        <div class="thumbnail-image" style="background-image: url(assets/img/cars03.png)"></div>
                                        </a>
                                        <a href="#" class="thumbnail" data-big="assets/img/cars04.png">
                                        <div class="thumbnail-image" style="background-image: url(assets/img/cars04.png)"></div>
                                        </a>
                                        <a href="#" class="thumbnail" data-big="assets/img/cars05.png">
                                        <div class="thumbnail-image" style="background-image: url(assets/img/cars05.png)"></div>
                                        </a>
                                    </aside>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="product-dtl">
                                <div class="product-info">
                                    <div class="product-name">Honda amaze (2014 model)</div>
                                    <p class="productdes">Lorem Ipsum Is Simply Dummy</p>
                                    <div class="d-flex align-items-center mb-3">
                                            <p class="details"><img src={speedometer}  alt=""></img><span>31,1241 m</span></p>
                                            <p class="details"><img src={gasolinePump} alt=""></img><span>Diesel</span></p>
                                    </div>
                                    <p><span class="dealertaglines">Message From The Dealer-</span> Lorem Ipsum Is Simply Dummy Text Typesetting Industry. Lorem Ipsum</p>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-12 carpoints">							  
                                        <div class="carpoint">
                                            <img src={car} alt=""></img>
                                            <span>UN14DF134WVQ149788</span>
                                            <img src="assets/img/book.svg"  alt=""></img>
                                            <img src="assets/img/barcode.svg"  alt=""></img>
                                        </div>
                                    </div>
                                </div>
                                    
                                    <div class="row">
                                    <div class="col-md-12">							
                                        <div class="titlestatus mt-3">
                                        <p><img src="assets/img/book.svg" alt=""></img><span>Title status</span> - Title with the dealer</p>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="row">	
                                    <div class="col-md-12 cars-detail-ins">
                                        <div class="cars-detail-views">
                                            <a class="car-btns" href="#">view Inspection</a>
                                            <a class="car-btns-primary" href="#"><img src="assets/img/tag.svg" alt=""></img>High Bid :<span> $1500</span></a>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="product-count">
                                            <h3>Used Car Dealer</h3>
                                            <div class=" d-flex align-items-center mb-3">
                                                <p class="details"><img src="assets/img/Path.svg"  alt=""></img><span>Illinois</span></p>
                                                <p class="details"><img src="assets/img/persent.svg" alt=""></img><span>15%</span></p>
                                                <p class="details"><img src="assets/img/road-with-broken-line.svg" alt=""></img><span>2.5M</span></p>
                                            </div>	        										
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="product-count">	        				
                                            <img src="assets/img/speedometer.svg"  alt=""></img>
                                        </div>
                                    </div>	        				
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="cars-buy">
                                            <a class="cars-buy-btns" href="#">Buy now</a>
                                            <a class="cars-buy-btns-primary" href="#">Make Bid</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            
            <div id="carspecifation" class="carspecifation">
            <div class="container">
                <div class="carspecifationblock col-lg-12">
                    <div class="section-title">
                    <h2>Car Specification</h2>
                    </div>
                    <div class="row content">
                        <div class="col-lg-2">
                            <div class="specifati">
                            <p><img src="assets/img/manual-transmission.svg"></img> <span>Transmission</span></p>
                            <p><img src="assets/img/drivetrain.svg"></img> <span>Drivetrain</span></p>
                            <p><img src="assets/img/gasoline-pump.svg"></img> <span>Fuel Type</span></p>
                            </div>
                        </div>
                        <div class="col-lg-2">
                            <div class="specifati2">
                            <p>Automatic</p>
                            <p>Rwd</p>
                            <p>Diesel</p>
                            </div>
                        </div>
                        <div class="col-lg-2">
                            <div class="specifati">
                            <p><img src="assets/img/manual-transmission.svg"></img> <span>Transmission</span></p>
                            <p><img src="assets/img/drivetrain.svg"></img> <span>Drivetrain</span></p>
                            <p><img src="assets/img/gasoline-pump.svg"></img> <span>Fuel Type</span></p>
                            </div>
                        </div>
                        <div class="col-lg-2">
                            <div class="specifati2">
                            <p>Automatic</p>
                            <p>Rwd</p>
                            <p>Diesel</p>
                            </div>
                        </div>
                        <div class="col-lg-2">
                            <div class="specifati">
                            <p><img src="assets/img/manual-transmission.svg"></img> <span>Transmission</span></p>
                            <p><img src="assets/img/drivetrain.svg"></img> <span>Drivetrain</span></p>
                            <p><img src="assets/img/gasoline-pump.svg"></img> <span>Fuel Type</span></p>
                            </div>
                        </div>
                        <div class="col-lg-2">
                            <div class="specifati2">
                            <p>Automatic</p>
                            <p>Rwd</p>
                            <p>Diesel</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="dealer-cars" class="dealer-cars">
            <div class="container-fluid aos-init aos-animate" data-aos="fade-up">

                <div class="section-title">
                <h2>More cars from the dealer</h2>          
                </div>

                <div class="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">

                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                    <div class="car-item">
                    <div class="cars-lock">
                        <img src="assets/img/lock.svg" class="img-fluid" alt="..."></img>
                    </div>
                    <img src="assets/img/cars01.png" class="img-fluid" alt="..."></img>
                    <div class="cars-tag">
                        <h4>Best deal</h4>
                    </div>
                    <div class="cars-content">		
                    <h3><a href="#">Honda amaze (2014 model)</a></h3>
                        <div class="d-flex align-items-center mb-3">
                        <p class="details"><img src="assets/img/speedometer.svg"  alt=""></img><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                        <p class="details"><img src="assets/img/gasoline-pump.svg" alt=""></img><span>Diesel</span></p>
                        </div>
                        
                        <div class="cars-prices">
                            <a class="cta-btns" href="register.html">$1900</a>
                            <a class="cta-btns-primary" href="register.html">Make Bid</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                    <div class="car-item">
                    <div class="cars-lock">
                        <img src="assets/img/lock.svg" class="img-fluid" alt="..."></img>
                    </div>
                    <img src="assets/img/cars01.png" class="img-fluid" alt="..."></img>
                    <div class="cars-tag">
                        <h4>Best deal</h4>
                    </div>
                    <div class="cars-content">		
                    <h3><a href="#">Honda amaze (2014 model)</a></h3>
                        <div class="d-flex align-items-center mb-3">
                        <p class="details"><img src="assets/img/speedometer.svg"  alt=""></img><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                        <p class="details"><img src="assets/img/gasoline-pump.svg" alt=""></img><span>Diesel</span></p>
                        </div>
                        
                        <div class="cars-prices">
                            <a class="cta-btns" href="register.html">$1900</a>
                            <a class="cta-btns-primary" href="register.html">Make Bid</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                    <div class="car-item">
                    <div class="cars-lock">
                        <img src="assets/img/lock.svg" class="img-fluid" alt="..."></img>
                    </div>
                    <img src="assets/img/cars01.png" class="img-fluid" alt="..."></img>
                    <div class="cars-tag">
                        <h4>Best deal</h4>
                    </div>
                    <div class="cars-content">		
                    <h3><a href="#">Honda amaze (2014 model)</a></h3>
                        <div class="d-flex align-items-center mb-3">
                        <p class="details"><img src="assets/img/speedometer.svg"  alt=""></img><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                        <p class="details"><img src="assets/img/gasoline-pump.svg" alt=""></img><span>Diesel</span></p>
                        </div>
                        
                        <div class="cars-prices">
                            <a class="cta-btns" href="register.html">$1900</a>
                            <a class="cta-btns-primary" href="register.html">Make Bid</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                    <div class="car-item">
                    <div class="cars-lock">
                        <img src="assets/img/lock.svg" class="img-fluid" alt="..."></img>
                    </div>
                    <img src="assets/img/cars01.png" class="img-fluid" alt="..."></img>
                    <div class="cars-tag">
                        <h4>Best deal</h4>
                    </div>
                    <div class="cars-content">		
                    <h3><a href="#">Honda amaze (2014 model)</a></h3>
                        <div class="d-flex align-items-center mb-3">
                        <p class="details"><img src="assets/img/speedometer.svg"  alt=""></img><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                        <p class="details"><img src="assets/img/gasoline-pump.svg" alt=""></img><span>Diesel</span></p>
                        </div>
                        
                        <div class="cars-prices">
                            <a class="cta-btns" href="register.html">$1900</a>
                            <a class="cta-btns-primary" href="register.html">Make Bid</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                    <div class="car-item">
                    <div class="cars-lock">
                        <img src="assets/img/lock.svg" class="img-fluid" alt="..."></img>
                    </div>
                    <img src="assets/img/cars01.png" class="img-fluid" alt="..."></img>
                    <div class="cars-tag">
                        <h4>Best deal</h4>
                    </div>
                    <div class="cars-content">		
                    <h3><a href="#">Honda amaze (2014 model)</a></h3>
                        <div class="d-flex align-items-center mb-3">
                        <p class="details"><img src="assets/img/speedometer.svg"  alt=""></img><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                        <p class="details"><img src="assets/img/gasoline-pump.svg" alt=""></img><span>Diesel</span></p>
                        </div>
                        
                        <div class="cars-prices">
                            <a class="cta-btns" href="register.html">$1900</a>
                            <a class="cta-btns-primary" href="register.html">Make Bid</a>
                        </div>
                    </div>
                    </div>
                </div>		
                </div>
                <div class="text-center">
                        <a href="#" class="more-btn">View More<i class="bx bx-chevron-right"></i></a>
                    </div>
                </div>
            </div>
            
            
            <div id="other-dealer-cars" class="other-dealer-cars">
            <div class="container-fluid aos-init aos-animate" data-aos="fade-up">

                <div class="section-title">
                <h2>Same cars from other dealer</h2>          
                </div>

                <div class="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">

                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                    <div class="car-item">
                    <div class="cars-lock">
                        <img src="assets/img/lock.svg" class="img-fluid" alt="..."></img>
                    </div>
                    <img src="assets/img/cars01.png" class="img-fluid" alt="..."></img>
                    <div class="cars-tag">
                        <h4>Best deal</h4>
                    </div>
                    <div class="cars-content">		
                    <h3><a href="#">Honda amaze (2014 model)</a></h3>
                        <div class="d-flex align-items-center mb-3">
                        <p class="details"><img src="assets/img/speedometer.svg"  alt=""></img><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                        <p class="details"><img src="assets/img/gasoline-pump.svg" alt=""></img><span>Diesel</span></p>
                        </div>
                        
                        <div class="cars-prices">
                            <a class="cta-btns" href="register.html">$1900</a>
                            <a class="cta-btns-primary" href="register.html">Make Bid</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                    <div class="car-item">
                    <div class="cars-lock">
                        <img src="assets/img/lock.svg" class="img-fluid" alt="..."></img>
                    </div>
                    <img src="assets/img/cars01.png" class="img-fluid" alt="..."></img>
                    <div class="cars-tag">
                        <h4>Best deal</h4>
                    </div>
                    <div class="cars-content">		
                    <h3><a href="#">Honda amaze (2014 model)</a></h3>
                        <div class="d-flex align-items-center mb-3">
                        <p class="details"><img src="assets/img/speedometer.svg"  alt=""></img><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                        <p class="details"><img src="assets/img/gasoline-pump.svg" alt=""></img><span>Diesel</span></p>
                        </div>
                        
                        <div class="cars-prices">
                            <a class="cta-btns" href="register.html">$1900</a>
                            <a class="cta-btns-primary" href="register.html">Make Bid</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                    <div class="car-item">
                    <div class="cars-lock">
                        <img src="assets/img/lock.svg" class="img-fluid" alt="..."></img>
                    </div>
                    <img src="assets/img/cars01.png" class="img-fluid" alt="..."></img>
                    <div class="cars-tag">
                        <h4>Best deal</h4>
                    </div>
                    <div class="cars-content">		
                    <h3><a href="#">Honda amaze (2014 model)</a></h3>
                        <div class="d-flex align-items-center mb-3">
                        <p class="details"><img src="assets/img/speedometer.svg"  alt=""></img><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                        <p class="details"><img src="assets/img/gasoline-pump.svg" alt=""></img><span>Diesel</span></p>
                        </div>
                        
                        <div class="cars-prices">
                            <a class="cta-btns" href="register.html">$1900</a>
                            <a class="cta-btns-primary" href="register.html">Make Bid</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                    <div class="car-item">
                    <div class="cars-lock">
                        <img src="assets/img/lock.svg" class="img-fluid" alt="..."></img>
                    </div>
                    <img src="assets/img/cars01.png" class="img-fluid" alt="..."></img>
                    <div class="cars-tag">
                        <h4>Best deal</h4>
                    </div>
                    <div class="cars-content">		
                    <h3><a href="#">Honda amaze (2014 model)</a></h3>
                        <div class="d-flex align-items-center mb-3">
                        <p class="details"><img src="assets/img/speedometer.svg"  alt=""></img><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                        <p class="details"><img src="assets/img/gasoline-pump.svg" alt=""></img><span>Diesel</span></p>
                        </div>
                        
                        <div class="cars-prices">
                            <a class="cta-btns" href="register.html">$1900</a>
                            <a class="cta-btns-primary" href="register.html">Make Bid</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                    <div class="car-item">
                    <div class="cars-lock">
                        <img src="assets/img/lock.svg" class="img-fluid" alt="..."></img>
                    </div>
                    <img src="assets/img/cars01.png" class="img-fluid" alt="..."></img>
                    <div class="cars-tag">
                        <h4>Best deal</h4>
                    </div>
                    <div class="cars-content">		
                    <h3><a href="#">Honda amaze (2014 model)</a></h3>
                        <div class="d-flex align-items-center mb-3">
                        <p class="details"><img src="assets/img/speedometer.svg"  alt=""></img><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                        <p class="details"><img src="assets/img/gasoline-pump.svg" alt=""></img><span>Diesel</span></p>
                        </div>
                        
                        <div class="cars-prices">
                            <a class="cta-btns" href="register.html">$1900</a>
                            <a class="cta-btns-primary" href="register.html">Make Bid</a>
                        </div>
                    </div>
                    </div>
                </div>		
                </div>
                <div class="text-center">
                        <a href="#" class="more-btn">View More<i class="bx bx-chevron-right"></i></a>
                    </div>
                </div>
            </div>
            <section id="playstoreBlock" class="playstoreBlock">
            <div class="container">


                <div class="row content">
                <div class="col-lg-12">
                    <img src="assets/img/appstore.png" ></img>
                    <img src="assets/img/googleplay.png" ></img>
                
                </div>
                
                </div>

            </div>
            </section>     

        </main>

    </div>
)
}
export default Cardetail