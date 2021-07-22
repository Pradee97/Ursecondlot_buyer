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

const MoreCarFromSeller = () =>{
    const { id } = useParams();
    const [sellerCarDetail,setSellerCarDetail]=useState([]);
    const history = useHistory();
    console.log("id from cardetail",id);
    const getMoreCarFromSeller=()=>{
    let request={
        "seller_id":id,
        buyer_id: JSON.parse(localStorage.getItem("userDetails")).user_id
    }

    console.log("+++++++++++++++",request)
    API.post('SellerCarList/condition',request).then(resp=>{
        console.log("seller ====response",resp.data.data);
        setSellerCarDetail(resp.data.data);
        console.log("Seller car Inventory Detail",resp.data.data);
    
    })
}
    
useEffect(() => {
    getMoreCarFromSeller();
   
},[]);
    
return(
    <div>
        
        <main id="main" class="inner-page-cars">
    
			<div class="back-btn">
				<a class="back-btn-primary" href="/carlist"><i class="bx bx-chevron-left"></i> Back</a>
			</div>		
	
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
					<a class="cta-btns" href="">${moreCar.min_bid}</a>
					<a class="cta-btns-primary" href="/makeurbid">Make Bid</a>
				</div>
              </div>
            </div>
          </div>
		 		
		  ):""}
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
export default MoreCarFromSeller;