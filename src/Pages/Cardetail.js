import React, {useState, useEffect} from 'react';
import $ from 'jquery'
import { useHistory, useLocation } from "react-router-dom";

import API from "../Services/BaseService";


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
import cardetail1 from '../assets/img/cardetail1.jpg'
import cardetail2 from '../assets/img/cardetail2.jpg'
import cardetail3 from '../assets/img/cardetail3.jpg'
import cardetail4 from '../assets/img/cardetail4.jpg'
import cardetail5 from '../assets/img/cardetail5.jpg'

const Cardetail = () =>{

	
// $( document ).ready(function() {
// 	$('.slider-for').slick({
// 		slidesToShow: 1,
// 		slidesToScroll: 1,
// 		arrows: false,
// 		fade: true,
// 		asNavFor: '.slider-nav'
// 	});
// 	$('.slider-nav').slick({
// 		slidesToShow: 4,
// 		slidesToScroll: 1,
// 		vertical:true,
// 		asNavFor: '.slider-for',
// 		dots: false,
// 		focusOnSelect: true,
// 		verticalSwiping:true,
// 		responsive: [
// 		{
// 			breakpoint: 992,
// 			settings: {
// 			  vertical: false,
// 			}
// 		},
// 		{
// 		  breakpoint: 768,
// 		  settings: {
// 			vertical: false,
// 		  }
// 		},
// 		{
// 		  breakpoint: 580,
// 		  settings: {
// 			vertical: false,
// 			slidesToShow: 3,
// 		  }
// 		},
// 		{
// 		  breakpoint: 380,
// 		  settings: {
// 			vertical: false,
// 			slidesToShow: 2,
// 		  }
// 		}
// 		]
// 	});
// 	});

const [carDetail ,setCarDetail] = useState([]) 
const [carInventoryDetail,setCarInventoryDetail]=useState([]);

useEffect (()=>{
	// carDetails/condition
	const request = {"car_id":1}
	API.post('carDetails/condition',request).then(res=>{
		console.log("response",res.data.data);
	   // const {results} = res.data.data;
		console.log("Response data",res.data.data);
		//if(results.length>0){
		setCarDetail(res.data.data);
		console.log("car Detail",res.data.data);
		//}
	})
	API.post('BuyerInventoryCarList/condition').then(res=>{
		console.log("response",res.data.data);
	   // const {results} = res.data.data;
		//console.log("Response data",res.data.data);
		//if(results.length>0){
			setCarInventoryDetail(res.data.data);
		console.log("car Inventory Detail",res.data.data);
		//}
	})
},[])
	
return(
    <div>
        
        <main id="main" class="inner-page-cars">
    <div id="products-details" class="products-details">
	 <div class="container">
			<div class="back-btn">
				<a class="back-btn-primary" href="#"><i class="bx bx-chevron-left"></i> Back</a>
			</div>
	        <div class="row">
			{carDetail.length>0 && <div class="col-md-6">

					<div class="vehicle-detail-banner banner-content clearfix">
						<div class="banner-slider">
							<div class="slider slider-for">
								<div class="slider-banner-image">
									{/* <img src={cardetail1} alt="" />  */}
									<img src={carDetail[0].image} alt="no image" /> 
								</div> 
								{/* <div class="slider-banner-image">
									<img src={cardetail2} alt="" /> 
								</div> 
								<div class="slider-banner-image">
									<img src={cardetail3} alt="" /> 
								</div> 
								<div class="slider-banner-image">
									<img src={cardetail4} alt="" /> 
								</div> 
								<div class="slider-banner-image">
									<img src={cardetail5} alt="" /> 
								</div>  */}
							
							</div>
							<div class="slider slider-nav thumb-image">
								{/* <div class="thumbnail-image">
									<div class="thumbImg">
										<img src={cardetail1} alt="" /> 
									</div>
								</div> */}
								{/* <div class="thumbnail-image">
									<div class="thumbImg">
										<img src={cardetail2} alt="" /> 
									</div>
								</div>
								<div class="thumbnail-image">
									<div class="thumbImg">
										<img src={cardetail3} alt="" /> 
									</div>
								</div>
								<div class="thumbnail-image">
									<div class="thumbImg">
										<img src={cardetail4} alt="" /> 
									</div>
								</div>
								<div class="thumbnail-image">
									<div class="thumbImg">
										<img src={cardetail5} alt="" /> 
									</div>
								</div>								 */}
							</div>
						</div>
					</div>
				</div>}
	        	{ carDetail.length >0 && 
					<div class="col-md-6">
	        		<div class="product-dtl">
        				<div class="product-info">
		        			<div class="product-name">{carDetail[0].make} {carDetail[0].vehicle_type}({carDetail[0].model})</div>
							<p class="productdes">Lorem Ipsum Is Simply Dummy</p>
		        			<div class="d-flex align-items-center mb-3">
									<p class="details"><img src={speedometer}  alt=""/><span>{carDetail[0].miles} m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
									<p class="details"><img src={gasolinePump} alt=""/><span>{carDetail[0].fuel_type}</span></p>
							</div>
							<p><span class="dealertaglines">Message From The Dealer-</span> {carDetail[0].internal_notes}</p>
		        		</div>
	        			
	        			<div class="row">
	        				<div class="col-md-12 carpoints">							  
								<div class="carpoint">
									<img src={car}  alt=""/>
									<span>{carDetail[0].engine}</span>
									<img src={book}  alt=""/> 
									<img src={barcode}  alt=""/>
								</div>
							</div>
						</div>
							
							<div class="row">
							<div class="col-md-12">							
								<div class="titlestatus mt-3">
								<p><img src={book} alt=""/><span>Title status</span> - Title with the dealer</p>
								</div>
	        				</div>
							</div>
							<div class="row">	
							<div class="col-md-12 cars-detail-ins">
	        					<div class="cars-detail-views">
									<a class="car-btns" href="#">view Inspection</a>
									<a class="car-btns-primary" href="#"><img src={tag} alt=""/>High Bid :<span> ${carDetail[0].max_bid}</span></a>
								</div>
	        				</div>
	        			</div>
						</div>
						
						<div class="row">
	        				<div class="col-md-6">
								<div class="product-count">
									<h3>Used Car Dealer</h3>
									<div class=" d-flex align-items-center mb-3">
										<p class="details"><img src={Path}  alt=""/><span>Illinois</span></p>
										<p class="details"><img src="assets/img/persent.svg" alt=""/><span>15%</span></p>
										<p class="details"><img src="assets/img/road-with-broken-line.svg" alt=""/><span>{carDetail[0].mileage} M</span></p>
									</div>	        										
								</div>
							</div>
							<div class="col-md-6">
								<div class="product-count">	        				
									<img src={speedometer}  alt=""/>
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
	        		</div> }
	        	</div>
	        </div> 
		</div>
	
		{ carDetail.length >0 && <div id="carspecifation" class="carspecifation">
      <div class="container">
		  <div class="carspecifationblock col-lg-12">
			<div class="section-title">
			  <h2>Car Specification</h2>
			</div>
			<div class="row content">
				  <div class="col-lg-2">
					<div class="specifati">
					 <p><img src={transmission}/> <span>Transmission</span></p>
					 <p><img src={drivetrain}/> <span>Drivetrain</span></p>
					 <p><img src={gasolinePump}/> <span>Fuel Type</span></p>
					</div>
				  </div>
				  <div class="col-lg-2">
					<div class="specifati2">
					 <p>Automatic</p>
					 <p>Rwd</p>
					 <p>{carDetail[0].fuel_type}</p>
					</div>
				  </div>
				  <div class="col-lg-2">
					<div class="specifati">
					 <p><img src={transmission}/> <span>Transmission</span></p>
					 <p><img src={drivetrain}/> <span>Drivetrain</span></p>
					 <p><img src={gasolinePump}/> <span>Fuel Type</span></p>
					</div>
				  </div>
				  <div class="col-lg-2">
					<div class="specifati2">
					 <p>Automatic</p>
					 <p>Rwd</p>
					 <p>{carDetail[0].fuel_type}</p>
					</div>
				  </div>
				  <div class="col-lg-2">
					<div class="specifati">
					 <p><img src={transmission}/> <span>Transmission</span></p>
					 <p><img src={drivetrain}/> <span>Drivetrain</span></p>
					 <p><img src={gasolinePump}/> <span>Fuel Type</span></p>
					</div>
				  </div>
				  <div class="col-lg-2">
					<div class="specifati2">
					 <p>Automatic</p>
					 <p>Rwd</p>
					 <p>{carDetail[0].fuel_type}</p>
					</div>
				  </div>
				</div>
			</div>
		</div>
    </div>}
	
	<div id="dealer-cars" class="dealer-cars">
      <div class="container-fluid aos-init aos-animate">
      {/* <div class="container-fluid aos-init aos-animate" data-aos="fade-up"> */}
        <div class="section-title">
          <h2>More cars from the dealer</h2>          
        </div>

		{carInventoryDetail.length > 0 ? carInventoryDetail
                            .map((moreCar,index) =><div class="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">

         <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
            <div class="car-item">
			<div class="cars-lock">
				<img src={lock} class="img-fluid" alt="..."/>
			  </div>
              <img src={cars01} class="img-fluid" alt="..."/>
			  <div class="cars-tag">
				<h4>Best deal</h4>
			  </div>
              <div class="cars-content">		
			  <h3><a href="#">{moreCar.make} {moreCar._type} ({moreCar.model} model)</a></h3>
                <div class="d-flex align-items-center mb-3">
                  <p class="details"><img src={speedometer}  alt=""/><span>{moreCar.miles} m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                  <p class="details"><img src={gasolinePump} alt=""/><span>{moreCar.fuel_type}</span></p>
                </div>
				
				<div class="cars-prices">
					<a class="cta-btns" href="register.html">${moreCar.min_bid}</a>
					<a class="cta-btns-primary" href="register.html">Make Bid</a>
				</div>
              </div>
            </div>
          </div>
		 		
		  </div>):""}
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
				<img src={lock} class="img-fluid" alt="..."/>
			  </div>
              <img src={cars01} class="img-fluid" alt="..."/>
			  <div class="cars-tag">
				<h4>Best deal</h4>
			  </div>
              <div class="cars-content">		
			  <h3><a href="#">Honda amaze (2014 model)</a></h3>
                <div class="d-flex align-items-center mb-3">
                  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>
                  {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
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
				<img src={lock} class="img-fluid" alt="..."/>
			  </div>
              <img src={cars01} class="img-fluid" alt="..."/>
			  <div class="cars-tag">
				<h4>Best deal</h4>
			  </div>
              <div class="cars-content">		
			  <h3><a href="#">Honda amaze (2014 model)</a></h3>
                <div class="d-flex align-items-center mb-3">
                  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
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
				<img src={lock} class="img-fluid" alt="..."/>
			  </div>
              <img src={cars01} class="img-fluid" alt="..."/>
			  <div class="cars-tag">
				<h4>Best deal</h4>
			  </div>
              <div class="cars-content">		
			  <h3><a href="#">Honda amaze (2014 model)</a></h3>
                <div class="d-flex align-items-center mb-3">
                  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
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
				<img src={lock} class="img-fluid" alt="..."/>
			  </div>
              <img src={cars01} class="img-fluid" alt="..."/>
			  <div class="cars-tag">
				<h4>Best deal</h4>
			  </div>
              <div class="cars-content">		
			  <h3><a href="#">Honda amaze (2014 model)</a></h3>
                <div class="d-flex align-items-center mb-3">
                  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
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
				<img src={lock} class="img-fluid" alt="..."/>
			  </div>
              <img src={cars01} class="img-fluid" alt="..."/>
			  <div class="cars-tag">
				<h4>Best deal</h4>
			  </div>
              <div class="cars-content">		
			  <h3><a href="#">Honda amaze (2014 model)</a></h3>
                <div class="d-flex align-items-center mb-3">
                  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
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
          <img src={appstore} />
			<img src={googleplay} />
		   
          </div>
         
        </div>

      </div>
    </section>

  </main>

    </div>
)

}
export default Cardetail;