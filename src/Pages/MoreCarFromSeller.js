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
  const highBid= useSelector(state => state.CarDetailsReducer.payload.high_bid);

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
  
const toggleMakeBid = (high_bid,min_price,save_purchase,car_id,time,counterbuyerid,max_price,buy_it_now,make,comments,transportation,display,proxy_bid) => {
  console.log("check the high bid value",high_bid)
  let makebiddispatch={
    high_bid: high_bid,
    min_price: min_price,
    car_id : car_id,
    save_purchase: save_purchase,
    time:time,
    counter_buyerid:counterbuyerid,
    max_price:max_price,
    buy_it_now: buy_it_now,
    redirectPage: "morecarfrombuyer",
    seller_dealer_id:id,
    comments:comments,
		transportation:transportation,
		display:display,
		proxy_bid:proxy_bid,
  }
  //dispatch(CarDetailsAction.highBid(high_bid))
  dispatch(CarDetailsAction.minBid(makebiddispatch))
  
  setIsOpen(!isOpen);
}

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
   
const redirectpage=(pathid,seller_id)=>{
  //e.preventDefault();
  console.log("seller_id+++++",seller_id)
  dispatch(CarListAction.sellerid(seller_id))
  history.push("/cardetail/"+pathid);
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
    
return(
    <div>
        {loading?<Loading/>:
        <main id="main" class="inner-page-cars">
    
				
	
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
              	<img src={moreCar.image} onClick={()=>{redirectpage(moreCar.car_id,moreCar.seller_id)}} class="carImg" alt="..."/>
        {moreCar.isbestSale?
				<div class="cars-tag">
					<h4>{moreCar.deal_name}</h4>
				</div>:""}
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
					<a class="cta-btns-primary" onClick={()=>toggleMakeBid(moreCar.high_bid, moreCar.min_price, moreCar.save_purchase, moreCar.car_id, moreCar.time, moreCar.counter_buyer_dealer_id, moreCar.max_price, moreCar.buy_it_now,moreCar.comments,moreCar.transportation,moreCar.display,moreCar.proxy_bid)}>Make Bid</a>
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
export default MoreCarFromSeller;