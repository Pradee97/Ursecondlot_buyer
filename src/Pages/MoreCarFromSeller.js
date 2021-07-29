import React, {useState, useEffect} from 'react';
import { useHistory, useLocation, useParams } from "react-router-dom";
import API from "../Services/BaseService";
import lock from '../assets/img/lock.svg';
import appstore from '../assets/img/appstore.png';
import googleplay from '../assets/img/googleplay.png';
import speedometer from '../assets/img/speedometer.svg';
import gasolinePump from '../assets/img/gasolinePump.svg';

const MoreCarFromSeller = () =>{

    const { id } = useParams();
    const [sellerCarDetail,setSellerCarDetail]=useState([]);
    const history = useHistory();
    console.log("id from cardetail",id);
    const [data,setData]=useState("");

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

const OnSearch = (e) => {
  setData(e.target.value)
  console.log("/////////=====",e.target.value)
}

const onKeydowninSearch = (event) => {
  if (event.key === 'Enter') {
      // setCurrentPage(1)
      searchSellerCarDetail();
    }
}

const searchSellerCarDetail = () => {
  console.log("/////////",data)
  let request={
    "seller_id":id,
    buyer_id: JSON.parse(localStorage.getItem("userDetails")).user_id,
    data: data
      
  }
  API.post("SellerCarSearch/condition",request)
  .then((resp)=>{
     
    setSellerCarDetail(resp.data.data);
   
  },
  (error) => {
      console.log(error);
    }
  )
  .catch(err => { console.log(err); });
}
    
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
        <div className="filtersblock  col-lg-6 SalesRepsSearch  row" >
          <div className="input-group searchbox ">
              <input type="text"  className="form-control border"  placeholder="model/make" onKeyDown={onKeydowninSearch} onChange={OnSearch}></input>
              <span className="input-group-append" >
              <button className="btn ms-n5" type="button" id="btntest" name="btntest" onClick={searchSellerCarDetail} ><i className='bx bx-search'></i></button>
              </span>                                
          </div>
      </div>
		<div class="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
		{sellerCarDetail.length > 0 ? sellerCarDetail
                            .map((moreCar,item,index) =>

         <div class="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            <div class="car-item">
				<div class="cars-lock">
				<img src={lock} class="img-fluid" alt="..."/>
			  	</div>
              	<img src={moreCar.image} class="img-fluid" alt="..."/>
        {item.isbestSale?
				<div class="cars-tag">
					<h4>{item.deal_name}</h4>
				</div>:""}
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