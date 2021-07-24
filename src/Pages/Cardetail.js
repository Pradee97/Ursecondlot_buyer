import React, {useState, useEffect} from 'react';
import $ from 'jquery'
import { useHistory, useLocation, useParams } from "react-router-dom";
import API from "../Services/BaseService";
import lock from '../assets/img/lock.svg';
import cars01 from '../assets/img/cars01.png';
import carbrand from '../assets/img/carshonda.jpg';
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
	const history = useHistory();
	
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
const [sellerId,setSellerId]=useState("");
const [carDetail ,setCarDetail] = useState([]) 
const [carInventoryDetail,setCarInventoryDetail]=useState([]);
const { id } = useParams();
const [sellerCarDetail,setSellerCarDetail]=useState([]);
const [lrgImg,setLrgImg]=useState("");

const redirectpage=(pathid)=>{
	//e.preventDefault();
	history.push("/MoreCarFromSeller/"+pathid);
}

function img1Click(img){
	loadLrgImg(img.target.src);
}
function img2Click(img){
	console.log("values passed",img);
	console.log("Imgfile",img.target.src);
	loadLrgImg(img.target.src);
}
function img3Click(img){
	loadLrgImg(img.target.src);
}
function img4Click(img){
	loadLrgImg(img.target.src);
}
function loadLrgImg(img){
	setLrgImg(img);
}
useEffect (()=>{
	// carDetails/condition
	console.log("id value",id)
	const request = {"car_id":id}
	API.post('carDetails/condition',request).then(res=>{
		console.log("response",res.data.data);
	   // const {results} = res.data.data;
		console.log("Response data",res.data.data);
		//if(results.length>0){
		setCarDetail(res.data.data);
		console.log("car Detail",res.data.data);
		setLrgImg(res.data.data[0].image);
		//}
	})
	let rq={
		buyer_id: JSON.parse(localStorage.getItem("userDetails")).user_id
	};
	API.post('BuyerInventoryCarList/condition',rq).then(res=>{
		console.log("response",res.data.data);
	   // const {results} = res.data.data;
		//console.log("Response data",res.data.data);
		//if(results.length>0){
		setCarInventoryDetail(res.data.data);
		console.log("car Inventory Detail",res.data.data);
		const req={
			"seller_id":res.data.data[0].seller_id,
			buyer_id: JSON.parse(localStorage.getItem("userDetails")).user_id
		};
		API.post('SellerCarList/condition',req).then(res=>{
			console.log("response",res.data.data);
		   // const {results} = res.data.data;
			//console.log("Response data",res.data.data);
			//if(results.length>0){
				setSellerCarDetail(res.data.data);
			console.log("Seller car Inventory Detail",res.data.data);
			//}
		})
		//}
	})
	
	

},[])
	
return(
    <div>
        
        <main id="main" class="inner-page-cars">
    <div id="products-details" class="products-details">
	 <div class="container">
			<div class="back-btn">
				<a class="back-btn-primary" href="/carlist"><i class="bx bx-chevron-left"></i> Back</a>
			</div>
	        <div class="row">
			{carDetail.length>0 && <div class="col-md-6">

					<div class="vehicle-detail-banner banner-content clearfix">
						<div class="banner-slider">
							<div class="slider slider-for">
								<div class="slider-banner-image">
									<img  src={lrgImg} alt="no image" /> 
								</div> 
								
							
							</div>
							<div class="slider slider-nav thumb-image">
								{carDetail.length>1?
								<div class="thumbnail-image">
									<div class="thumbImg">
										<img src={carDetail[1].image} alt="" onClick={img1Click} /> 
									</div>
								</div>:""}
								{carDetail.length>2?
								<div class="thumbnail-image">
									<div class="thumbImg">
										<img src={carDetail[2].image} alt="" onClick={img2Click} /> 
									</div>
								</div>:""}
								{carDetail.length>3?
								<div class="thumbnail-image">
									<div class="thumbImg">
										<img src={carDetail[3].image} alt="" onClick={img3Click} /> 
									</div>
								</div>:""}
								{carDetail.length>4?
								<div class="thumbnail-image">
									<div class="thumbImg">
										<img src={carDetail[4].image} alt="" onClick={img4Click} /> 
									</div>
								</div>	:""}
								
																	
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
							<p><span class="dealertaglines">Message From The Dealer-</span> {carDetail[0].dealer_message}</p>
		        		</div>
	        			
	        			<div class="row">
						
	        				<div class="col-md-12 carpoints">
							<label   className= "input-has-value">VIN Number</label>		  
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
								<p><img src={book} alt=""/><span>Title status</span> -{carDetail[0].title_status}</p>
								</div>
	        				</div>
							</div>
							<div class="row">	
							<div class="col-md-12 cars-detail-ins">
	        					<div class="cars-detail-views">
									<a class="car-btns" href="/inspection">View Inspection</a>
									<a class="car-btns-primary" href="/makeurbid"><img src={tag} alt=""/>High Bid :<span> ${carDetail[0].max_bid}</span></a>
								</div>
	        				</div>
	        			</div>
						</div>
						
						<div class="row">
	        				<div class="col-md-6">
								<div class="product-count">
									<h3>{carDetail[0].dealer_type}</h3>
									<div class=" d-flex align-items-center mb-3">
										<p class="details"><img src={Path}  alt=""/><span>Illinois</span></p>
										
										<p class="details"><img src="assets/img/road-with-broken-line.svg" alt=""/><span>{carDetail[0].mileage} M</span></p>
									</div>	        										
								</div>
							</div>
							<div class="col-md-6">
								<div class="product-count carBrand">	        				
									<img src={carbrand}  alt=""/>
								</div>
							</div>	        				
	        			</div>
						<div class="row">
							<div class="col-md-12">
	        					<div class="cars-buy">
									<a class="cars-buy-btns" href="#">Buy now</a>
									<a class="cars-buy-btns-primary" href="/makeurbid">Make Bid</a>
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

		<div class="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
		{sellerCarDetail.length > 0 ? sellerCarDetail
                            .map((moreCar,index) =>

         <div class="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            <div class="car-item">
				<div class="cars-lock">
				<img src={lock} class="img-fluid" alt="..."/>
			  	</div>
              	<img src={moreCar.image} class="img-fluid" alt="..."/>
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
					<a class="cta-btns" href="">${moreCar.min_bid}</a>
					<a class="cta-btns-primary" href="/makeurbid">Make Bid</a>
				</div>
              </div>
            </div>
          </div>
		 		
		  ):""}
		  </div>
		  {sellerCarDetail.length > 0 ? sellerCarDetail.slice(0,1)
                            .map((moreCar,index) =>
		<div class="text-center">
                <a href="JavaScript:void(0)" onClick={()=>{redirectpage(moreCar.seller_id)}} class="more-btn">View More<i class="bx bx-chevron-right"></i></a>
              </div>):""}
		</div>
    </div>
	
	
	<div id="other-dealer-cars" class="other-dealer-cars">
      <div class="container-fluid aos-init aos-animate" data-aos="fade-up">

        <div class="section-title">
          <h2>Same cars from other dealer</h2>          
        </div>

        <div class="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">

         <div class="col-lg-3 col-md-3 col-sm-4 col-xs-6">
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
					<a class="cta-btns-primary" href="/makeurbid">Make Bid</a>
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
					<a class="cta-btns-primary" href="/makeurbid">Make Bid</a>
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
					<a class="cta-btns-primary" href="/makeurbid">Make Bid</a>
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
					<a class="cta-btns-primary" href="/makeurbid">Make Bid</a>
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
					<a class="cta-btns-primary" href="/makeurbid">Make Bid</a>
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