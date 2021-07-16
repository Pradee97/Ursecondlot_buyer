import React from 'react';
import lock from '../assets/img/lock.svg';
import cars01 from '../assets/img/cars01.png';
import appstore from '../assets/img/appstore.png';
import googleplay from '../assets/img/googleplay.png';
import speedometer from '../assets/img/speedometer.svg';
import gasolinePump from '../assets/img/gasolinePump.svg';
import car from '../assets/img/car.svg';
import book from '../assets/img/book.svg';
import barcode from '../assets/img/barcode.svg';
import tag from '../assets/img/tag.svg';
import Path from '../assets/img/Path.svg';
import transmission from '../assets/img/manual-transmission.svg';
import drivetrain from '../assets/img/drivetrain.svg';
import present from '../assets/img/persent.svg';
import brokenline from '../assets/img/road-with-broken-line.svg';
import carDetail1 from '../assets/img/cardetail1.jpg';
import carDetail2 from '../assets/img/cardetail2.jpg';
import carDetail3 from '../assets/img/cardetail3.jpg';
import carDetail4 from '../assets/img/cardetail4.jpg';
import carDetail5 from '../assets/img/cardetail5.jpg';
import carsHonda from '../assets/img/carshonda.jpg';
import $ from 'jquery';

const Cardetail = () =>{
	
	$( document ).ready(function() {
		$('.slider-for').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			asNavFor: '.slider-nav'
		});
		$('.slider-nav').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			vertical:true,
			asNavFor: '.slider-for',
			dots: false,
			focusOnSelect: true,
			verticalSwiping:true,
			responsive: [
			{
				breakpoint: 992,
				settings: {
				  vertical: false,
				}
			},
			{
			  breakpoint: 768,
			  settings: {
				vertical: false,
			  }
			},
			{
			  breakpoint: 580,
			  settings: {
				vertical: false,
				slidesToShow: 3,
			  }
			},
			{
			  breakpoint: 380,
			  settings: {
				vertical: false,
				slidesToShow: 2,
			  }
			}
			]
		});
		});
		
return(
    <div>
        <script src="assets/js/main.js"></script>
		<script src="assets/vendor/slick/js/slick.min.js"></script>
		<main id="main" class="inner-page-cars">
    <div id="products-details" class="products-details">
	 <div class="container">
			<div class="back-btn">
				<a class="back-btn-primary" href="#"><i class="bx bx-chevron-left"></i> Back</a>
			</div>
	        <div class="row">
	        	
				<div class="col-md-6">

				<div class="vehicle-detail-banner banner-content clearfix">
                    <div class="banner-slider">
                        <div class="slider slider-for">
                            <div class="slider-banner-image">
								<img src={carDetail1}  alt=""></img>
                            </div> 
                            <div class="slider-banner-image">
								<img src={carDetail2}  alt=""></img> 
                            </div> 
                            <div class="slider-banner-image">
								<img src={carDetail3}  alt=""></img>
                            </div> 
                             <div class="slider-banner-image">
								<img src={carDetail4}  alt=""></img> 
                            </div> 
                            <div class="slider-banner-image">
								<img src={carDetail5}  alt=""></img> 
                            </div> 
                          
                        </div>
                        <div class="slider slider-nav thumb-image">
                            <div class="thumbnail-image">
                                <div class="thumbImg">
                                    <img src={carDetail1}  alt=""></img>
                                </div>
                            </div>
                            <div class="thumbnail-image">
                                <div class="thumbImg">
                                    <img src={carDetail2}  alt=""></img> 
                                </div>
                            </div>
                            <div class="thumbnail-image">
                                <div class="thumbImg">
                                    <img src={carDetail3}  alt=""></img> 
                                </div>
                            </div>
                              <div class="thumbnail-image">
                                <div class="thumbImg">
                                    <img src={carDetail4}  alt=""></img> 
                                </div>
                            </div>
                            <div class="thumbnail-image">
                                <div class="thumbImg">
                                    <img src={carDetail5}  alt=""></img> 
                                </div>
                            </div>
                           
                            
                        </div>
                    </div>
                </div>
				 </div>
				
	        	<div class="col-md-6">
	        		<div class="product-dtl">
        				<div class="product-info">
		        			<div class="product-name">Honda amaze (2014 model)</div>
							<p class="productdes">Lorem Ipsum Is Simply Dummy</p>
		        			<div class="d-flex align-items-center mb-3">
									<p class="details"><img src={speedometer}  alt=""></img><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
									<p class="details"><img src={gasolinePump} alt=""></img><span>Diesel</span></p>
							</div>
							<p><span class="dealertaglines">Message From The Dealer-</span> Lorem Ipsum Is Simply Dummy Text Typesetting Industry. Lorem Ipsum</p>
		        		</div>
	        			
	        			<div class="row">
	        				<div class="col-md-12 carpoints">							  
								<div class="carpoint">
									<img src={car}  alt=""></img>
									<span>UN14DF134WVQ149788</span>
									<img src={book}  alt=""></img> 
									<img src={barcode}  alt=""></img>
								</div>
							</div>
						</div>
							
							<div class="row">
							<div class="col-md-12">							
								<div class="titlestatus mt-3">
								<p><img src={book} alt=""></img><span>Title status</span> - Title with the dealer</p>
								</div>
	        				</div>
							</div>
							<div class="row">	
							<div class="col-md-12 cars-detail-ins">
	        					<div class="cars-detail-views">
									<a class="car-btns" href="#">view Inspection</a>
									<a class="car-btns-primary" href="#"><img src={tag} alt=""></img>High Bid :<span> $1500</span></a>
								</div>
	        				</div>
	        			</div>
						</div>
						
						<div class="row">
	        				<div class="col-md-6">
								<div class="product-count">
									<h3>Used Car Dealer</h3>
									<div class=" d-flex align-items-center mb-3">
										<p class="details"><img src={Path} alt=""></img><span>Illinois</span></p>
										<p class="details"><img src={present} alt=""></img><span>15%</span></p>
										<p class="details"><img src={brokenline} alt=""></img><span>2.5M</span></p>
									</div>	        										
								</div>
							</div>
							<div class="col-md-6">
								<div class="product-count">	        				
									<img src={carsHonda}  alt=""></img>
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
					 <p><img src={transmission}></img> <span>Transmission</span></p>
					 <p><img src={drivetrain}></img> <span>Drivetrain</span></p>
					 <p><img src={gasolinePump}></img> <span>Fuel Type</span></p>
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
					 <p><img src={transmission}></img> <span>Transmission</span></p>
					 <p><img src={drivetrain}></img> <span>Drivetrain</span></p>
					 <p><img src={gasolinePump}></img> <span>Fuel Type</span></p>
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
					 <p><img src={transmission}></img> <span>Transmission</span></p>
					 <p><img src={drivetrain}></img> <span>Drivetrain</span></p>
					 <p><img src={gasolinePump}></img> <span>Fuel Type</span></p>
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
				<img src={lock} class="img-fluid" alt="..."></img>
			  </div>
              <img src={cars01} class="img-fluid" alt="..."></img>
			  <div class="cars-tag">
				<h4>Best deal</h4>
			  </div>
              <div class="cars-content">		
			  <h3><a href="#">Honda amaze (2014 model)</a></h3>
                <div class="d-flex align-items-center mb-3">
                  <p class="details"><img src={speedometer}  alt=""></img><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                  <p class="details"><img src={gasolinePump} alt=""></img><span>Diesel</span></p>
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
				<img src={lock} class="img-fluid" alt="..."></img>
			  </div>
              <img src={cars01} class="img-fluid" alt="..."></img>
			  <div class="cars-tag">
				<h4>Best deal</h4>
			  </div>
              <div class="cars-content">		
			  <h3><a href="#">Honda amaze (2014 model)</a></h3>
                <div class="d-flex align-items-center mb-3">
                  <p class="details"><img src={speedometer}  alt=""></img><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                  <p class="details"><img src={gasolinePump} alt=""></img><span>Diesel</span></p>
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
				<img src={lock} class="img-fluid" alt="..."></img>
			  </div>
              <img src={cars01} class="img-fluid" alt="..."></img>
			  <div class="cars-tag">
				<h4>Best deal</h4>
			  </div>
              <div class="cars-content">		
			  <h3><a href="#">Honda amaze (2014 model)</a></h3>
                <div class="d-flex align-items-center mb-3">
                  <p class="details"><img src={speedometer}  alt=""></img><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                  <p class="details"><img src={gasolinePump} alt=""></img><span>Diesel</span></p>
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
				<img src={lock} class="img-fluid" alt="..."></img>
			  </div>
              <img src={cars01} class="img-fluid" alt="..."></img>
			  <div class="cars-tag">
				<h4>Best deal</h4>
			  </div>
              <div class="cars-content">		
			  <h3><a href="#">Honda amaze (2014 model)</a></h3>
                <div class="d-flex align-items-center mb-3">
                  <p class="details"><img src={speedometer}  alt=""></img><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                  <p class="details"><img src={gasolinePump} alt=""></img><span>Diesel</span></p>
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
				<img src={lock} class="img-fluid" alt="..."></img>
			  </div>
              <img src={cars01} class="img-fluid" alt="..."></img>
			  <div class="cars-tag">
				<h4>Best deal</h4>
			  </div>
              <div class="cars-content">		
			  <h3><a href="#">Honda amaze (2014 model)</a></h3>
                <div class="d-flex align-items-center mb-3">
                  <p class="details"><img src={speedometer}  alt=""></img><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                  <p class="details"><img src={gasolinePump} alt=""></img><span>Diesel</span></p>
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
				<img src={lock} class="img-fluid" alt="..."></img>
			  </div>
              <img src={cars01} class="img-fluid" alt="..."></img>
			  <div class="cars-tag">
				<h4>Best deal</h4>
			  </div>
              <div class="cars-content">		
			  <h3><a href="#">Honda amaze (2014 model)</a></h3>
                <div class="d-flex align-items-center mb-3">
                  <p class="details"><img src={speedometer}  alt=""></img><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                  <p class="details"><img src={gasolinePump} alt=""></img><span>Diesel</span></p>
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
				<img src={lock} class="img-fluid" alt="..."></img>
			  </div>
              <img src={cars01} class="img-fluid" alt="..."></img>
			  <div class="cars-tag">
				<h4>Best deal</h4>
			  </div>
              <div class="cars-content">		
			  <h3><a href="#">Honda amaze (2014 model)</a></h3>
                <div class="d-flex align-items-center mb-3">
                  <p class="details"><img src={speedometer}  alt=""></img><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                  <p class="details"><img src={gasolinePump} alt=""></img><span>Diesel</span></p>
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
				<img src={lock} class="img-fluid" alt="..."></img>
			  </div>
              <img src={cars01} class="img-fluid" alt="..."></img>
			  <div class="cars-tag">
				<h4>Best deal</h4>
			  </div>
              <div class="cars-content">		
			  <h3><a href="#">Honda amaze (2014 model)</a></h3>
                <div class="d-flex align-items-center mb-3">
                  <p class="details"><img src={speedometer}  alt=""></img><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                  <p class="details"><img src={gasolinePump} alt=""></img><span>Diesel</span></p>
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
				<img src={lock} class="img-fluid" alt="..."></img>
			  </div>
              <img src={cars01} class="img-fluid" alt="..."></img>
			  <div class="cars-tag">
				<h4>Best deal</h4>
			  </div>
              <div class="cars-content">		
			  <h3><a href="#">Honda amaze (2014 model)</a></h3>
                <div class="d-flex align-items-center mb-3">
                  <p class="details"><img src={speedometer}  alt=""></img><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                  <p class="details"><img src={gasolinePump} alt=""></img><span>Diesel</span></p>
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
				<img src={lock} class="img-fluid" alt="..."></img>
			  </div>
              <img src={cars01} class="img-fluid" alt="..."></img>
			  <div class="cars-tag">
				<h4>Best deal</h4>
			  </div>
              <div class="cars-content">		
			  <h3><a href="#">Honda amaze (2014 model)</a></h3>
                <div class="d-flex align-items-center mb-3">
                  <p class="details"><img src={speedometer}  alt=""></img><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                  <p class="details"><img src={gasolinePump} alt=""></img><span>Diesel</span></p>
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
			<img src={appstore} ></img>
			<img src={googleplay} ></img>
		   
          </div>
         
        </div>

      </div>
    </section>

 
    






 

  </main>
       
    </div>
	
)
}
export default Cardetail;