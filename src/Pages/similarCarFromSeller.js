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
import BuyItNow from '../Pages/BuyItNow/BuyItNow';
import Countdown from "react-countdown";

const SimilarCarFromSeller = () =>{

    const { id } = useParams();
    const [similarCarDetail,setSimilarCarDetail]=useState([]);
    const history = useHistory();
    const [similarCarFromSellerFlag,setSimilarCarFromSellerFlag]=useState(false);
   
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(true);

    const [isOpen, setIsOpen] = useState(false);
    const [openBuyItNow, setOpenBuyItNow] = useState(false);
	  // const highBid= useSelector(state => state.CarDetailsReducer.payload.high_bid);

    const [highBid,setHighBid] = useState(null);
    const [makeBitData, setMakeBitData] = useState({});
    const [buyItNowData, setBuyItNowData] = useState({});

    const Completionist = () => <span>{""}</span>;

    const renderer = ({minutes, seconds, completed }) => {
    if (completed) {
        
        return <Completionist />;
    } else {
    
        return (
        <span>
            {minutes}:{seconds}
        </span>
        );
    }
    };
    
    const getMakeBitValue = (data) => {
      const highBid = data
      setHighBid(highBid)
    }
  
  
    const toggleMakeBid = () => {
      setIsOpen(!isOpen);
    }
    const setMakeBitValue = (high_bid,min_price,save_purchase,car_id,time,counterbuyerid,max_price,buy_it_now,comments,transportation,display,proxy_bid,transportation_charge,save_policy,credit_limit) => {
      console.log("check the toggle make bid value")
      setMakeBitData({
        carHighBid: high_bid,
        carMinBid: min_price,
        carId : car_id,
        carSavePurchase: save_purchase,
        redirectPage: "similarcarfrombuyer",
        time:time,
        counter_buyerid:counterbuyerid,
        carMaxBid :max_price,
        buyItNow: buy_it_now,
        comments:comments,
        transportation:transportation,
        display:display,
        carProxyBid:proxy_bid,
        transportationCharge:transportation_charge,
        savePolicy:save_policy,
        creditLimit:credit_limit
      })
    
      toggleMakeBid()
      
      
      
    }

    const toggleBuyItNow = () => {
      setOpenBuyItNow(!openBuyItNow);
    }
  
      const getBuyItNowValue = (data) => {
      const highBid = data
      setHighBid(highBid)
    }
  
    const setBuyItNowValue = (buy_it_now,car_id,) => {
  
      setBuyItNowData({
        buyItNow: buy_it_now,
        carId : car_id,
    
      })
    
      toggleBuyItNow()
      
      
    }

    const getMoreSimilarCars=()=>{
    let request={
        "make":id,
        buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
    }

    
    API.post('OtherDealerCarList/condition',request).then(resp=>{
        
        setSimilarCarDetail(resp.data.data);
        
        setLoading(false);
    
    })
}

// const toggleMakeBid = (high_bid,min_price,save_purchase,car_id,time,counterbuyerid,max_price,buy_it_now,make,comments,transportation,display,proxy_bid) => {
  
//   let makebiddispatch={
//       high_bid: high_bid,
// 			min_price: min_price,
// 			car_id : car_id,
// 			save_purchase: save_purchase,
// 			time:time,
// 			counter_buyerid:counterbuyerid,
// 			max_price:max_price,
// 			buy_it_now: buy_it_now,
//       redirectPage: "similarcarfrombuyer",
//       make: make,
//       comments:comments,
//       transportation:transportation,
//       display:display,
//       proxy_bid:proxy_bid
//   }
//   //dispatch(CarDetailsAction.highBid(high_bid))
//   dispatch(CarDetailsAction.minBid(makebiddispatch))
  
//   setIsOpen(!isOpen);
// }
    
const redirectpage=(pathid,seller_dealer_id)=>{
  //e.preventDefault();
 
  // dispatch(CarListAction.sellerid(seller_dealer_id))
  // history.push("/cardetail/"+pathid);
  history.push({
    pathname: '/cardetail',
    state: {id:pathid,sellerDealerId:seller_dealer_id},
  });
}

useEffect(() => {
  
  let intervalId;
	intervalId = setInterval(() => {
    getMoreSimilarCars();
	}, 30000)
	return () => clearInterval(intervalId);
    
   
},[]);

useEffect(() => {
  

    getMoreSimilarCars();

   
},[highBid]);
    
const addRemoveFavourite=(carid,state,flag)=>{
 ;
  let request={
    buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
      car_id:carid,
      active: !state
  }
  
  API.post('buyer_favourite/add',request).then(res=>{
      // setaddFavourite(res.data.data);
    

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
			  <h3><a href="#">{moreCar.make} {moreCar._type} ({moreCar.model}- {moreCar.year} model)</a></h3>
        <div className="d-flex align-items-center mb-3">
									<p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>{moreCar.miles} m</span></p>
									<p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>{moreCar.fuel_type}</span></p>    
									
									<p className="details buyitnow">
                                                {moreCar.buy_it_now=="" || moreCar.buy_it_now== null || moreCar.buy_it_now== undefined || moreCar.buy_it_now== 0 ?"":
                                                    <a className="cta-btns" onClick={()=>setBuyItNowValue(moreCar.buy_it_now,moreCar.car_id)}>Buy It Now $ {moreCar.buy_it_now}</a>
                                                }
                                                </p> 

								</div>
								<div className="d-flex align-items-center mb-3 dealerType">
									<p className="details">
									<span className="dlrname">{moreCar.dealer_type} </span>
									<span className="dlraddress"><i class="icofont-google-map"></i> {moreCar.location}</span>
									</p>
									<p className="details"><img src={moreCar.logo}/></p>
								</div>
				<div class="cars-prices">

					{/* <a className="cta-btns" href="#">Inventory Number {moreCar.inventory_no}</a> */}
          {moreCar.buy_it_now=="" || moreCar.buy_it_now== null || moreCar.buy_it_now== undefined?"":
          <a className="cta-btns" href="#">Buy It Now $ {moreCar.buy_it_now}</a>
          }
          {moreCar.high_bid=="" || moreCar.high_bid== null || moreCar.high_bid== undefined?"":
          <a className="cta-btns" href="#">High Bid $ {moreCar.high_bid}</a>
          }
          {/* {moreCar.buy_it_now=="" || moreCar.buy_it_now== null || moreCar.buy_it_now== undefined?"":
					<a className="cta-btns" href="#">Counter Bid $ {moreCar.buy_it_now}</a>
					} */}

          {(moreCar.isbuyercounterbid=="me" && moreCar.iscounterbid!==null && (moreCar.time !==0 || moreCar.time!==null)) || ((moreCar.iscounterbid==null || moreCar.iscounterbid=="no" ) && (moreCar.isbuyercounterbid==null || moreCar.isbuyercounterbid=="not")&&(moreCar.time ==0 || moreCar.time==null))?
          <a className="cta-btns-primary" href="JavaScript:void(0)" onClick={()=>setMakeBitValue(moreCar.high_bid, moreCar.min_price, moreCar.save_purchase, moreCar.car_id, moreCar.time, moreCar.counter_buyer_dealer_id, moreCar.max_price, moreCar.buy_it_now,moreCar.comments,moreCar.transportation,moreCar.display,moreCar.proxy_bid,moreCar.transportation_charge,moreCar.save_policy,moreCar.credit_limit)} >Make Bid</a>
          :<a class="cta-btns lockedcarBtn">Locked up for Higher Bid </a>}

          {(moreCar.buyer_high_bid==moreCar.high_bid || moreCar.buyer_high_bid!==moreCar.high_bid) &&       
          <div class= {(moreCar.time!==null && moreCar.time < 20)?"countownBlock":""} >
              <Countdown date={Date.now() + (moreCar.time!==null && moreCar.time < 20 ? moreCar.time*60*1000 :0)  } renderer={renderer} />                                               
          </div>}

					{/* <a class="cta-btns-primary" onClick={()=>setMakeBitValue(moreCar.high_bid, moreCar.min_price, moreCar.save_purchase, moreCar.car_id, moreCar.time, moreCar.counter_buyer_dealer_id, moreCar.max_price, moreCar.buy_it_now,moreCar.make,moreCar.comments,moreCar.transportation,moreCar.display,moreCar.proxy_bid,moreCar.transportation_charge,moreCar.save_policy)}>Make Bid</a> */}
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
        <Makeurbid toggle={toggleMakeBid} setMakeBitValue={makeBitData} getMakeBitValue={getMakeBitValue} />
      </>}
      handleClose={toggleMakeBid}
    />}

          {openBuyItNow && <Popup
						isClose={false}
						content={<>
							<BuyItNow toggle={toggleBuyItNow} setBuyItNowValue={buyItNowData} getBuyItNowValue={getBuyItNowValue}  />
						</>}
						handleClose={toggleBuyItNow}
					/>}

  </main>
}
    </div>
)

}
export default SimilarCarFromSeller;