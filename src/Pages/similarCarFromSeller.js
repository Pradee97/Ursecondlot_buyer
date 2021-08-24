import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom";
import API from "../Services/BaseService";
import lock from '../assets/img/lock.png';
import appstore from '../assets/img/appstore.png';
import googleplay from '../assets/img/googleplay.png';
import speedometer from '../assets/img/speedometer.svg';
import gasolinePump from '../assets/img/gasolinePump.svg';
import locked from '../../src/assets/img/locked.png';
import { useDispatch, useSelector } from 'react-redux';
import CarListAction from './CarList/CarListAction';
import Loading from"../Component/Loading/Loading";
import Popup from '../Component/Popup/Popup';
import Makeurbid from './Makeurbid';
import CarDetailsAction from './CarDetails/CarDetailsAction';

const SimilarCarFromSeller = () =>{

    const { id } = useParams();
    const [similarCarDetail,setSimilarCarDetail]=useState([]);
    const history = useHistory();
    const [similarCarFromSellerFlag,setSimilarCarFromSellerFlag]=useState(false);
    console.log("id from cardetail",id);
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(true);

    const [isOpen, setIsOpen] = useState(false);
	  const highBid= useSelector(state => state.CarDetailsReducer.payload.high_bid);

    const getMoreSimilarCars=()=>{
    let request={
        "make":id,
        buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
    }

    console.log("+++++++++++++++",request)
    API.post('OtherDealerCarList/condition',request).then(resp=>{
        console.log("similar cars from other dealers ====response",resp.data.data);
        setSimilarCarDetail(resp.data.data);
        console.log("similar car  Detail",resp.data.data);
        setLoading(false);
    
    })
}

const toggleMakeBid = (high_bid,min_bid,car_id,save_purchase,make) => {
  console.log("check the high bid value",high_bid)
  let makebiddispatch={
    high_bid: high_bid,
    min_bid: min_bid,
    car_id : car_id,
    save_purchase: save_purchase,
    redirectPage: "similarcarfrombuyer",
    make: make
  }
  //dispatch(CarDetailsAction.highBid(high_bid))
  dispatch(CarDetailsAction.minBid(makebiddispatch))
  
  setIsOpen(!isOpen);
}
    
const redirectpage=(pathid,seller_dealer_id)=>{
  //e.preventDefault();
  console.log("seller_dealer_id+++++",seller_dealer_id)
  dispatch(CarListAction.sellerid(seller_dealer_id))
  history.push("/cardetail/"+pathid);
}
useEffect(() => {
    getMoreSimilarCars();
   
},[highBid]);
    
const addRemoveFavourite=(carid,state,flag)=>{
  console.log("inside addremove");
  let request={
    buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
      car_id:carid,
      active: !state
  }
  console.log("request",request);
  API.post('buyer_favourite/add',request).then(res=>{
      // setaddFavourite(res.data.data);
      console.log("add Fav Inventory Detail",res.data.data);

      if(flag==='SimilarCarFromSellerFlag'){
        setSimilarCarFromSellerFlag(!similarCarFromSellerFlag)
      }
  })
}

useEffect(() => {
  getMoreSimilarCars();
 
},[similarCarFromSellerFlag]);



return(
    <div>
         {loading?<Loading/>:
        <main id="main" class="inner-page-cars">
    
				
	
	<div id="dealer-cars" class="dealer-cars">
      <div class="container-fluid aos-init aos-animate">

      

      {/* <div class="container-fluid aos-init aos-animate" data-aos="fade-up"> */}
        <div class="section-title">
        <div class="back-btn">
				<a class="back-btn-primary" href="/carlist"><i class="bx bx-chevron-left"></i> Back</a>
			</div>
          <h2>SIMILAR CARS FROM OTHER DEALER</h2>          
        </div>
		<div class="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
		{similarCarDetail.length > 0 ? similarCarDetail
                            .map((moreCar,index) =>

         <div class="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            <div class="car-item">
				<div class="cars-lock">
				<img src={(moreCar.isFavourite===0)? locked : lock} onClick={()=>addRemoveFavourite(moreCar.car_id,moreCar.isFavourite,'SimilarCarFromSellerFlag')} />
			  	</div>
              	<img src={moreCar.image} onClick={()=>{redirectpage(moreCar.car_id,moreCar.seller_dealer_id)}} class="carImg" alt="..."/>
                {/* {moreCar.isbestSale?
				<div class="cars-tag">
					<h4>{moreCar.deal_name}</h4>
				
				</div>:""} */}
              <div class="cars-content">		
			  <h3><a href="#">{moreCar.make} {moreCar._type} ({moreCar.model} model)</a></h3>
        <div className="d-flex align-items-center mb-3">
            <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>{moreCar.miles} m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
            <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>{moreCar.fuel_type}</span></p>    
        </div>
        <div className="d-flex align-items-center mb-3">
            <p className="details"><span>{moreCar.dealer_type} </span></p>&nbsp;&nbsp;&nbsp;&nbsp;
            <p className="details"><img src={moreCar.image}/></p>
        </div>
				
				<div class="cars-prices">

					<a className="cta-btns" href="#">Inventory Number {moreCar.inventory_no}</a>
          <a className="cta-btns" href="#">Seller Price ${moreCar.max_bid}</a>
          {moreCar.high_bid=="" || moreCar.high_bid== null || moreCar.high_bid== undefined?
          <a className="cta-btns" href="#">High Bid $ {moreCar.min_bid}</a>:
          <a className="cta-btns" href="#">High Bid $ {moreCar.high_bid}</a>
          }
					<a class="cta-btns-primary" onClick={()=>toggleMakeBid(moreCar.high_bid,moreCar.min_bid,moreCar.car_id,moreCar.save_purchase,moreCar.make)}>Make Bid</a>
				</div>
              </div>
            </div>
          </div>
		 		
		  ):""}
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
    {isOpen && <Popup
      isClose={false}
      content={<>
        <Makeurbid toggle={toggleMakeBid} />
      </>}
      handleClose={toggleMakeBid}
    />}
  </main>
}
    </div>
)

}
export default SimilarCarFromSeller;