import React, {useState, useEffect} from 'react';
import { useHistory, useLocation, useParams } from "react-router-dom";
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
import LateFee from '../Pages/LateFee/LateFee';

const MoreCarFromSeller = () =>{

  const dispatch = useDispatch();
  const { id } = useParams();
  const [sellerCarDetail,setSellerCarDetail]=useState([]);
  const history = useHistory();
  console.log("id from cardetail",id);
  const [data,setData]=useState("");
  const [moreCarFlag,setMoreCarFlag]=useState(false);
  const [loading,setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [openBuyItNow, setOpenBuyItNow] = useState(false);
  // const highBid= useSelector(state => state.CarDetailsReducer.payload.high_bid);

  const [highBid,setHighBid] = useState(null);
  const [makeBitData, setMakeBitData] = useState({});
  const [buyItNowData, setBuyItNowData] = useState({});

  const [isLateFee, setIsLateFee] = useState(false);
  const [lateFeeValue, setLateFeeValue] = useState(0);

  const toggleLateFee = () => {
    setIsLateFee(!isLateFee);
  }

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
	const setMakeBitValue = (high_bid,min_price,save_purchase,car_id,time,counterbuyerid,max_price,buy_it_now,comments,transportation,display,proxy_bid,transportation_charge,save_policy,credit_limit,lot_fee,image,model,make,year,seller_dealer_id) => {
		console.log("check the toggle make bid value")
		setMakeBitData({
			carHighBid: high_bid,
			carMinBid: min_price,
			carId : car_id,
			carSavePurchase: save_purchase,
			redirectPage: "morecarfrombuyer",
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
      creditLimit:credit_limit,
      lotFee:lot_fee,
      image:image,
			model:model,
			make:make,	
			year:year,
      sellerDealerId : seller_dealer_id
      
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

	const setBuyItNowValue = (buy_it_now,car_id,image,model,make,year,price,transportation,transportation_charge,lot_fee,credit_limit,seller_dealer_id) => {

		setBuyItNowData({
			buyItNow: buy_it_now,
			carId : car_id,
      image : image,
      model : model,
      make : make, 
      year : year,
      price : price,
      transportation : transportation,
      transportationCharge : transportation_charge,
      lotFee:lot_fee,
      creditLimit : credit_limit,
      sellerDealerId : seller_dealer_id
	
		})
	
		toggleBuyItNow()
		
		
	}

    const getMoreCarFromSeller=()=>{

    let request={
        "seller_dealer_id":id,
        buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
    }

    console.log("+++++++++++++++",request)
    API.post('SellerCarList/condition',request).then(resp=>{
        console.log("seller ====response",resp.data.data);
        setSellerCarDetail(resp.data.data);
        console.log("Seller car Inventory Detail",resp.data.data);
        setLoading(false);
    
    })
}
  
// const toggleMakeBid = (high_bid,min_price,save_purchase,car_id,time,counterbuyerid,max_price,buy_it_now,make,comments,transportation,display,proxy_bid) => {
//   console.log("check the high bid value",high_bid)
//   let makebiddispatch={
//     high_bid: high_bid,
//     min_price: min_price,
//     car_id : car_id,
//     save_purchase: save_purchase,
//     time:time,
//     counter_buyerid:counterbuyerid,
//     max_price:max_price,
//     buy_it_now: buy_it_now,
//     redirectPage: "morecarfrombuyer",
//     seller_dealer_id:id,
//     comments:comments,
// 		transportation:transportation,
// 		display:display,
// 		proxy_bid:proxy_bid,
//   }
//   //dispatch(CarDetailsAction.highBid(high_bid))
//   dispatch(CarDetailsAction.minBid(makebiddispatch))
  
//   setIsOpen(!isOpen);
// }

useEffect(() => {

  let intervalId;
	intervalId = setInterval(() => {
    getMoreCarFromSeller();
	}, 30000)
	return () => clearInterval(intervalId);
   
   
},[]);

useEffect(() => {

    getMoreCarFromSeller();
   
},[highBid]);

// const OnSearch = (e) => {
//   setData(e.target.value)
//   console.log("/////////=====",e.target.value)
// }

// const onKeydowninSearch = (event) => {
//   if (event.key === 'Enter') {
//       // setCurrentPage(1)
//       searchSellerCarDetail();
//     }
// }

const searchSellerCarDetail = () => {
  console.log("/////////",data)
  let request={
    "seller_id":id,
    buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
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
   
const redirectpage=(pathid,seller_dealer_id)=>{
  //e.preventDefault();
  console.log("seller_dealer_id+++++",seller_dealer_id)
  // dispatch(CarListAction.sellerid(seller_dealer_id))
  // history.push("/cardetail/"+pathid);
  history.push({
    pathname: '/cardetail',
    state: {id:pathid,sellerDealerId:seller_dealer_id},
  });
}

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

      if(flag==='morecar'){
        setMoreCarFlag(!moreCarFlag)
      }
  })
}

useEffect(() => {

  getMoreCarFromSeller();
 
},[moreCarFlag]);

const getlateFee=()=>{
	let request={
		buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
	}
	
	API.post('getlatefee/condition',request).then(res=>{
	   if(res.data.data.length){
		
   console.log("check +++++ ", res.data.data.filter(value=>value.status=="yes")[0]?.status || "no" )
		const lateFeeValueStatus=res.data.data.filter(value=>value.status=="yes")[0]?.status || "no" 
		setIsLateFee(lateFeeValueStatus==="yes")
		setLateFeeValue(res.data.data.filter(value=>value.late_fee>0)[0]?.late_fee || 0)
	   }
	  

	}).catch(err=>{console.log(err);});
}

useEffect(() => {

	getlateFee()

},[]);
    
return(
    <div>
        {loading?<Loading/>:
        <main id="main" class="inner-page-cars moreCarListPage">
    
				
	
	<div id="dealer-cars" class="dealer-cars">
      <div class="container-fluid aos-init aos-animate">

      <div class="back-btn">
				<a class="back-btn-primary" href="/carlist"><i class="bx bx-chevron-left"></i> Back</a>
			</div>

      {/* <div class="container-fluid aos-init aos-animate" data-aos="fade-up"> */}
        <div class="section-title">
       
          <h2>More cars from the dealer</h2>          
        </div>
        {/* <div className="filtersblock  col-lg-6 SalesRepsSearch  row" >
          <div className="input-group searchbox ">
              <input type="text"  className="form-control border"  placeholder="model/make/year" onKeyDown={onKeydowninSearch} onChange={OnSearch}></input>
              <span className="input-group-append" >
              <button className="btn ms-n5" type="button" id="btntest" name="btntest" onClick={searchSellerCarDetail} ><i className='bx bx-search'></i></button>
              </span>                                
          </div>
      </div> */}
		<div class="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
		{sellerCarDetail.length > 0 ? sellerCarDetail
                            .map((moreCar,item,index) =>

         <div class="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            <div class="car-item">
				<div class="cars-lock">
				<img src={(moreCar.isFavourite===0)? locked : lock} onClick={()=>addRemoveFavourite(moreCar.car_id,moreCar.isFavourite,'morecar')} />
			  	</div>
              	<img src={moreCar.image} onClick={()=>{redirectpage(moreCar.car_id,moreCar.seller_dealer_id)}} class="carImg" alt="..."/>
        {moreCar.isbestSale?
				<div class="cars-tag">
					<h4>{moreCar.deal_name}</h4>
				</div>:""}
              <div class="cars-content">		
			  <h3><a href="#">{moreCar.make} {moreCar._type} ({moreCar.model} model)</a></h3>
        <div className="d-flex align-items-center mb-3">
									<p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>{moreCar.miles} m</span></p>
									<p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>{moreCar.fuel_type}</span></p>    
									
									<p className="details buyitnow">
                                                {moreCar.buy_it_now=="" || moreCar.buy_it_now== null || moreCar.buy_it_now== undefined || moreCar.buy_it_now== 0?"":
                                                    <a className={`${lateFeeValue > 0 && 'buy-it-disable-btn'} cta-btns`} href="JavaScript:void(0)" onClick={()=>lateFeeValue === 0 && setBuyItNowValue(moreCar.buy_it_now,moreCar.car_id,moreCar.image,moreCar.model,moreCar.make,moreCar.year,moreCar.price,moreCar.transportation,moreCar.transportation_charge,moreCar.lot_fee,moreCar.credit_limit,moreCar.seller_dealer_id)}>Buy It Now $ {moreCar.buy_it_now}</a>
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
          
					{moreCar.high_bid=="" || moreCar.high_bid== null || moreCar.high_bid== undefined?"":
          <a className="cta-btns" href="#">High Bid $ {moreCar.high_bid}</a>
          }
          {/* {moreCar.buy_it_now=="" || moreCar.buy_it_now== null || moreCar.buy_it_now== undefined?"":
					<a className="cta-btns" href="#">Counter Bid $ {moreCar.buy_it_now}</a>
					} */}

          {(moreCar.isbuyercounterbid=="me" && moreCar.iscounterbid!==null && (moreCar.time !==0 || moreCar.time!==null)) || ((moreCar.iscounterbid==null || moreCar.iscounterbid=="no" ) && (moreCar.isbuyercounterbid==null || moreCar.isbuyercounterbid=="not")&&(moreCar.time ==0 || moreCar.time==null))?
          <a className={`${lateFeeValue > 0 && 'buy-it-disable-btn'} cta-btns-primary`}  href="JavaScript:void(0)" onClick={()=>lateFeeValue === 0 && setMakeBitValue(moreCar.high_bid, moreCar.min_price, moreCar.save_purchase, moreCar.car_id, moreCar.time, moreCar.counter_buyer_dealer_id, moreCar.max_price, moreCar.buy_it_now,moreCar.comments,moreCar.transportation,moreCar.display,moreCar.proxy_bid,moreCar.transportation_charge,moreCar.save_policy,moreCar.credit_limit,moreCar.lot_fee,moreCar.image,moreCar.model,moreCar.make,moreCar.year,moreCar.seller_dealer_id)} >Make Bid</a>
          :<a class="cta-btns lockedcarBtn">Locked up for Higher Bid </a>}

          {(moreCar.buyer_high_bid==moreCar.high_bid || moreCar.buyer_high_bid!==moreCar.high_bid) &&       
          <div class= {(moreCar.time!==null && moreCar.time < 20)?"countownBlock":""} >
              <Countdown date={Date.now() + (moreCar.time!==null && moreCar.time < 20 ? moreCar.time*60*1000 :0)  } renderer={renderer} />                                               
          </div>}

					{/* <a class="cta-btns-primary" onClick={()=>setMakeBitValue(moreCar.high_bid, moreCar.min_price, moreCar.save_purchase, moreCar.car_id, moreCar.time, moreCar.counter_buyer_dealer_id, moreCar.max_price, moreCar.buy_it_now,moreCar.comments,moreCar.transportation,moreCar.display,moreCar.proxy_bid,moreCar.transportation_charge,moreCar.save_policy)}>Make Bid</a> */}
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

      {isLateFee && <Popup
          isClose={false}
          content={<>
            <LateFee toggle={toggleLateFee} />
          </>}
          handleClose={toggleLateFee}
      />} 

  </main>
}
    </div>
)

}
export default MoreCarFromSeller;