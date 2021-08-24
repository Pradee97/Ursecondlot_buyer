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
// import BuyNow from '../Pages/BuyNow';

const Cardetail = () =>{

	
const history = useHistory();
const dispatch = useDispatch();
const [copySuccess, setCopySuccess] = useState('');
const [sellerId,setSellerId]=useState("");
const [carDetail ,setCarDetail] = useState([]) 
const [carInventoryDetail,setCarInventoryDetail]=useState([]);
const [otherDealerCarDetail,setOtherDealerCarDetail]=useState([]);
const { id } = useParams();
const [sellerCarDetail,setSellerCarDetail]=useState([]);
const [lrgImg,setLrgImg]=useState("");
const [copied, setCopied] = useState(false);
const [data, setData] = useState("");
const [distance,setDistance] = useState("");
const [moreCarFlag,setMoreCarFlag]=useState(false);
const [similarCarFromSellerFlag,setSimilarCarFromSellerFlag]=useState(false);
const selectedSellerId = useSelector(state => state.CarListReducer.payload);
const [buyer_dealer_id,setBuyer_Dealer_Id]=useState(JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id);
const [carBuyerDealerId,setCarBuyerDealerId]=useState("");
const [loading,setLoading] = useState(true);
console.log("selescted seller id_______",selectedSellerId)

const [isOpen, setIsOpen] = useState(false);
const [open,setOpen] = useState(false);

const highBid= useSelector(state => state.CarDetailsReducer.payload.high_bid);

const toggleMakeBid = (high_bid,min_bid,save_purchase,car_id) => {
	console.log("check the high bid value",high_bid)
	let makebiddispatch={
		high_bid: high_bid,
		min_bid: min_bid,
		car_id : car_id,
		save_purchase: save_purchase,
		redirectPage: "cardetail"
	}
	//dispatch(CarDetailsAction.highBid(high_bid))
	dispatch(CarDetailsAction.minBid(makebiddispatch))
	
	setIsOpen(!isOpen);
}

const toggleBuyNow = () => {
	setOpen(!open);
}

console.log("sellerid from carlist",selectedSellerId);
const redirectpage=(pathid,seller_dealer_id)=>{
	//e.preventDefault();
	console.log("seller_dealer_id+++++",seller_dealer_id)
	dispatch(CarListAction.sellerid(seller_dealer_id))
	history.push("/cardetail/"+pathid);
  }

  const redirecttoInspection=(pathid)=>{
	  history.push("/Inspection/"+pathid);
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
    //textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
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
	loadLrgImg(img.targe .src);
}


function loadLrgImg(img){
	setLrgImg(img);
}
function CarDetailList(){

	const request = {

	"car_id":id,
	"buyer_dealer_id": JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
	"seller_dealer_id": selectedSellerId 

}


	console.log("request for car detail",request)
	API.post('carDetails/condition',request).then(res=>{
	console.log("response",res.data.data);
	// const {results} = res.data.data;
	console.log("Response data",res.data.data);
	//if(results.length>0){
	setCarDetail(res.data.data);
	console.log("car Detail",res.data.data);
	setLoading(false);
	console.log("car distance added",res.data.distance);
	setDistance(res.data.distance);
	setLrgImg(res.data.data[0].image);
	//}
	});
	}
	function BuyerInventoryCarDetailList(){
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
	seller_dealer_id:res.data.data[0].seller_dealer_id,
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
	"make":res.data.data[0].make,
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
	}
	
	useEffect (()=>{
	// carDetails/condition
	console.log("id value",id)
	CarDetailList();
	BuyerInventoryCarDetailList();
	
	
	
	},[id,highBid])

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
	
	BuyerInventoryCarDetailList();
	
	
	
	},[moreCarFlag,similarCarFromSellerFlag])

	
return(
    <div>
         {loading?<Loading/>:
        <main id="main" class="inner-page-cars carDetailsPage">
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
							<p class="productdes">{carDetail[0].car_description}</p>
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
									<CopyToClipboard text={carDetail[0].engine} onCopy={() => setCopied(true)}>
									<img src={book} onClick={copytoclipboard} alt=""/>
									</CopyToClipboard>
									
									{/* <img src={book} onClick={copytoclipboard} alt=""/>  */}
									<img src={barcode}  alt=""/>
									
								</div>
								{/* {copied ? <p>Copied !</p> : ""} */}
							</div>

							<div class="col-md-12 carpoints">
							<label   className= "input-has-value">Inventory Number</label>		  
								<div class="carpoint">								
									<span>{carDetail[0].inventory_no}</span>									
									
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
									<a class="car-btns" onClick={()=>redirecttoInspection(carDetail[0].car_id)}>View Inspection</a>
									{carDetail[0].high_bid=="" || carDetail[0].high_bid==null || carDetail[0].high_bid==undefined?
									<a class="car-btns-primary" href=""><img src={tag} alt=""/>High Bid :<span> ${carDetail[0].min_bid}</span></a>:
									<a class="car-btns-primary" href=""><img src={tag} alt=""/>High Bid :<span> ${carDetail[0].high_bid}</span></a>
									}&nbsp;&nbsp;&nbsp;&nbsp;
									{carDetail[0].counter_bid=="" || carDetail[0].counter_bid== null || carDetail[0].counter_bid== undefined ?"":
									<a class="car-btns-primary" href=""><img src={tag} alt=""/>Counter Bid :<span> $ {carDetail[0].counter_bid}</span></a>
									}
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
										
										<p class="details"><img src="assets/img/road-with-broken-line.svg" alt=""/><span>{distance} M</span></p>
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
									<a class="cars-buy-btns-primary" onClick={()=>toggleMakeBid(carDetail[0].high_bid,carDetail[0].min_bid,carDetail[0].save_purchase,carDetail[0].car_id)}>Make Bid</a>
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
		{sellerCarDetail.length > 0 ? sellerCarDetail
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
			</div>
			<div className="d-flex align-items-center mb-3">
				<p className="details"><span>{moreCar.dealer_type} </span></p>&nbsp;&nbsp;&nbsp;&nbsp;
				<p className="details"><img src={moreCar.image}/></p>
			</div>
				
				<div class="cars-prices">
					<a className="cta-btns" href="#">Inventory Number {moreCar.inventory_no}</a>
          			<a className="cta-btns" href="#">Seller Price ${moreCar.max_bid}</a>
					<a class="cta-btns" href="">High Bid ${moreCar.high_bid}</a>
					<a class="cta-btns-primary" onClick={()=>toggleMakeBid(moreCar.high_bid,moreCar.min_bid,moreCar.save_purchase,moreCar.car_id)}>Make Bid</a>
				</div>
              </div>
            </div>
          </div>
		 		
		  ):""}
		  </div>
		  {sellerCarDetail.length > 0 ? sellerCarDetail.slice(0,1)
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
								</div>
								<div className="d-flex align-items-center mb-3">
									<p className="details"><span>{moreCar.dealer_type} </span></p>&nbsp;&nbsp;&nbsp;&nbsp;
									<p className="details"><img src={moreCar.image}/></p>
								</div>
								
								<div class="cars-prices">
									<a className="cta-btns" href="#">Inventory Number {moreCar.inventory_no}</a>
          							<a className="cta-btns" href="#">Seller Price ${moreCar.max_bid}</a>
									<a class="cta-btns" href="">High Bid ${moreCar.high_bid}</a>
									<a class="cta-btns-primary" onClick={()=>toggleMakeBid(moreCar.high_bid,moreCar.min_bid,moreCar.save_purchase,moreCar.car_id)}>Make Bid</a>
								</div>
							  </div>
							</div>
						  </div>):""}
				
		  </div>
		  {otherDealerCarDetail.length > 0 ? otherDealerCarDetail.slice(0,1)
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
			<Makeurbid toggle={toggleMakeBid} />
		</>}
		handleClose={toggleMakeBid}
	/>}

	{open && <Popup
		isClose={false}
		content={<>
			{/* <BuyNow toggle={toggleBuyNow} /> */}
		</>}
		handleClose={toggleBuyNow}
	/>}

  </main>
}
    </div>
)

}
export default Cardetail;