import React, {useState, useEffect} from 'react';
import $ from 'jquery'
import { useHistory, useLocation, useParams } from "react-router-dom";
import API from "../Services/BaseService";
import lock from '../assets/img/lock.png';
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
import {CopyToClipboard} from 'react-copy-to-clipboard';
import locked from '../assets/img/locked.png';
import { useDispatch, useSelector } from 'react-redux';
import CarListReducer from './CarList/CarListReducer';
import CarListAction from './CarList/CarListAction';
import Loading from '../Component/Loading/Loading';
import Popup from '../Component/Popup/Popup';
import Makeurbid from './Makeurbid';
import CarDetailsAction from './CarDetails/CarDetailsAction';
import Countdown from "react-countdown";
import BuyItNow from '../Pages/BuyItNow/BuyItNow';


const Cardetail = (props) =>{

	
const history = useHistory();
const dispatch = useDispatch();
const [copySuccess, setCopySuccess] = useState('');
const [sellerId,setSellerId]=useState("");
const [carDetail ,setCarDetail] = useState([]) 
const [carInventoryDetail,setCarInventoryDetail]=useState([]);
const [otherDealerCarDetail,setOtherDealerCarDetail]=useState([]);
const { id, sellerDealerId } = props.location.state;
const [sellerCarDetail,setSellerCarDetail]=useState([]);
const [lrgImg,setLrgImg]=useState("");
const [copied, setCopied] = useState(false);
const [data, setData] = useState("");
const [distance,setDistance] = useState("");
const [moreCarFlag,setMoreCarFlag]=useState(false);
const [similarCarFromSellerFlag,setSimilarCarFromSellerFlag]=useState(false);
// const sellerDealerId = useSelector(state => state.CarListReducer.payload);
const [buyer_dealer_id,setBuyer_Dealer_Id]=useState(JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id);
const [carBuyerDealerId,setCarBuyerDealerId]=useState("");
const [loading,setLoading] = useState(true);
console.log("selescted seller id_______",sellerDealerId)

const [isOpen, setIsOpen] = useState(false);
const [open,setOpen] = useState(false);


const [highBid,setHighBid] = useState(null);
const [carId, setCarId] = useState(null);
const [makeBitData, setMakeBitData] = useState({})

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
// const highBid= useSelector(state => state.CarDetailsReducer.payload.high_bid);

const toggleMakeBid = () => {
	setIsOpen(!isOpen);
}
const setMakeBitValue = (high_bid,min_price,save_purchase,car_id,time,counterbuyerid,max_price,buy_it_now,comments,transportation,display,proxy_bid,transportation_charge,save_policy) => {
	// console.log("check the toggle make bid value")
	setMakeBitData({
		carHighBid: high_bid,
		carMinBid: min_price,
		carId : car_id,
		carSavePurchase: save_purchase,
		redirectPage: "cardetail",
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
	})

	toggleMakeBid()
	// return {
	// 	carHighBid: high_bid,
	// 	carMaxBid: min_price,
	// 	carId : car_id,
	// 	carSavePurchase: save_purchase,
	// 	redirectPage: "cardetail",
	// 	time:time,
	// 	counter_buyerid:counterbuyerid,
	// 	carMaxBid :max_price,
	// 	buyItNow: buy_it_now,
	// 	comments:comments,
	// 	transportation:transportation,
	// 	display:display,
	// 	carProxyBid:proxy_bid,
	// }

	//dispatch(CarDetailsAction.highBid(high_bid))
	// console.log("checking max bid in the car details page", max_price)
	// dispatch(CarDetailsAction.minBid(makebiddispatch))
	
	
}

const toggleBuyItNow = () => {
	setOpen(!open);
}


const redirectpage=(pathid,seller_dealer_id)=>{
	//e.preventDefault();
	
	// dispatch(CarListAction.sellerid(seller_dealer_id))
	// history.push("/cardetail/"+pathid);
	history.push({
		pathname: '/cardetail',
		state: {id:pathid,sellerDealerId:seller_dealer_id},
	  });
  }

  const redirecttoInspection=(pathid)=>{
	//   history.push("/Inspection/"+pathid);
	history.push({
		pathname: "/Inspection",
		state: {id:pathid},
	  });
  }

const redirectpagemorecarseller=(pathid)=>{
	//e.preventDefault();
	history.push("/MoreCarFromBuyer/"+pathid);
}

const redirectpagesimilarcar=(pathid)=>{
	//e.preventDefault();
	history.push("/similarCarFromBuyer/"+pathid);
}
function copytoclipboard(e) {

    document.execCommand('copy');
   
    e.target.focus();
    setCopySuccess('Copied!');
  };
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



function CarDetailList(){

	const request = {

	"car_id":id,
	"buyer_dealer_id": JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
	"seller_dealer_id": sellerDealerId 

}

	API.post('carDetails/condition',request).then(res=>{


	setCarDetail(res.data.data);

	let make=res.data.data[0].make;
	let sellerDealerId=res.data.data[0].seller_dealer_id;
	
	setLoading(false);

	setDistance(res.data.distance);
	setLrgImg(res.data.data[0].image);
	
	setHighBid(res.data.data[0].high_bid);
	setCarId(res.data.data[0].car_id)


	let rq={
		buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
		};
		API.post('BuyerInventoryCarList/condition',rq).then(res=>{
		console.log("response",res.data.data);
		// const {results} = res.data.data;
		//console.log("Response data",res.data.data);
		//if(results.length>0){
		setCarInventoryDetail(res.data.data);
		console.log("car Inventory Detail",res.data.data);
		const req={
		seller_dealer_id:sellerDealerId,
		buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
		};
		API.post('SellerCarList/condition',req).then(resp=>{
		console.log("response",resp.data.data);
		// const {results} = res.data.data;
		//console.log("Response data",res.data.data);
		//if(results.length>0){
		setSellerCarDetail(resp.data.data);
		console.log("Seller car Inventory Detail",resp.data.data);
		//}
		})
		const req_samecar={
		"make":make,
		buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
		}
		console.log("other dealer car req",req_samecar);
		API.post('OtherDealerCarList/condition',req_samecar).then(response=>{
		console.log("otherdealercar list",response.data.data);
		setOtherDealerCarDetail(response.data.data);
		console.log("other dealer car req",req_samecar);
		console.log("otherdealercar list",response.data.data);
		})
		//}
		});

	//}
	});
	}
	function BuyerInventoryCarDetailList(){
	
	}

	useEffect (()=>{
		CarDetailList();
		},[id,highBid])
	
	useEffect (()=>{

	let intervalId;
	intervalId = setInterval(() => {
	CarDetailList();
	}, 60000)
	return () => clearInterval(intervalId);

	},[])

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
		else if(flag==='SimilarCarFromSellerFlag'){
			setSimilarCarFromSellerFlag(!similarCarFromSellerFlag)
		  }
		
	})
}

useEffect (()=>{
	
	//BuyerInventoryCarDetailList();
	CarDetailList();
	
	
	
	},[moreCarFlag,similarCarFromSellerFlag])

	
	
return(
    <div>
         {loading?<Loading/>:
        <main id="main" class="inner-page-cars carDetailsPage">
    <div id="products-details" class="products-details">
	 <div class="container">
			<div class="back-btn">
				<a class="back-btn-primary" onClick={() =>  history.goBack()}><i class="bx bx-chevron-left"></i> Back</a>
			</div>

	        <div class="row">
			{carDetail.length>0 && 
					<div className={(carDetail[0].buyer_high_bid=="" || carDetail[0].buyer_high_bid==null || carDetail[0].buyer_high_bid==undefined) && (carDetail[0].high_bid=="" || carDetail[0].high_bid==null || carDetail[0].high_bid==undefined)?"col-md-6":"col-md-5"}> 

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
			
					<div className={(carDetail[0].buyer_high_bid=="" || carDetail[0].buyer_high_bid==null || carDetail[0].buyer_high_bid==undefined) && (carDetail[0].high_bid=="" || carDetail[0].high_bid==null || carDetail[0].high_bid==undefined)?"col-md-6":"col-md-4"}>
	        		<div class="product-dtl">
        				<div class="product-info">
		        			<div class="product-name">{carDetail[0].make} {carDetail[0].vehicle_type}({carDetail[0].model})</div>
							<p  class="productdes"><span className="greytext">Inventory Number</span> - {carDetail[0].inventory_no}</p>
							<p class="productdes">{carDetail[0].car_description}</p>
		        			<div class="d-flex align-items-center">
									<p class="details"><img src={speedometer}  alt=""/><span>{carDetail[0].miles} m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
									<p class="details"><img src={gasolinePump} alt=""/><span>{carDetail[0].fuel_type}</span></p>
							</div>
							<div class="row">
	        				<div class="col-md-6">
							<div class="product-count">
									<h3>{carDetail[0].dealer_type}</h3>
									<div class=" d-flex align-items-center mb-3">
										<p class="details"><img src={Path}  alt=""/><span>{carDetail[0].seller_location}</span></p>
										
										<p class="details"><img src="assets/img/road-with-broken-line.svg" alt=""/><span>{distance} M</span></p>
									</div>	        										
								</div>
								</div>
								<div class="col-md-6">
								<div class="product-count carBrand">	        				
									<img src={carDetail[0].seller_logo}  alt=""/>
								</div>
								</div>
								</div>
							
							{carDetail[0].dealer_message=="" || carDetail[0].dealer_message==null || carDetail[0].dealer_message== undefined?
							<p><span class="dealertaglines">Message From The Dealer-</span> No Message</p>:
							<p><span class="dealertaglines">Message From The Dealer-</span> {carDetail[0].dealer_message}</p>
							}
		        		</div>
	        			
	        			<div class="row">
						
	        				<div class="col-md-12 carpoints">
								<div className="label">VIN Number</div>		  
								<div class="carpoint">
								
									<img src={car}  alt=""/>
									<span>{carDetail[0].engine}</span>
									<CopyToClipboard text={carDetail[0].engine} onCopy={() => setCopied(true)}>
									<span  title="Copy" onClick={copytoclipboard} className="copyImg"><i class="icofont-copy"></i></span>
									</CopyToClipboard>
									
									{/* <img src={book} onClick={copytoclipboard} alt=""/>  */}
									<img src={barcode}  alt=""/>
									
								</div>
								{/* {copied ? <p>Copied !</p> : ""} */}
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
									<a class="car-btns" onClick={()=>redirecttoInspection(carDetail[0].car_id)}>View Inspection</a>
									{/* {carDetail[0].high_bid=="" || carDetail[0].high_bid==null || carDetail[0].high_bid==undefined?"":
									<a class="car-btns-primary" href=""><img src={tag} alt=""/>High Bid :<span> $ {carDetail[0].high_bid}</span></a>
									} */}
									
									{carDetail[0].buy_it_now=="" || carDetail[0].buy_it_now== null || carDetail[0].buy_it_now== undefined || carDetail[0].buy_it_now== 0 ?"":
									<a class="car-btns-primary ml-2" href=""><img src={tag} alt=""/>Buy it Now :<span> $ {carDetail[0].buy_it_now}</span></a>
									}

									{(carDetail[0].buyer_high_bid==carDetail[0].high_bid || carDetail[0].buyer_high_bid!==carDetail[0].high_bid) &&
									 
									 <div class= {(carDetail[0].time!==null && carDetail[0].time > 0)?"countownBlock":""} >
									 	<Countdown date={Date.now() + (carDetail[0].time!==null && carDetail[0].time < 20 ? carDetail[0].time*60*1000 :0)  } renderer={renderer} />
									</div>}
									
								</div>

								
	        				</div>
	        			</div>
						
						
						<div class="row">
	        				<div class="col-md-6">
								{/* <div class="product-count">
									<h3>{carDetail[0].dealer_type}</h3>
									<div class=" d-flex align-items-center mb-3">
										<p class="details"><img src={Path}  alt=""/><span>Illinois</span></p>
										
										<p class="details"><img src="assets/img/road-with-broken-line.svg" alt=""/><span>{distance} M</span></p>
									</div>	        										
								</div> */}
							</div>
								        				
	        			</div>
						</div>
						<div class="row">
						{/* {(carDetail[0].isbuyercounterbid === 'yes'  && (carDetail[0].time !==0 || carDetail[0].time!==null) ) || carDetail[0].isbuyercounterbid !== 'yes' ? */}
						{/* {(carDetail[0].buyer_high_bid == carDetail[0].high_bid && carDetail[0].isbuyercounterbid=='me'&& (carDetail[0].time !==0 || carDetail[0].time!==null))|| carDetail[0].buyer_high_bid!== null || carDetail[0].high_bid ||  carDetail[0].buyer_high_bid == carDetail[0].high_bid && carDetail[0].isbuyercounterbid!=='me'? */}
						{(carDetail[0].isbuyercounterbid=="me" && carDetail[0].iscounterbid!==null && (carDetail[0].time !==0 || carDetail[0].time!==null)) || ((carDetail[0].iscounterbid==null || carDetail[0].iscounterbid=="no" ) && (carDetail[0].isbuyercounterbid==null || carDetail[0].isbuyercounterbid=="not")&&(carDetail[0].time ==0 || carDetail[0].time==null))?
						
							<div class="col-md-12">
	        					<div class="cars-buy">
								{carDetail[0].buy_it_now=="" || carDetail[0].buy_it_now== null || carDetail[0].buy_it_now== undefined || carDetail[0].buy_it_now== 0?"":
									<a class="cars-buy-btns" onClick={toggleBuyItNow}>Buy now</a>
								}
									
									<a class="cars-buy-btns-primary" onClick={()=>setMakeBitValue(carDetail[0].high_bid,carDetail[0].min_price,carDetail[0].save_purchase,carDetail[0].car_id,carDetail[0].time,carDetail[0].counter_buyer_dealer_id,carDetail[0].max_price,carDetail[0].buy_it_now,carDetail[0].comments,carDetail[0].transportation,carDetail[0].display,carDetail[0].proxy_bid,carDetail[0].transportation_charge,carDetail[0].save_policy)}>Make Bid</a>
								</div>
	        				</div>
						
							:<div class="carpoint lockedcar"> <a class="cars-buy-btns-primary">Locked up for Higher Bid </a></div>} 
	        		</div> </div> }
					
					<div class="col-md-3">
					{carDetail[0].noofBuyer=="" || carDetail[0].noofBuyer==null || carDetail[0].noofBuyer==undefined?"":
					<div>
					<p className="offerMade">Number of Bids {carDetail[0].noofBuyer} </p>
					</div>
					}
				{(carDetail[0].buyer_high_bid=="" || carDetail[0].buyer_high_bid==null || carDetail[0].buyer_high_bid==undefined) && (carDetail[0].high_bid=="" || carDetail[0].high_bid==null || carDetail[0].high_bid==undefined)?"":
						<div className="offerDetailsBlock">
						
							<div className="offerDetail">
							{carDetail[0].buyer_high_bid=="" || carDetail[0].buyer_high_bid==null || carDetail[0].buyer_high_bid==undefined?"":
							<div>
								<h3>Last Bid</h3>
									<div className="offerPrice">$ {carDetail[0].buyer_high_bid}</div>						
									<p>by <span>Me</span></p>
							</div>
							}
							</div>
							<hr></hr>
							<div className="offerDetail">
								{carDetail[0].high_bid=="" || carDetail[0].high_bid==null || carDetail[0].high_bid==undefined?"":
								<div className="left">
								<h3>High Bid</h3>
								<div className="offerPrice">$ {carDetail[0].high_bid}</div>
								{carDetail[0].buyer_high_bid==carDetail[0].high_bid?
								<p>by <span>Me</span></p>:
								<p>by <span>{carDetail[0].high_bid_buyer_name}</span></p>
								}
								</div>
								}
								<div class="carBrand">	        				
									<img src={carDetail[0].high_bid_buyer_logo}  alt=""/>
								</div>
							
								
							</div>
							

						</div>
}
					</div>
							
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
					 <p>{carDetail[0].transmission}</p>
					 <p>{carDetail[0].drivetrain}</p>
					 <p>{carDetail[0].fuel_type}</p>
					 
					</div>
				  </div>
				  <div class="col-lg-2">
					<div class="specifati">
					<p><img src={transmission}/> <span>Radio</span></p>
					 <p><img src={drivetrain}/> <span>Color</span></p>
					
					</div>
				  </div>
				  <div class="col-lg-2">
					<div class="specifati2">
					<p>{carDetail[0].radio}</p>
					 <p>{carDetail[0].color}</p>
					
					 
					</div>
				  </div>
				  <div class="col-lg-2">
					<div class="specifati">
					 
					 <p><img src={gasolinePump}/> <span>Engine</span></p>
					 <p><img src={gasolinePump}/> <span>Vehile Type</span></p>
					</div>
				  </div>
				  <div class="col-lg-2">
					<div class="specifati2">
					 
					 <p>{carDetail[0].engine}</p>
					 <p>{carDetail[0].vehicle_type}</p>
					 
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
		{sellerCarDetail.length > 0 ? sellerCarDetail.slice(0,4)
                            .map((moreCar,index) =>

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
				<p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>{moreCar.miles} m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
				<p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>{moreCar.fuel_type}</span></p>    
				

				<p className="details buyitnow">
					{moreCar.buy_it_now=="" || moreCar.buy_it_now== null || moreCar.buy_it_now== undefined || moreCar.buy_it_now== 0?"":
						<a className="cta-btns" href="#">Buy It Now $ {moreCar.buy_it_now}</a>
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
					
					{moreCar.high_bid=="" || moreCar.high_bid==null || moreCar.high_bid==undefined?"":
					<a className="cta-btns" href="#">High Bid $ {moreCar.high_bid}</a>
					}
					{/* {moreCar.buy_it_now=="" || moreCar.buy_it_now== null || moreCar.buy_it_now== undefined?"":
					<a className="cta-btns" href="#">Counter Bid $ {moreCar.buy_it_now}</a>
					} */}
					<a class="cta-btns-primary" onClick={()=>setMakeBitValue(moreCar.high_bid, moreCar.min_price, moreCar.save_purchase, moreCar.car_id, moreCar.time, moreCar.counter_buyer_dealer_id, moreCar.max_price, moreCar.buy_it_now,moreCar.comments,moreCar.transportation,moreCar.display,moreCar.proxy_bid,moreCar.transportation_charge,moreCar.save_policy)}>Make Bid</a>
				</div>
              </div>
            </div>
          </div>
		 		
		  ):""}
		  </div>
		  {sellerCarDetail.length >4? sellerCarDetail .slice(0,1)
                            .map((moreCar,index) =>
		<div class="text-center">
                <a href="JavaScript:void(0)" onClick={()=>{redirectpagemorecarseller(moreCar.seller_dealer_id)}} class="more-btn">View More<i class="bx bx-chevron-right"></i></a>
              </div>):""}
		</div>
    </div>
	
	
	<div id="other-dealer-cars" class="other-dealer-cars">
      <div class="container-fluid aos-init aos-animate" data-aos="fade-up">

        <div class="section-title">
          <h2>Similar Car From Other Dealer</h2>          
        </div>

        <div class="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
		{otherDealerCarDetail.length > 0 ? otherDealerCarDetail
                            .map((moreCar,index) =>
							<div class="col-lg-3 col-md-3 col-sm-4 col-xs-6">
							<div class="car-item">
								<div class="cars-lock">
								<img src={(moreCar.isFavourite===0)? locked : lock} onClick={()=>addRemoveFavourite(moreCar.car_id,moreCar.isFavourite,'SimilarCarFromSellerFlag')} />
								  </div>
								  <img src={moreCar.image} onClick={()=>{redirectpage(moreCar.car_id,moreCar.seller_dealer_id)}} class="carImg" alt="..."/>
								  
							  <div class="cars-content">		
							  <h3><a href="#">{moreCar.make} {moreCar._type} ({moreCar.model} model)</a></h3>
							    <div className="d-flex align-items-center mb-3">
									<p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>{moreCar.miles} m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
									<p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>{moreCar.fuel_type}</span></p>    
									
									<p className="details buyitnow">
                                                {moreCar.buy_it_now=="" || moreCar.buy_it_now== null || moreCar.buy_it_now== undefined || moreCar.buy_it_now== 0?"":
                                                    <a className="cta-btns" href="#">Buy It Now $ {moreCar.buy_it_now}</a>
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

									{moreCar.high_bid=="" || moreCar.high_bid==null || moreCar.high_bid==undefined?"":
									<a className="cta-btns" href="#">High Bid $ {moreCar.high_bid}</a>
									}
									{/* {moreCar.buy_it_now=="" || moreCar.buy_it_now== null || moreCar.buy_it_now== undefined?"":
									<a className="cta-btns" href="#">Counter Bid $ {moreCar.buy_it_now}</a>
									} */}
									<a class="cta-btns-primary" onClick={()=>setMakeBitValue( moreCar.high_bid, moreCar.min_price, moreCar.save_purchase, moreCar.car_id, moreCar.time, moreCar.counter_buyer_dealer_id, moreCar.max_price, moreCar.buy_it_now,moreCar.comments,moreCar.transportation,moreCar.display,moreCar.proxy_bid,moreCar.transportation_charge,moreCar.save_policy)}>Make Bid</a>
								</div>
							  </div>
							</div>
						  </div>):""}
				
		  </div>
		  {otherDealerCarDetail.length >4 ? otherDealerCarDetail.slice(0,1)
                            .map((moreCar,index) =>
		<div class="text-center">
                <a href="#" class="more-btn"  onClick={()=>{redirectpagesimilarcar(carDetail[0].make)}} >View More<i class="bx bx-chevron-right"></i></a>
              </div>):""}
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

	{open && <Popup
		isClose={false}
		content={<>
			<BuyItNow toggle={toggleBuyItNow} highBid={highBid} carId={carId} />
		</>}
		handleClose={toggleBuyItNow}
	/>}

  </main>
}
    </div>
)

}
export default Cardetail;